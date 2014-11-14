var report = function(o) {
	this.options = {
		sortby: null,
		subject_id: null,
		template: {
			subject:
				'<table class="table table-hover report-by-subject">' +
					'<thead><tr>' +
						'<th>채점일</th>' +
						'<th>시험 <i class="fa-icon-question-sign subject-tooltip" data-subject-tooltip="각 성적을 클릭하면 해당 시험의 채점 결과로 이동합니다"></i></th>' +
						'<th class="score">성적</th>' +
						'<th class="rating">등급</th>' +
					'</tr></thead>' +
					'<tbody>' +
						'{result_list}' +
					'</tbody>' +
				'</table>',
			score:
				'<table class="table table-hover report-by-score">' +
					'<thead><tr>' +
						'<th>시험</th>' +
						'{subject_list}' +
						'<th>총점</th>' +
					'</tr></thead>' +
					'<tbody>' +
						'{result_list}' +
					'</tbody>' +
				'</table>',
			understanding:
				'<table class="table table-condensed table-hover report-by-understanding">' +
					'<thead><tr>' +
						'<th>태그 <i class="fa-icon-question-sign tag-tooltip" data-tag-tooltip="각 태그를 클릭하면 해당 태그가 포함된 문제들을 확인할 수 있습니다"></i></th>' +
						'<th class="count">틀린문제수</th>' +
						'<th class="count">출제문제수</th>' +
						'<th style="width:40%;">이해도</th>' +
					'</tr></thead>' +
					'<tbody>' +
						'{result_list}' +
					'</tbody>' +
				'</table>',
		},
		container: $('div.report-wrapper')
	};
	$.extend(this.options, o || {});
}
report.prototype = {
	initialize: function() {
		$('.report-list').empty();
	},
	get_report: function() {
		var self = this;
		$.getJSON('/report/'+this.options.sortby, { 'subject_id': this.options.subject_id }, function(response) {
			if (response && response.reports.length != 0) {
				self.render_list(response);
				if (self.options.sortby == 'subject') {
					self.render_subject_chart(response);
					$('.subject-tooltip').qtip({
						content: { text: $('.subject-tooltip').data('subject-tooltip') },
						position: { target: $('.subject-tooltip'), my: 'bottom center', at: 'top center' },
						style: { classes: 'qtip-light qtip-shadow qtip-rounded' }
					});
				} else if (self.options.sortby == 'score') {
					self.render_score_chart(response);
				} else {
					$('.tag-tooltip').qtip({
						content: { text: $('.tag-tooltip').data('tag-tooltip') },
						position: { target: $('.tag-tooltip'), my: 'bottom left', at: 'top center' },
						style: { classes: 'qtip-light qtip-shadow qtip-rounded' }
					});
				}
			} else {
				var template = self.options.template[self.options.sortby];
				if (self.options.sortby == 'subject') {
					var msg = '<div class="empty"><i class="fa-icon-bar-chart"></i><br><br>' +
						'<strong>'+$('.subject-item-list.active').text()+'</strong> 채점결과가 없습니다<br>' +
						'채점 후 자신의 성적 기록을 <b>표</b>와 <b>그래프</b>로 한눈에 확인해보세요<br><br>' +
						'<a href="/grading/exam/'+$('#latest').val()+'-'+$('.subject-item-list.active').text()+'"><button class="btn btn-seablue"><i class="fa-icon-ok"></i> 지금 채점하기</button></a></div>';
					template = template.replace('{result_list}', '<tr><td class="noresult" colspan="4">'+msg+'</td></tr>');
					//$('.report-list').parent().removeClass('span12').addClass('span6');
					//$('.report-chart').parent().show();
				} else if (self.options.sortby === 'score') {
					var thead = '';
					for (i in response.subs) {
						thead += '<th>'+response.subs[i]+'</th>';
					}
					template = template.replace('{subject_list}', thead);
					var msg = '<div class="empty"><i class="fa-icon-bar-chart"></i><br><br>' +
						'채점결과가 없습니다<br>' +
						'채점 후 자신의 성적 기록을 <b>표</b>와 <b>그래프</b>로 한눈에 확인해보세요<br><br>' +
						'<a href="/grading/exam/'+$('#latest').val()+'-'+$('.subject-item-list:first').text()+'"><button class="btn btn-seablue"><i class="fa-icon-ok"></i> 지금 채점하기</button></a></div>';
					template = template.replace('{result_list}', '<tr><td class="noresult" colspan="7">'+msg+'</td></tr>');
					//$('.report-list').parent().removeClass('span12').addClass('span6');
					//$('.report-chart').parent().show();
				} else {
					var msg = '<div class="empty"><i class="fa-icon-tasks"></i><br><br>' +
						'<strong>'+$('.subject-item-list.active').text()+'</strong> 채점결과가 없습니다<br>' +
						'채점 후 태그 분석을 통해 <b>이해도</b>를 확인해보세요<br><br>' +
						'<a href="/grading/exam/'+$('#latest').val()+'-'+$('.subject-item-list.active').text()+'"><button class="btn btn-seablue"><i class="fa-icon-ok"></i> 지금 채점하기</button></a></div>';
					template = template.replace('{result_list}', '<tr><td class="noresult" colspan="4">'+msg+'</td></tr>');
					//$('.report-list').parent().removeClass('span6').addClass('span12');
					//$('.report-chart').parent().hide();
				}
				$('.report-chart').parent().hide();
				$('.report-list').parent().removeClass('span6').addClass('span12');
				$('.report-list').append( template );
				$('.report-list').find('table').removeClass('table-hover');
				//$('.chart-wrapper').html('<div class="noresult"><p>자신의 성적 기록을 표와 그래프로 한눈에 확인해보세요</p></div>');
			}
		});
	},
	trans_date: function(n) {
		var output = '채점: '+n.created_at+'|시험: '+n.grade+'학년 '+n.year+'년 ' +n.month+'월 '+n.name;
		return output;
	},
	render_list: function(resource) {
		var self = this;
		var reports = resource.reports;
		var item = '';
		var template = self.options.template[self.options.sortby];
		if (self.options.sortby == 'subject') {
			// 과목별 테이블
			$('.report-list').parent().removeClass('span12').addClass('span6');
			$('.report-chart').parent().show();
			for (i in reports) {
				var n = reports[i];
				item += '<tr id="'+n.id+'" class="list-item subject-tooltip">'; 
				item += '<td>'+n.date+'</td>';
				//item += '<td><a href="/grading/exam/고'+n.grade+'-'+n.year+'년-'+n.month+'월-'+n.name+'">고'+n.grade+' '+n.year+'년 ' +n.month+'월 '+n.name+'</a></td>';
				item += '<td class="exam-name">고'+n.grade+' '+n.year+'년 ' +n.month+'월 '+n.name+'</td>';
				item += '<td class="score">'+n.score+'점</td>';
				item += '<td class="rating">'+n.rating+'</td>';
				item += '</tr>';
			}
			template = template.replace('{result_list}', item);
		} else if (self.options.sortby == 'score') {
			// 총점별 테이블
			$('.report-list').parent().removeClass('span12').addClass('span6');
			$('.report-chart').parent().show();
			var thead = '';
			for (i in resource.subs) {
				thead += '<th>'+resource.subs[i]+'</th>';
			}
			template = template.replace('{subject_list}', thead);
			for (i in reports) {
				var n = reports[i];
				var total = 0;
				item += '<tr class="list-item">';
				item += '<td>'+n.title+'</td>';
				for (s in n.subs) {
					item += '<td>'+n.subs[s]+'</td>';
					total += parseInt(n.subs[s]);
				}
				item += '<td>'+total+'</td>';
				item += '</tr>';
			}
			template = template.replace('{result_list}', item);
		} else {
			// 이해도별 테이블
			$('.report-list').parent().removeClass('span6').addClass('span12');
			$('.report-chart').parent().hide();
			var subname = $('.nav-subject-item .active').text();
			for (i in reports) {
				var n = reports[i];
				item += '<tr class="list-item">';
				item += '<td data-id="'+n.id+'"><a href="/questions/tagging/'+subname+'/'+(n.name).replace(/ /g, '-')+'"><span class="label label-tag tag-tooltip" style="margin:0;">'+n.name+'</span></a></td>';
				item += '<td class="count">'+n.cnt+'</td>';
				item += '<td class="count">'+n.total+'</td>';
				var understanding = parseInt((n.total-n.cnt)/n.total*100);
				if (understanding < 5) {
					item += '<td>'+'<div class="progress"><div class="progress-bar danger" data-width="'+understanding+'%"></div><span class="progress-label">'+understanding+'%</span></div>'+'</td>';
				} else if (understanding < 15) {
					item += '<td>'+'<div class="progress"><div class="progress-bar danger" data-width="'+understanding+'%">'+understanding+'%</div></div>'+'</td>';
				} else if (understanding < 30) {
					item += '<td>'+'<div class="progress"><div class="progress-bar warning" data-width="'+understanding+'%">'+understanding+'%</div></div>'+'</td>';
				} else if (understanding < 50) {
					item += '<td>'+'<div class="progress"><div class="progress-bar caution" data-width="'+understanding+'%">'+understanding+'%</div></div>'+'</td>';
				} else if (understanding < 70) {
					item += '<td>'+'<div class="progress"><div class="progress-bar careful" data-width="'+understanding+'%">'+understanding+'%</div></div>'+'</td>';
				} else {
					item += '<td>'+'<div class="progress"><div class="progress-bar notice" data-width="'+understanding+'%">'+understanding+'%</div></div>'+'</td>';
				}
				item += '</tr>';
			}
			template = template.replace('{result_list}', item);
		}
		$('.report-list').append( template );
		$(".progress .progress-bar").each(function(e) {
			var self = $(this);
			$(this).animate({width: self.data('width')}, { duration: 800, easing: "linear", queue: false });
		});
	},
	render_subject_chart: function(resource) {
		var self = this;
		var reports = resource.reports;
		var data = [], xdata = [], cnt = resource['reports'].length, ymin=100, ymax=0, xmin=30000000, xmax=0;
		for (i in reports) {
			var n = reports[i];
			ymin = ( parseInt(n.score) < ymin ) ? n.score : ymin;
			ymax = ( parseInt(n.score) > ymax ) ? n.score : ymax;
			data.unshift([self.trans_date(n), n.score]);
			xdata.unshift([cnt-1-parseInt(i), n.date]);
		}
		ymin = (parseInt(ymin) < 10) ? 0 : parseInt(ymin)-10;
		ymax = (parseInt(ymax) > 90) ? 100 : parseInt(ymax)+10;
		var rdata = [{
						label: "성적",
						data: data,
						grow: { growings:[ { stepMode: "maximum" } ] }
					}];
		var options = {
			series: {
				lines: { show: true, lineWidth: 5 },
				points: { show: true, radius: 5 },
				grow: { active: true, duration: 1200 }
			},
			grid: {
				hoverable: true
			},
			xaxis: {
				mode: "categories",
				tickLength: 0,
				//autoscaleMargin: 0.1,
				axisLabel: '채점일',
				axisLabelUseCanvas: true,
				axisLabelPadding: 10,
				//alignTicksWithAxis: 5
				ticks: xdata
			},
			yaxis: {
				min: ymin,
				max: ymax,
				//axisLabel: '성적',
				//axisLabelUseCanvas: true,
				tickSize: 5,
				tickDecimals: 0
			}
		}
		$.plot("#chart-wrapper", $.extend(true, [], rdata), options);
		//$.plot("#chart-wrapper", [ { data: data, label: "성적"} ], options);
		
	    //Run function when browser resizes
/*	    $(window).resize( respondCanvas );
	    function respondCanvas(){ 
	        charts.width = $('.report-chart').width();
        	charts.height = $('.report-chart').height();
        	
	        //var myLine = new Chart(charts.getContext("2d")).Line(data, options);
	    }
	    //Initial call 
	    respondCanvas();
*/
		
	},
	render_score_chart: function(resource) {
		var self = this;
		var reports = resource.reports;
		var xdata = []; var d1 = []; var d2 = []; var d3 = []; var d4 = []; var d5 = [];
		var l1 = 0;
		for (i in reports) {
			var n = reports[i];
			xdata.push([l1, n.title]);
			var l2 = 0;
			for (s in n.subs) {
				if (l2 == 0) {
					d1.push([n.title, n.subs[s]]);
				} else if (l2 == 1) {
					d2.push([n.title, n.subs[s]]);
				} else if (l2 == 2) {
					d3.push([n.title, n.subs[s]]);
				} else if (l2 == 3) {
					d4.push([n.title, n.subs[s]]);
				} else if (l2 == 4) {
					d5.push([n.title, n.subs[s]]);
				}
				l2++;
			}
			l1++;
		}
		var rdata = [{
						label: resource.subs[0],
						data: d1,
						color: "#3498DB",
						grow: { growings:[ { stepMode: "maximum" } ] }
					},{
						label: resource.subs[1],
						data: d2,
						color: "#F1C40F",
						grow: { growings:[ { stepMode: "maximum" } ] }
					},{
						label: resource.subs[2],
						data: d3,
						color: "#E74C3C",
						grow: { growings:[ { stepMode: "maximum" } ] }
					},{
						label: resource.subs[3],
						data: d4,
						color: "#2ECC71",
						grow: { growings:[ { stepMode: "maximum" } ] }
					},{
						label: resource.subs[4],
						data: d5,
						color: "#9B59B6",
						grow: { growings:[ { stepMode: "maximum" } ] }
					}];
		
		$.plot("#chart-wrapper", $.extend(true, [], rdata), {
			series: {
				stack: 0,
				bars: {
					show: true,
					barWidth: 0.6,
					fill: true,
					//fillColor: { colors: ["#3498DB", "#F1C40F", "#E74C3C", "#2ECC71", "#9B59B6"] },
					fillColor: { colors: [ { opacity: 0.9 }, { opacity: 0.9 } ] },
					//horizontal: true,
					align: 'center'
				},
				grow: { active: true, duration: 2000 }
			},
			grid: {
				//hoverable: true
			},
			xaxis: {
				mode: "categories",
				tickSize: 2,
				tickLength: 0,	// 차트 - 라벨 간격
				//autoscaleMargin: 0.1,
				//reserveSpace: true,
				ticks: xdata
				//alignTicksWithAxis: 5
			},
			yaxis: {
				tickSize: 10,
				tickDecimals: 0
			}
		});
	}
}

$(document).ready(function() {
	var hash = window.location.hash;
	if(!hash) {
		$('.by-group').find('button:first').addClass('active');
	} else {
		$('.by-group').find('button[data-sort="'+hash.substring(1)+'"]').addClass('active');
		if ($('ul.by-group').find('.active').data('id') === 'score') {
			$('.report-header-msg').show(); $('.nav-subject').hide();
		}
	}
	// initialize
	var rep = new report({ sortby:$('ul.by-group').find('.active').data('id'), subject_id:$('.subject-item-list.active').data('subid') });
	rep.initialize();
	rep.get_report();
	
	$(document)
	.on('click', '.subject-item-list', function(e) {
		e.preventDefault();
		var self = $(this);
		if ( !self.hasClass('active') ) {
			self.parent().parent().find('.active').removeClass('active');
			self.addClass('active');
			rep = new report({ sortby:$('ul.by-group').find('.active').data('id'), subject_id:$('.subject-item-list.active').data('subid') });
			rep.initialize();
			rep.get_report();
		}
		e.stopPropagation();
	})
	.on('click', '.btn-switch', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('active') ) {
			window.location.hash = $(this).data('sort');
			$(this).parent().find('.active').removeClass("active");
			$(this).addClass('active');
			if ($(this).data('id') == 'score') {
				$('.report-header-msg').show();
				$('.nav-subject').hide();
				rep = new report({ sortby:$('ul.by-group').find('.active').data('id') });
			} else {
				$('.nav-subject').show();
				$('.report-header-msg').hide();
				rep = new report({ sortby:$('ul.by-group').find('.active').data('id'), subject_id:$('.subject-item-list.active').data('subid') });
			}
			rep.initialize();
			rep.get_report();
		}
		e.stopPropagation();
	})
	.on('click', 'table.report-by-subject tbody tr.list-item', function(e) {
		var exam = $(this).find('.exam-name').text();
		window.location.href = '/grading/exam/'+exam.replace(/ /g, '-');
	});
	
	var prevData = null;
	//var prevSeries = null;
	var prevPoint = null;
	$("#chart-wrapper").bind("plothover", function (event, pos, item) {
		if (item) {
			//console.log('prev : ' + prevData + ' / ' + prevSeries);
			//console.log('curr : ' + item.dataIndex + ' / ' + item.seriesIndex);
			//if ( (prevData != item.dataIndex) || (prevSeries != item.seriesIndex) ) {
			if ( (prevData != item.dataIndex) || (prevPoint != item.pageY) ) {
				prevData = item.dataIndex;
				//prevSeries = item.seriesIndex;
				prevPoint = item.pageY;
				$("#tooltip").remove();
				//var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
				var title = item.series.data[item.dataIndex][0].split("|");
				var score = item.series.data[item.dataIndex][1];
				showTooltip(item.pageX, item.pageY, title[0]+"<br>"+title[1]+"<br>성적: <strong>"+parseInt(score)+'</strong>점'); //item.series.label
			}
		} else {
			$("#tooltip").remove();
			prevData = null;
			prevSeries = null;
		}
	});
	
	function showTooltip(x, y, contents) {
		$("<div id='tooltip'>" + contents + "</div>").css({
			position: "absolute", display: "none",
			top: y+15, left: x-100,
			//width: "100px",
			border: "2px solid #aaa", "border-radius": "5px",
			padding: "10px",
			"background-color": "#eee",
			"z-index": 50,
			//"text-align": "center",
			opacity: 0.90
		}).appendTo("body").fadeIn(200);
	}
	
	$('.by-group button').qtip({
		content: { text: function(api) { return $(this).text()+'별 성적표를 확인해보세요'; } },
		position: { my: 'top center', at: 'bottom center' },
		style: { classes: 'qtip-light qtip-shadow qtip-rounded' }
	});
});

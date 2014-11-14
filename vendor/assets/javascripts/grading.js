var paper = function(o) {
	this.options = {
		exam_id	: null,
		template: {
			question:
				'<div id="{id}" class="paper-question" data-title="고{grade} {year}년 {month}월 {subject} {number}번">' +
					'<div class="question-marker"></div>' +
					'<div class="prob-tag">{tags}</div>' +
					'<img class="paper-question-img" src="{question_img}" alt="question" />' +
					'<a href="/questions/{link}/{number}" data-id="{id}" class="view-single" data-fancybox-type="ajax"  data-fancybox-group="papers">' +
						'<div class="prob-mask round"></div>' +
					'</a>' +
					'<div class="prob-result round-small" data-correct="{question_correct}"></div>' +
				'</div>',
			title:
				'<div class="paper-title">{title}</div>',
			header:
				'<div class="paper-header"></div>'
		},
		container: $('div.paper-wrapper')
	};
	$.extend(this.options, o || {});
}
paper.prototype = {
	initialize: function() {
		$('.paper-wrapper').empty();
		$('.paper-input-wrapper').empty();
	},
	get_paper: function() {
		var self = this;
		setup_filter();
		$.getJSON('/grading/lists', { 
			exam_id: this.options.exam_id
		}, function(response) {
			if (response.result) {
				if (response.data.questions.length > 0) {
					$('.noresult').addClass('hidden');
					$('li.count .number').attr('data-count', response.data.count).html(response.data.count+' 문제');
					$('#answersheet').attr("data-count", response.data.count);
					var exam_meta = response.data.exam;
					self.options.container.attr("data-meta", exam_meta.id+'_'+exam_meta.year+'_'+exam_meta.month+'_'+exam_meta.grade+'_'+exam_meta.subject_name+'_'+exam_meta.subject_id);
					self.render_paper(response.data);
					self.align_paper(response.data);
					if (response.report) {
						self.report_paper(response.report);
					} else {
						$('.prob-result').hide();
					}
				} else {
					//self.options.container.append('<p>문제가 없습니다.</p>');
					$('.noresult').removeClass('hidden');
				}
			} else {
				//self.options.container.append('<p>잘못된 요청입니다.</p>');
				$('.noresult').removeClass('hidden');
				//return false;
			}
		});
	},
	render_paper: function(paper) {
		var self = this;
		var exam = paper.exam, info, page_num = 0, page_elem, page_col = 0, col_elem, blank;
		var template;
		for (i in paper.questions) {
			// 한 문제씩 돌면서 각 상황에 맞춰 시험지 포맷으로 출력
			var q = paper.questions[i];
			// 새로운 페이지일 경우
			if (!(page_num == q.page_number)) {
				//console.log('===================== 새페이지 =====================');
				// 이전 페이지에서 뛰어넘은 칼럼들 추가
				for (l=1; l<5; l++) {
					if ( page_num != 0 && $('.page'+page_num+' .column'+l).length == 0 ) {
						if (l == 1) {
							$(page_elem).append('<div data-column="'+l+'" class="paper-column column'+l+'">' +
													'<div class="paper-header">' +
														'<span class="paper-title">'+exam.year+'학년도 '+exam.month+'월 고'+exam.grade+' '+exam.examiner+'</span>' +
														'<span class="paper-section">'+exam.section+' ('+exam.subject_name+')</span>' +
														'<div class="paper-number-right">'+((parseInt(q.page_number)-1)*2-1).toString()+'</div>' +
													'</div>' +
												'</div>');
						} else if (l == 3) {
							$(page_elem).append('<div data-column="'+l+'" class="paper-column column'+l+'">' +
													'<div class="paper-header">' +
														'<span class="paper-section">'+exam.section+' ('+exam.subject_name+')</span>' +
														'<div class="paper-number-left">'+((parseInt(q.page_number)-1)*2).toString()+'</div>' +
													'</div>' +
												'</div>');
						} else {
							$(page_elem).append('<div data-column="'+l+'" class="paper-column column'+l+'"></div>');
						}
						//console.log('*** 이전 '+page_num+'페이지에서 건너뛴 '+l+'칼럼을 생성했습니다.');
					}
				}
				
				page_num = q.page_number;
				page_elem = document.createElement('div');
				page_elem.setAttribute("data-page", q.page_number);
				page_elem.className = "paper-page page"+q.page_number;
				page_col = 0;
			}
			
			// 새로운 칼럼일 경우
			if (!(page_col == q.page_column)) {
				// 지문으로 인해 바로 전 칼럼을 뛰어 넘은 경우
				for (l=1; l<q.page_column; l++) {
					if ( page_num != 0 && $('.page'+page_num+' .column'+l).length == 0 ) {
						if (l == 1) {
							blank = document.createElement('div');
							blank.setAttribute("data-column", 1);
							blank.className = "paper-column column1";
							template = '<div class="paper-header">';
							if ( q.page_number == 1 )
								template += '<span class="paper-title">'+exam.year+'학년도 '+exam.month+'월 고'+exam.grade+' '+exam.examiner+'</span>';
							template += '<span class="paper-section">'+exam.section+' ('+exam.subject_name+')</span>';
							template += '<div class="paper-number-right">'+(parseInt(q.page_number)*2-1).toString()+'</div>';
							template += '</div>';
							blank.innerHTML += template;
							page_elem.appendChild( blank );
						} else if (l == 3) {
							$(page_elem).append('<div data-column="'+l+'" class="paper-column column'+l+'">' +
													'<div class="paper-header">' +
														'<span class="paper-section">'+exam.section+' ('+exam.subject_name+')</span>' +
														'<div class="paper-number-left">'+((parseInt(q.page_number))*2).toString()+'</div>' +
													'</div>' +
												'</div>');
						} else {
							$(page_elem).append('<div data-column="'+l+'" class="paper-column column'+l+'"></div>');
						}
						//console.log('*** 현재 '+page_num+'페이지에서 건너뛴 '+l+'칼럼을 생성했습니다.');
					}
				}
				
				page_col = q.page_column;
				col_elem = document.createElement('div');
				col_elem.setAttribute("data-column", q.page_column);
				col_elem.className = "paper-column column"+q.page_column;

				if (q.page_column == 1 || q.page_column == 3) {
					template = '<div class="paper-header">';
					if ( q.page_number == 1 && q.page_column == 1 )
						template += '<span class="paper-title">'+exam.year+'학년도 '+exam.month+'월 고'+exam.grade+' '+exam.examiner+'</span>';
					template += '<span class="paper-section">'+exam.section+' ('+exam.subject_name+')</span>';
					if (q.page_column == 1) {
						template += '<div class="paper-number-right">'+(parseInt(q.page_number)*2-1).toString()+'</div>';
					} else {
						template += '<div class="paper-number-left">'+(parseInt(q.page_number)*2).toString()+'</div>';
					}
					template += '</div>';
					col_elem.innerHTML += template;
				}
			}
			// 지문이 있는 경우
			if (q.passage_array) {
				// 각 지문의 첫번째 문제일때만 ( 1번문제의 지문 || 이전 문제의 지문과 같지 않을때 )
				if ( i==0 || ( i!=0 && q.passage_array != paper.questions[parseInt(i)-1].passage_array ) ) {
					var passage = (q.passage_array).split('|');
					for(j in passage) {
						var p = passage[j];
						
						// 이미 출력한 경우 통과 (nested 지문일 경우)
						if (!paper.passages[p]) continue;
						
						// 지문 출력 위치 계산
						var sp = paper.passages[p].split('.')[0].split('_'), pp, pc;
						if (parseInt(sp[4])%4 == 0) {
							pp = parseInt(parseInt(sp[4])/4);
							pc = 4;
						} else {
							pp = parseInt(parseInt(sp[4])/4)+1;
							pc = parseInt(sp[4])%4;
						}
						//console.log('	'+pp+'#'+pc+' == '+q.page_column+' / '+q.number+'번-'+p+'-'+paper.passages[p]);
						if ( q.page_column == pc ) {
							// 지문이 문제와 같은 칼럼일 경우
							$(col_elem).append('<div id="'+p+'" class="paper-passage"><img class="paper-passage-img" src="'+paper.path+sp[0]+'/'+paper.passages[p]+'" alt="passage" /></div>');
						} else {
							if ( $('.page'+pp+' .column'+pc).length == 0) {
								// 해당 칼럼이 아직 append 안됐을때, blank element에 붙인다
								// 지문이 1번 칼럼에 처음 나올때만 해당 || 한 지문이 1,2번 칼럼 연속으로 나올경우
								if (pc == 1) {
									$(blank).append('<div id="'+p+'" class="paper-passage"><img class="paper-passage-img" src="'+paper.path+sp[0]+'/'+paper.passages[p]+'" alt="passage" /></div>');
								} else if (pc == 2) {
									$(blank).next().append('<div id="'+p+'" class="paper-passage"><img class="paper-passage-img" src="'+paper.path+sp[0]+'/'+paper.passages[p]+'" alt="passage" /></div>');
								}
							} else {
								// 해당 칼럼이 이미 append 됐을때, 지문이 2,3,4번 칼럼에 있을 경우
								$('.page'+pp).find('.column'+pc).append('<div id="'+p+'" class="paper-passage"><img class="paper-passage-img" src="'+paper.path+sp[0]+'/'+paper.passages[p]+'" alt="passage" /></div>');
							}
						}
						
						// 이미 출력한 지문 제외
						delete paper.passages[p];
					}
				}
			}
			
			template = this.options.template['question'];
			template = template.replace(/{id}/gi, q.id);
			template = template.replace(/{grade}/gi, exam.grade);
			template = template.replace(/{year}/gi, exam.year);
			template = template.replace(/{month}/gi, exam.month);
			template = template.replace(/{subject}/gi, exam.subject_name);
			template = template.replace(/{number}/gi, q.number);
			template = template.replace('{link}', '고'+exam.grade+'-'+exam.year+'년-'+exam.month+'월-'+exam.subject_name);
			template = template.replace('{question_img}', paper.path+q.img);
			template = template.replace('{question_correct}', q.correct);
			var tags_wrapper = '';
			for (j in q.tags) {
				var t = q.tags[j];
				tags_wrapper += '<a href="/questions/tagging/'+exam.subject_name+'/'+(t.name).replace(/ /g, '-')+'"><span data-id="'+t.id+'" class="label label-tag">'+t.name+'</span></a>';
			}
			template = template.replace('{tags}', tags_wrapper);
			
			col_elem.innerHTML += template;
			page_elem.appendChild( col_elem );
			self.options.container.append(page_elem);
			
			// 정답입력 인풋 (수리, 수학은 주관식 문항 처리)
			if (exam.section_id == 2) { // 수리영역
				if (exam.year == 2004 && exam.month == 3) {
					if (q.number >= 22) {	// 22 ~ 30
						$('.paper-input-wrapper').append('<input type="text" id="_'+q.id+'" data-number="'+q.id+'" class="paper-input short" maxlength="3" placeholder="'+q.number+'" />');
					} else {
						$('.paper-input-wrapper').append('<input type="text" id="_'+q.id+'" data-number="'+q.id+'" class="paper-input" maxlength="1" placeholder="'+q.number+'" />');
					}
				} else if (exam.year == 2011 || exam.year == 2012) {
					if (q.number >= 22) {	// 22 ~ 30
						$('.paper-input-wrapper').append('<input type="text" id="_'+q.id+'" data-number="'+q.id+'" class="paper-input short" maxlength="3" placeholder="'+q.number+'" />');
					} else {
						$('.paper-input-wrapper').append('<input type="text" id="_'+q.id+'" data-number="'+q.id+'" class="paper-input" maxlength="1" placeholder="'+q.number+'" />');
					}
				} else {
					if ( (q.number >= 18 && q.number <= 25) || q.number == 30 ) {	// 18 ~ 25
						$('.paper-input-wrapper').append('<input type="text" id="_'+q.id+'" data-number="'+q.id+'" class="paper-input short" maxlength="3" placeholder="'+q.number+'" />');
					} else {
						$('.paper-input-wrapper').append('<input type="text" id="_'+q.id+'" data-number="'+q.id+'" class="paper-input" maxlength="1" placeholder="'+q.number+'" />');
					}
				}
			} else if (exam.section_id == 30) {	// 수학영역
				if (q.number >= 22) {	// 22 ~ 30 bG5knvsac
					$('.paper-input-wrapper').append('<input type="text" id="_'+q.id+'" data-number="'+q.id+'" class="paper-input short" maxlength="3" placeholder="'+q.number+'" />');
				} else {
					$('.paper-input-wrapper').append('<input type="text" id="_'+q.id+'" data-number="'+q.id+'" class="paper-input" maxlength="1" placeholder="'+q.number+'" />');
				}
			} else {
				$('.paper-input-wrapper').append('<input type="text" id="_'+q.id+'" data-number="'+q.id+'" class="paper-input" maxlength="1" placeholder="'+q.number+'" />');
			}
		}
		// tag positioning
		$('.prob-tag').each(function(i) {
			if ($(this).width() != 0) {
				var margin = '-' + $(this).width()/2 + 'px';
				$(this).css({ 'left':'50%', 'margin-left':margin });
			}
		});
		$('.paper-input:first').qtip({
			content: {text:'정답을 문항번호에 맞게 입력하세요<br>클릭하면 해당 문제로 화면이 이동합니다'},
			position: {my:'bottom center', at:'top center'},
			style: {classes:'qtip-light qtip-shadow qtip-rounded'}
		});
		//$('.paper-input:first').qtip('show');
		$('.btn-grading').qtip({
			content: {text: '모든 문제의 답을 입력하세요'},
			position: {my: 'bottom center', at: 'top center'},
			style: {classes: 'qtip-light qtip-shadow qtip-rounded'}
		});
	},
	align_paper: function(paper) {
		// 시험지뷰 정렬은 크게 칼럼당 가장 아래 문제에 대한 여백의 필요 여부에 따라 구분된다.
		if ( $.inArray(paper.exam.subject_name, ['수리가', '수리나', '수학A', '수학B']) != -1 ) {
			// 여백이 필요한 경우
			$('.paper-wrapper').imagesLoaded( function() {
				var height = $('.paper-page').outerWidth(true)*0.5;
				$('.paper-page').each(function(i) {
					var compare = $(this).outerHeight(true);
					height = ( compare > height ) ? compare : height;
				});
				$('.paper-page').css({ 'min-height': height+'px' });
				// 각 칼럼별로 문제 수 & 문제 높이의 총합을 계산
				$('.paper-column').each(function(i) {
					var count=0, total=0, margin=0;
					count = $(this).find('.paper-question').length;
					total = $(this).height();
					margin = (height - total)/count;
					//console.log('토탈 : '+total+' / 마진 : '+margin);
					// 각 문제마다 계산된 여백 지정
					$(this).find('.paper-question').each(function(i) {
						//console.log(i+1 + ':' + $(this).outerHeight(true));
						$(this).css({'margin-bottom': margin+'px'});
						
					});
				});
			});
		} else {
			// 여백 불필요
			$('.paper-wrapper').imagesLoaded( function() {
				// 이미지 로딩이 끝난 후 임의의 최소높이(넓이*0.6)와 각 페이지 높이를 비교하여 최종 출력 높이를 결정
				var height = $('.paper-page').outerWidth(true)*0.6;
				//console.log('기본높이 : '+height);
				$('.paper-page').each(function(i) {
					var compare = $(this).height();
					//console.log('페이지'+i+' : '+compare);
					height = ( compare > height ) ? compare : height;
				});
				//console.log('변환높이 : '+height);
				$('.paper-page').css({ 'min-height': height+'px' });
				// 각 칼럼별로 문제 수 & 문제 높이의 총합을 계산
				$('.paper-column').each(function(i) {
					var count=0, total=0, margin=0;
					count = $(this).find('.paper-question').length + $(this).find('.paper-passage').length;
					//total = $(this).height();
					total = $(this).outerHeight(true);
					if (count > 1) margin = (height - total)/(count-1);
					//console.log('문제수: '+count+' / 높이: '+total+' / 마진: '+margin);
					// 각 문제마다 계산된 여백 지정 (제일 아래 문제 제외)
					if (margin < 0) margin = 0;
					$(this).find('.paper-question:not(:last-child)').each(function(i) {
						$(this).css({'margin-bottom': margin+'px'});
					});
				});
			});
		}
	},
	report_paper: function(report) {
		var self = this;
		$('.btn-grading').removeClass('disabled btn-grading').addClass('btn-regrading').html('<i class="fa-icon-refresh"></i> 다시채점하기');
		//$('.btn-regrading').qtip('option', 'content.text', '이전 채점결과는 저장되어 성적표에서 확인할 수 있습니다* 총점 성적표에는 최신 성적 기준으로 표시됩니다.');
		$('.btn-regrading').qtip({
			content: {text: '이전 성적은 저장되며 [성적표]에서 확인할 수 있습니다.<br>* [성적표 > 총점]은 최신 성적 기준으로 표시됩니다.'},
			position: {my: 'right center', at: 'left center'},
			style: {classes: 'qtip-light qtip-shadow qtip-rounded'}
		});
		$('li.count .number').html(report.score+' 점');
		var output = (report.output).split('');
		var input = (report.input).split('');
		$('input.paper-input').each(function(i) {
			var c = ( output[i] == 1 ) ? 'cornflowerblue' : '#e74c3c';
			$(this).val(input[i]).attr('readonly', true).css({ 'color':'white', 'background-color':c });
		});
		$('.paper-wrapper').imagesLoaded( function() {
			$('.paper-question').each(function(i) {
				if ( output[i] == 1 ) {
					$(this).find('.question-marker').addClass('right');
					$(this).find('.prob-result').append('정답 '+get_circled_number(input[i]));
				} else {
					$(this).find('.question-marker').addClass('wrong');
					$(this).find('.prob-result').append('오답 '+get_circled_number(input[i])+' | 정답 '+get_circled_number($(this).find('.prob-result').data('correct')));
				}
			});
		});
	}
}

function fix_answersheet() {
	//if ($(window).scrollTop() > 275) {
	if ($(window).scrollTop() > ($('.filter').outerHeight(true))/2-20 ) {
		$('.filter').css({'position': 'fixed', 'top': '50px'}).width($('.paper-wrapper').width()).addClass('fixed');
		var msg = '고'+$('.ft_grade .active').data('id')+' '+$('.ft_year .active').data('id')+'년 '+$('.ft_month .active').data('id')+'월 '+$('.ft_subject .active').data('name');
		$('.ft_section.summary').removeClass('hidden').find('.ft_summary_info').html(msg);
		$('.ft_section').not('.summary').hide();
		//$('#answersheet').css({'position':'fixed', 'top':'92px'}).width($('.paper-wrapper').width()).addClass('fixed');
		$('.paper-wrapper').css({ 'margin-top': $('.filter').outerHeight(true)+'px' });
	} else {
		$('.filter').css({'position': 'relative', 'top': 'auto'}).removeClass('fixed');
		$('.ft_section.summary').addClass('hidden');
		$('.ft_section').not('.summary').show();
		//$('#answersheet').css({'position':'relative', 'top':'auto'}).removeClass('fixed');
		$('.paper-wrapper').css({ 'margin-top': '0' });
	}
}

var setup_filter = function() {
	if ( $('ul.grade').find('.active').length ) {
		$('li.grade a').html( $('ul.grade').find('li.active').html() );
	} else {
		$('li.grade a').html( '학년' );
	}
	if ( $('ul.year').find('.active').length ) {
		$('li.year a').html( $('ul.year').find('li.active').html() );
	} else {
		$('li.year a').html( '년도' );
	}
	if ( $('ul.month').find('.active').length ) {
		$('li.month a').html( $('ul.month').find('li.active').html() );
	} else {
		$('li.month a').html( '시험' );
	}
	if ( $('ul.subject').find('.active').length ) {
		$('li.subject a').html( $('ul.subject').find('li.active').html() );
	} else {
		$('li.subject a').html( '과목' );
	}
}

$(document).ready(function() {
	var input_grade = $('.search-grade').val();
	var input_year = $('.search-year').val();
	var input_month = $('.search-month').val();
	var input_subject_name = $('.search-subject-name').val();
	var input_exam_id = $('.search-exam-id').val();
	$('ul.grade').find('li[data-id='+input_grade+']').addClass('active');
	$('ul.year').find('li[data-id='+input_year+']').addClass('active');
	$('ul.month').find('li[data-id='+input_month+']').addClass('active');
	if (input_year != 2013) {
		$('ul.subject .subject_new').addClass('hidden');
		$('ul.subject .subject_old').removeClass('hidden');
		$('ul.subject .subject_old').find('li[data-name='+input_subject_name+']').addClass('active');
	} else {
		$('ul.subject .subject_new').find('li[data-name='+input_subject_name+']').addClass('active');
	}
	
	if (input_exam_id) {
		var test = new paper({ exam_id: input_exam_id });
		test.initialize();
		test.get_paper();
	} else {
		$('.noresult').removeClass('hidden');
	}
	
	var filter_flag = true;
	$('.navbar-navy .nav>li.menu').click(function() {
		if (filter_flag) { filter_flag = false; $('.filterwrapper').slideDown(300); }
		else { $('.filterwrapper').slideUp(300, function() { filter_flag = true; }); }
	});
	$('.filter').off().on({
		'mouseleave' : function(e) { $('.filterwrapper').slideUp('fast'); filter_flag = true; }
	});
	
	$('.filterwrapper li').click(function() {
		if (!$(this).hasClass("active")) {
			// 각 칼럼별로 항목이 선택되지 않은 경우 무조건 선택처리
			$('.filterwrapper > ul').each(function() {
				if ($(this).find('.active').length === 0) {
					if ($(this).hasClass("subject")) {
						$(this).find('div').not('.hidden').find('li:first').addClass('active');
					} else if ($(this).hasClass("year")) {
						if ($('.subject_new').hasClass('hidden')) {
							$(this).find('li:nth-child(2)').addClass('active');
						} else {
							$(this).find('li:first').addClass('active');
						}
					} else {
						$(this).find('li:first').addClass('active');
					}
				}
			});
			if ($(this).parent().hasClass("grade")) {
				$(this).parent().find('li.active').removeClass("active");
			} else if ($(this).parent().hasClass("year")) {
				$(this).parent().find('li.active').removeClass("active");
				// 2013년 / 그이전년도 구분해서 과목을 표시해야함
				if ($(this).data('id') == '2013') {
					$('.subject_old').addClass('hidden');
					$('.subject_old').find('li.active').removeClass("active");
					$('.subject_new').removeClass('hidden');
					$('.subject_new').find('li:first').addClass('active');
				} else {
					$('.subject_new').addClass('hidden');
					$('.subject_new').find('li.active').removeClass("active");
					$('.subject_old').removeClass('hidden');
					if (!$('.subject_old').find('.active').length) {
						$('.subject_old').find('li:first').addClass('active');
					}
				}
			} else if ($(this).parent().hasClass("month")) {
				$(this).parent().find('li.active').removeClass("active");
			} else {
				$(this).parent().parent().find('li.active').removeClass("active");
			}
			
			$(this).addClass("active");
			// 각 칼럼별 필터값을 모아서 ajax로 전송
			var grade = $('ul.grade').find('li.active').data('id'),
				year = $('ul.year').find('li.active').data('id'),
				month = $('ul.month').find('li.active').data('id'),
				subject = $('ul.subject').find('li.active').data('id'),
				subject_name = $('ul.subject').find('li.active').text();
			window.location.href = "/grading/exam/고"+grade+"-"+year+"년-"+month+"월-"+subject_name;
		}
	});
	
	// 문제 인풋 고정
	$(window).scroll(fix_answersheet);
	
	$(document)
	.on('focus', '.paper-input', function() {
		// 해당 문제 스크롤 이동
		if ($('.filter').hasClass('fixed')) {
			$('html,body').animate({scrollTop: ($("#"+$(this).data('number')).offset().top - ( $('.filter').outerHeight(true) + $('.navbar-fixed-top').outerHeight(true) + 20))+'px'}, 50);
		} else {
			$('html,body').animate({scrollTop: ($("#"+$(this).data('number')).offset().top - ( $('.filter').outerHeight(true)*2 + $('.navbar-fixed-top').outerHeight(true) + 20))+'px'}, 'fast');
		}
		// 해당 문제 하이라이트
		$('.paper-question').removeClass('active');
		$('#'+$(this).data('number')).addClass('active');
	})
	.on('blur', '.paper-input', function(e) {
		if (this.value.length > 0) {
			$(this).addClass('checked');
		}
		$('.paper-question.active').removeClass('active');
	})
	.on('keydown', '.paper-input', function(e) {
		if (e.which == 37 || e.which == 38) { // 상, 좌 => 이전칸
			e.preventDefault();
			$(this).prev('input').select();
		} else if (e.which == 39 || e.which == 40) { // 하, 우 => 다음칸
			e.preventDefault();
			$(this).next('input').select();
		}
	})
	.on('keyup', '.paper-input', function(e) {
		// 백스페이스(8), 탭(9), 상(38), 하(40), 좌(37), 우(39)
		if ( e.which == 8 && this.value.length == 0 ) {
			$(this).removeClass('checked');
			$(this).prev().select();
		} else if ( e.which == 9 || e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40 ) {
			return;
		}
		// 입력값 유효성 검사, 키코드 체크
		var keys = [8, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 45, 46, 144, 145];
		// 쉬프트(16), 컨트롤(17), 알트(18), 퍼즈/브레이크(19), 캡스락(20), ESC(27)
		// 페이지업(33), 다운(34), 엔드(35), 홈(36), 인서트(45), 딜리트(46), 넘락(144), 스크롤락(145)
		if ($(this).hasClass('short')) { // 주관식
			var pattern = new RegExp('[^0-9]+', 'g');
			this.value = this.value.replace(pattern, '');
			if ( $(this).is(':last-child') ) {
				if ( $.inArray(e.which, keys) == -1 && this.value.length != 0 ) {
					$(this).addClass('checked');
					$(this).next('input').select();
				}
			} else {
				if ( $.inArray(e.which, keys) == -1 && this.value.length == 3 ) {
					$(this).addClass('checked');
					$(this).next('input').select();
				}
			}
		} else { // 객관식
			var pattern = new RegExp('[^1-5]+', 'g');
			this.value = this.value.replace(pattern, '');
			if ( $.inArray(e.which, keys) == -1 && this.value.length != 0 ) {
				$(this).addClass('checked');
				$(this).next('input').select();
			}
		}
		// 모든 입력칸 체크 & 채점하기 버튼 활성화
		if ($('.paper-input.checked').length == $('#answersheet').attr("data-count")) {
			$('.btn-grading').removeClass('disabled');
			$('.btn-grading').qtip('show');
			$('.btn-grading').qtip('api').set({
				'content.text': '채점하고 결과를 확인해보세요',
				'position.my': 'right center',
				'position.at': 'left center'
			});
		} else {
			$('.btn-grading').addClass('disabled');
			$('.btn-grading').qtip('hide');
		}
	})
	.on('click', '.btn-regrading', function(e) {
		e.preventDefault();
		$('.btn-regrading').qtip('api').set({
			'content.text': '모든 문제의 답을 입력하세요',
			'position.my': 'bottom center',
			'position.at': 'top center'
		});
		$('.btn-regrading').removeClass('btn-regrading').addClass('btn-grading disabled').html('<i class="fa-icon-check"></i> 채점하기');
		$('.btn-grading').qtip('api').hide();
		
		$('li.count .number').html($('li.count .number').data('count')+' 문제');
		$('input.paper-input').each(function(i) {
			$(this).val('').attr('readonly', false).removeClass('checked').css({ 'color':'', 'background-color':'' });
		});
		$('.paper-question').each(function(i) {
			$(this).find('.prob-result').empty().hide();
			$(this).find('.question-marker').removeClass('right wrong');
		});
		e.stopPropagation();
	})
	.on('click', '.btn-grading', function(e) {
		e.preventDefault();
		if ($(this).hasClass('disabled')) return;
		
		var answers = {};
		$('.paper-input.checked').each(function(i) {
			answers[$(this).attr("data-number")] = $(this).val();
		});
		if ( _.size(answers) != $('#answersheet').attr("data-count") ) {
			alert('모든 문제의 답을 입력하세요.');
			return;
		}
		$.ajax({
			type	: "POST",
			url		: '/grading/check',
			data	: { 'exam_meta': $('.paper-wrapper').attr('data-meta'), 'input': answers, 'title': $('.paper-title').text(), 'section': $('.paper-section:first').text() },
			success	: function (response) {
				if (response.result) {
					$('.btn-grading').qtip('api').set({
						'content.text': '이전 성적은 저장되며 [성적표]에서 확인할 수 있습니다.<br>* [성적표 > 총점]은 최신 성적 기준으로 표시됩니다.',
						'position.my': 'right center',
						'position.at': 'left center'
					});
					$('.btn-grading').removeClass('disabled btn-grading').addClass('btn-regrading').html('<i class="fa-icon-refresh"></i> 다시채점하기');
					for (var id in response.output){
						if (response.output[id] == 1) {
							$("#_"+id).removeClass('checked').attr('readonly', true).css({'background-color': 'cornflowerblue', 'color': 'white'});
							$('#'+id).find('.question-marker').addClass('right');
							$('#'+id).find('.prob-result').append('정답 '+get_circled_number( $('#'+id).find('.prob-result').data('correct') )).show();
						} else {
							$("#_"+id).removeClass('checked').attr('readonly', true).css({'background-color': 'firebrick', 'color': 'white'});
							$('#'+id).find('.question-marker').addClass('wrong');
							$('#'+id).find('.prob-result').append('오답 '+get_circled_number( $('#_'+id).val() )+' | 정답 '+get_circled_number( $('#'+id).find('.prob-result').data('correct') )).show();
						}
					}
					var note_elem = '';
					if (response.note.id) {
						if (response.note.id < 0) {
							note_elem = '<span><strong>만점을 축하합니다!</strong><br>혹시 맞았지만 확신할 수 없는 문제가 있지는 않았나요?</span>';
						} else {
							note_elem = '<span>틀린 '+response.note.count+'문제에 대한 [<a href="/note/view/'+response.note.id+'">'+response.note.title+'</a>] 오답노트를 생성했습니다.</span>' +
										'<span class="small">* 채점 후 \'자동 노트 생성\' 설정은 [<a href="/setting">설정</a>]탭에서 변경할 수 있습니다.</span>';
						}
					} else {
						note_elem = '<span class="small">틀린 문제에 대한 \'자동 노트 생성\' 설정이 해제되어있습니다.</span>'+
									'<span class="small">* 채점 후 \'자동 노트 생성\' 설정은 [<a href="/setting">설정</a>]탭에서 변경할 수 있습니다.</span>';
					}
					$.fancybox({
						'content' : '<div class="paper-score-wrapper">' +
										'<h4>'+response.title+'</h4>' +
										'<h3>'+response.section+'</h3>' +
										'<div class="paper-score-box">' +
											'<div class="paper-score-stat" style="border-color:#fabb3d;">'+response.score+'점</div>' +
											note_elem +
											'<span>시험지에서 각 문제를 선택해서 직접 오답노트에 저장할 수 있습니다.</span>' +
										'</div>' +
									'</div>'
					});
				} else {
					alert(response.message);
					return;
				}
			}
		});
		e.stopPropagation();
	});
});
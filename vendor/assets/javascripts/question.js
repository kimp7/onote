var questions = function(o) {
	this.options = {
		page: 1,
		tag_id: null,
		exam_id: null,
		template: {
			mask:
				'<div class="prob-content">' +
					'<img class="prob-img" src="{img}" alt="question_{id}" />' +
				'</div>' +
				'<div class="prob-tag">{tags}</div>' +
				'<div class="prob-check"><i class="fa-icon-ok-sign"></i></div>' +
				'<a href="/questions/{link}/{number}" data-id="{id}" class="view-single fancybox.ajax" data-fancybox-type="ajax" data-fancybox-group="questions">' +
					'<div class="prob-mask">' +
						'<div class="prob-title">고{grade} {year}년 {month}월 {subject} {number}번</div>' +
						'<div class="prob-meta">{meta}</div>' +
					'</div>' +
				'</a>'
		},
		container: $('div.question-wrapper')
	};
	
	$.extend(this.options, o || {});
}
questions.prototype = {
	initialize: function() {
		$('.question-wrapper').masonry({ columnWidth: 345, gutter: 0 });
		//$('.question-wrapper').masonry({ gutter:document.querySelector('.prob-margin') });
		$('.question-wrapper').empty();
		$('#loading').show();
		$.getJSON('/questions/total_count/', {
			tag_id: this.options.tag_id,
			exam_id: this.options.exam_id
		}, function(response) {
			if (response) {
				$('.noresult').addClass('hidden');
				$('li.count .number').html(response);
			} else {
				$('#loading').hide();
				$('.noresult').removeClass('hidden');
				$('li.count .number').html(response);
			}
		});
	},
	get_questions: function() {
		var self = this;
		if(this.options.page == 0) return false;
		$.getJSON('/questions/lists', {
			p: this.options.page,
			tag_id: this.options.tag_id,
			exam_id: this.options.exam_id
		}, function(response) {
			if (response && response.length > 0) {
				self.options.page++;
				self.render(response);
			} else {
				self.options.page = 0;
			}
		});
	},
	render: function(questions) {
		var self = this;
		var elems = [];
		var fragment = document.createDocumentFragment();
		for (i in questions) {
			var q = questions[i];
			var template = this.options.template['mask'];
			var tags_wrapper = meta = '';
			template = template.replace(/{id}/gi, q.id);
			template = template.replace(/{grade}/gi, q.grade);
			template = template.replace(/{year}/gi, q.year);
			template = template.replace(/{month}/gi, q.month);
			template = template.replace(/{subject}/gi, q.subject);
			template = template.replace(/{number}/gi, q.number);
			template = template.replace('{link}', '고'+q.grade+'-'+q.year+'년-'+q.month+'월-'+q.subject);
			template = template.replace('{img}', q.img);
			for (j in q.tags) {
				var t = q.tags[j];
				tags_wrapper += '<a href="/questions/tagging/'+q.subject+'/'+(t.name).replace(/ /g, '-')+'"><span data-id="'+t.id+'" class="label label-tag">'+t.name+'</span></a>';
			}
			template = template.replace('{tags}', tags_wrapper);
			meta = '<span class="prob-answer"><i class="icon-comment icon-white"></i> '+q.answers+'</span>';
			meta += '<span class="prob-examiner">'+q.examiner+'</span>';
			template = template.replace('{meta}', meta);
			var elem = document.createElement('div');
			$(elem).attr('data-id', q.id).attr('data-subject-id', q.subject_id);
			$(elem).attr('data-title', '고'+q.grade+' '+q.year+'년 '+q.month+'월 '+q.subject+' '+q.number+'번');
			$(elem).addClass('prob-box item').html(template);
			fragment.appendChild( elem );
			elems.push( elem );
		}
		// hide new items while they are loading
		$(fragment).children().css({opacity: 0});
		$('.question-wrapper').append( fragment );
		// tag positioning
		$('.prob-tag').each(function(i) {
			if ($(this).width() != 0) {
				var margin = '-' + $(this).width()/2 + 'px';
				$(this).css({ 'left':'50%', 'margin-left':margin });
			}
		});
		// ensure that images load before adding to masonry layout
		$('.question-wrapper').imagesLoaded( function() {
			// show elems now they're ready
			$(fragment).children().css({ opacity: 1 });
			$('#loading').hide();
		})
		.always( function() {
			$('.question-wrapper').masonry( 'appended', elems, false );
		})
		.progress( function( instance, image ) {
			//var result = image.isLoaded ? 'loaded' : 'broken';
    		//console.log( 'image is ' + result + ' for ' + image.img.src );
		});
		$('.label-tag').each(function(i) {
			var self = $(this);
			var target = null;
			$(this).qtip({
				overwrite: true,
				content: {
					text : function(event, api) {
						$.ajax({
							url: '/tag/info/'+$(this).attr('data-id'), type: 'GET', dataType: 'json', data: {},
						})
						.then(function(data) {
							var title = '';
							if (data.is) {
								title += '<span class="tag-follow active" data-id="'+data.id+'" data-value="on" ><i class="fa-icon-star"></i></span>';
							} else {
								title += '<span class="tag-follow" data-id="'+data.id+'" data-value="off" ><i class="fa-icon-star"></i></span>';
							}
							title += ' <span class="count">'+data.f+'</span>명 관심등록 중';
							api.set('content.title', title);
							var content = '['+self.text()+'] 에 대한 '+data.q+' 문제가 있습니다.';
							api.set('content.text', content);
						}, function(xhr, status, error) {
							api.set('content.text', status + ': ' + error);
						});
						return '태그 정보 불러오는 중...'
					},
					title: { text: $(this).text(), button: false }
				},
				position: { at:'bottom center', my:'top center', viewport:$(window), effect:false },
				style: { classes: 'qtip-tag qtip-dark qtip-shadow qtip-rounded' },
				show: { solo: true }, // Only show one tooltip at a time 
				hide: { fixed: true, delay: 200 },
				events: {
					show: function(event, api) {
						target = $(event.originalEvent.target).parent().parent().parent();
						target.addClass('active');
						console.log('show', target.context.innerText, target.hasClass('active'));
					},
					hide: function(event, api) {
						if (!target.hasClass('active')) {
							
						}
						console.log('hide', target.context.innerText, target.hasClass('active'));
						target.removeClass('active');
					},
					toggle: function(event, api) {
						//api.elements.target.toggleClass(event.type === 'tooltipshow');
						//console.log('toggle');
					}
				}
			});
		});
	}
}

var getHeight = function() {
	var myWidth = 0, myHeight = 0;
	if (typeof(window.innerWidth) == 'number') {
		// Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		// IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
		// IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	var scrolledtonum = window.pageYOffset + myHeight + 2;
	var heightofbody = document.body.offsetHeight;
	if (scrolledtonum >= heightofbody) {
		if (ql) { ql.get_questions(); }
	}
}

var ql = null;
$(document).ready(function() {
	$(window).scroll(_.throttle(getHeight, 1000));
	var input_tag = $('.search-tag-id').val();
	if ( input_tag ) {
		$('.filterwrapper').find('.active').removeClass('active');
		if ($('.subject_new').hasClass('hidden')) {
			$('.subject_old').addClass('hidden');
			$('.subject_new').removeClass('hidden');
		}
		ql = new questions({ tag_id: input_tag });
		ql.initialize();
		ql.get_questions();
		$('.tags').removeClass('hidden').find('.search-tag').html(
			'<span data-id="' + input_tag + '" class="label label-tag">' + $('.search-tag-name').val() + '</span>'
		);
		//$('input.search-query').val($('.search-tag-name').val());
	} else {
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
			ql = new questions({ exam_id: input_exam_id });
			ql.initialize();
			ql.get_questions();
		} else {
			$('.noresult').removeClass('hidden');
		}
	}
	$('.ft_wrapper li').click(function(e) {
		if (!$(this).hasClass('active')) {
			if ($(this).parent().hasClass("ft_year")) {
				$(this).parent().find('li.active').removeClass("active");
				// 2013년 / 그이전년도 구분해서 과목을 표시해야함
				if ($(this).data('id') == '2013') {
					$('.ft_subject.old').addClass('hidden').find('.active').removeClass("active");
					$('.ft_subject.new').removeClass('hidden').find('li:first-child').addClass('active');
				} else {
					$('.ft_subject.new').addClass('hidden').find('li.active').removeClass("active");
					$('.ft_subject.old').removeClass('hidden');
					if (!$('.ft_subject.old').find('.active').length) {
						$('.ft_subject.old').find('li:first-child').addClass('active');
					}
				}
			} else {
				$(this).parent().find('.active').removeClass('active');
			}
			$(this).addClass('active');
			// 각 칼럼별로 항목이 선택되지 않은 경우 무조건 선택처리
			$('.ft_wrapper ul').not('.hidden').each(function() {
				console.log($(this));
				if ($(this).find('.active').length === 0) {
					if ($(this).hasClass("ft_month")) {
						if ($('.ft_year').find('.active').data('id') == 2013) {
						//if (!$('.ft_subject.new').hasClass('hidden')) {
							$(this).find('li:nth-child(2)').addClass('active');
						} else {
							$(this).find('li:first-child').addClass('active');
						}
					} else {
						$(this).find('li:first-child').addClass('active');
					}
				}
			});
			var grade = $('.ft_grade').find('.active').data('id'),
				year = $('.ft_year').find('.active').data('id'),
				month = $('.ft_month').find('.active').data('id'),
				subject_name = $('.ft_subject').find('.active').html();
			window.location.href = "/questions/exam/고"+grade+"-"+year+"년-"+month+"월-"+subject_name;
		}
	});
	/* selecting prob-box */
	var selected_cnt = 0;
	$(document)
	.click(function() {
		$(this).find('.prob-box').removeClass('selected');
		selected_cnt = 0;
		$('.toolbar').fadeOut();
	})
	.on("click", ".prob-tag a", function(e) {
		e.preventDefault();
		window.location.href = this.href;
		e.stopPropagation();
	})
	.on("click", ".view-single", function(e) {
		if (e.ctrlKey || e.metaKey) {
			if ($(this).parent().hasClass("selected")) {
				$(this).parent().removeClass("selected");
				selected_cnt--;
			} else {
				$(this).parent().addClass("selected");
				selected_cnt++;
			}
			if (selected_cnt < 1) $('.toolbar').fadeOut();
			else $('.toolbar').fadeIn().find('.toolbar-desc').html(selected_cnt + ' 문제가 선택되었습니다.'); 		
			e.stopPropagation();
		}
	})
	.on("click", '.prob-check', function(e) {
		if ($(this).parent().hasClass("selected")) {
			$(this).parent().removeClass("selected");
			selected_cnt--;
		} else {
			$(this).parent().addClass("selected");
			selected_cnt++;
		}
		if (selected_cnt < 1) $('.toolbar').fadeOut();
		else $('.toolbar').fadeIn().find('.toolbar-desc').html(selected_cnt + ' 문제가 선택되었습니다.'); 		
		e.stopPropagation();
	})
	.on("click", '.btn-add-question', function(e) {
		e.preventDefault();
		var selected_list = [];
		$('.prob-box.selected').each(function(idx) {
			selected_list.push($(this).data('id'));
		});
		$.ajax({
			type: "GET",
			url: this.href,
			data: { 'subject_id': $('.prob-box.selected').data('subject-id'), 'question_array': selected_list },
			success	: function (data) {
				$.fancybox(data, {
					fitToView: true,
					afterClose: function() {
						$('.prob-box.selected').removeClass('selected');
						selected_cnt = 0;
						$('.toolbar').fadeOut();
					}
				});
			}
		});
		e.stopPropagation();
	})
	.on('click', '.fancybox-wrap', function(e) {
		e.stopPropagation();
	})
	.on("click", '.toolbar', function(e) {
		e.stopPropagation();
	});
	/*
	window.removeEventListener("keydown", arrow_keys_handler, false);
	var arrow_keys_handler = function(e) {
		switch(e.keyCode){
			case 38:
				console.log('38 up arrow');
				break;
			case 40:
				console.log('40 down arrow');
				break;
			case 32: e.preventDefault(); break; // Space
			default: break; // do not block other keys
		}
	};
	window.addEventListener("keydown", arrow_keys_handler, false);
	*/
});
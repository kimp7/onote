var notes = function(o) {
	this.options = {
		note_id: null,
		template: {
			fancy:
				'<div class="note-single">' +
					'<div class="note-header">' +
						'<div class="note-meta">{subject}</div>' +
					'</div>' +
					'<div class="note-body">' +
						'<div class="note-name"><span>{title}</span></div>' +
						'<div class="note-count">{total}</div>' +
					'</div>' +
					'<div class="note-footer">{btn_text}</div>' +
				'</div>' +
				'<div class="note-owner">' +
					'{owner_img}' +
					'<div class="owner-info">{owner_name}</div>' +
				'</div>',
		},
		container: $('div.note-wrapper')
	};
	$.extend(this.options, o || {});
}
notes.prototype = {
	initialize: function() {
		$('.note-wrapper').masonry({ "columnWidth":220, "gutter":0 });
		$('.note-wrapper').empty();
	},
	get_notes: function() {
		var self = this;
		$.getJSON('/note/lists', { }, function(response) {
			if (response && response.length > 0) {
				$('.empty').addClass('hidden');
				$('.note-stats-bar').removeClass('hidden');
				self.render(response);
			} else {
				$('.note-stats-bar').addClass('hidden');
				$('.empty').removeClass('hidden');
			}
		});
	},
	render: function(notes) {
		var self = this;
		var elems = [];
		var fragment = document.createDocumentFragment();
		var status, btn_text;
		for (i in notes) {
			var n = notes[i];
			var template = this.options.template['fancy'];
			template = template.replace('{owner_img}', '<a href="/'+n.owner.mypage_url+'"><img class="owner-img user-profile" src="'+n.owner.img+'" alt="owner" /></a>');
			template = template.replace('{owner_name}', '<a href="/'+n.owner.mypage_url+'">'+n.owner.nickname+'</a>');
			status = (n.status == 'PUBLIC') ? '' : '<i class="fa-icon-lock"></i> ';
			template = template.replace('{subject}', '<span class="label label-subject">'+status+n.subject.name+'</subject>');
			template = template.replace('{title}', n.title);
			template = template.replace('{total}', n.total+' 문제');
			if (n.is_owner) {
				btn_text = '<a href="/note/edit" class="btn-note btn-note-edit">편집하기</a>';
			} else {
				btn_text = '<a href="/note/bookmark/delete" class="btn-note btn-note-bookmark">즐겨찾기 해제</a>';
			}
			template = template.replace('{btn_text}', btn_text);
			
			var elem_box = document.createElement('div');
			$(elem_box).addClass('item');
			var elem = document.createElement('div');
			$(elem).attr('data-id', n.id);
			$(elem).attr('data-subject', n.subject.id);
			$(elem).addClass('note-box');
			$(elem).html(template);
			if (_.contains(['언어', '국어A', '국어B'], n.subject.name)) {
				$(elem).addClass('bg-green').find('.note-single').addClass('kor');
			} else if (_.contains(['외국어', '영어A', '영어B'], n.subject.name)) {
				$(elem).addClass('bg-yellow').find('.note-single').addClass('eng');;
			} else if (_.contains(['수리가', '수리나', '수학A', '수학B'], n.subject.name)) {
				$(elem).addClass('bg-red').find('.note-single').addClass('mat');;
			} else if (_.contains(['물리1', '물리2', '화학1', '화학2', '생물1', '생물2', '생명과학1', '생명과학2', '지구과학1', '지구과학2'], n.subject.name)) {
				$(elem).addClass('bg-purple').find('.note-single').addClass('sci');;
			} else {
				$(elem).addClass('bg-cyan').find('.note-single').addClass('soc');;
			}
			$(elem_box).html(elem);
			// append to container
			fragment.appendChild( elem_box );
			elems.push( elem_box );
		}
		//$(fragment).children().css({opacity: 0});
		$('.note-wrapper').append( fragment );
		//$(fragment).children().animate({ opacity: 1 });
		$('.note-wrapper').masonry( 'appended', elems, false );
		$('.note-name span').wordBreakKeepAll();
	}
}

var qbox = function(o) {
	this.options = {
		note_id: null,
		template: {
			mask:
				'<div class="qbox">' +
					'<img class="qbox-img" src="{qbox_img}" alt="question" />' +
				'</div>' +
				'<div class="qbox-title">{qbox_title}</div>' +
				'<div class="qbox-check"><i class="fa-icon-ok-sign"></i></div>' +
				'<a href="{qbox_link}" data-id="{id}" class="view-single" data-fancybox-type="ajax" data-fancybox-group="questions">' +
					'<div class="qbox-mask"></div>' +
				'</a>'
		},
		container: $('div.qbox-wrapper')
	};
	$.extend(this.options, o || {});
}
qbox.prototype = {
	initialize: function() {
		$('.qbox-wrapper').masonry({ "columnWidth":240, "gutter":10, "stamp":".stamp" });
		$('.qbox-wrapper').empty();
	},
	get_qboxes: function() {
		var self = this;
		$.getJSON('/note/lists/question/'+this.options.note_id, { }, function(response) {
			if (response && response.length > 0) {
				$('.note-bar-sort').removeClass('hidden');
				$('.empty').addClass('hidden');
				$('.note-stats-bar').removeClass('hidden');
				self.render(response);
			} else {
				//self.options.container.append('<p>노트에 문제가 없습니다.</p>');
				$('.empty').removeClass('hidden');
			}
		});
	},
	render: function(qboxes) {
		var self = this;
		var elems = [];
		var fragment = document.createDocumentFragment();
		var info;
		var stamp = document.createElement('div');
		$(stamp).addClass('stamp round-small').html('<i class="fa-icon-plus-sign"></i><span>문제 추가하기</span>');
		fragment.appendChild(stamp);
		elems.push(stamp);
		for (i in qboxes) {
			var q = qboxes[i];
			var template = this.options.template['mask'];
			template = template.replace(/{id}/gi, q.id);
			template = template.replace('{qbox_img}', q.img);
			info = '고'+q.grade+' '+q.year + '년 ' + q.month + '월 ' + q.number + '번';
			template = template.replace('{qbox_title}', info);
			template = template.replace('{qbox_link}', '/questions/'+'고'+q.grade+'-'+q.year+'년-'+q.month+'월-'+q.subject+'/'+q.number);
			var elem = document.createElement('div');
			$(elem).attr('data-id', q.id);
			$(elem).attr('data-title', '고'+q.grade+' '+q.year+'년 '+q.month+'월 '+q.subject+' '+q.number+'번');
			$(elem).addClass('qbox-container round-small item');
			elem.innerHTML = template;
			// append to container
			fragment.appendChild( elem );
			elems.push( elem );
		}
		$('.qbox-wrapper').append( fragment );
		$('.qbox-wrapper').masonry( 'appended', elems, false );
	}
}

$(document).ready(function() {
	var path = (window.location.pathname).split('/');
	if (path.length < 3) {
		var nt = new notes();
		nt.initialize();
		nt.get_notes();
	} else {
		switch(path[2]) {
			case 'view':
				if ($('#is_owner').val()) {
					var qb = new qbox({note_id : path[3]});
					qb.initialize();
					qb.get_qboxes();
				}
				break;
			case 'bookmark':
				break;
			default:
				break;
		}
	}
	
	$(document)
	.click(function(e) {
		$(this).find('.qbox-container').removeClass('selected');
		$('#sq').val(0);
		$('.toolbar').fadeOut();
		$('.btn-unselect-all').hide();
		$('.btn-select-all').show();
	})
	.on("click", '.btn-note-create', function(e) {
		e.preventDefault();
		$.ajax({
			type: "GET", url: this.href, data: {  },
			success	: function (data) {
				$.fancybox(data, { openEffect:'none', closeEffect:'none' });
			}
		});
		e.stopPropagation();
		return;
	})
	.on('click', '.btn-note-edit', function(e) {
		e.preventDefault();
		var self = $(this).parents(".note-box");
		$.ajax({
			type:"GET", url:this.href, data:{ 'note_id':self.data('id'), 'subject_id':self.data('subject') },
			success: function(data) {
				$.fancybox(data, {
					afterShow: function() { $('input#name').focus(); },
					afterClose: function() {
						$('.note-wrapper').empty();
						var nt = new notes();
						nt.initialize();
						nt.get_notes();
					}
				});
			}
		});
		e.stopPropagation();
		return;
	})
	.on('click', '.qbox-wrapper .stamp', function(e) {
		window.location.href = '/questions/exam/'+$('#latest').val()+'-'+$('.note-stat-item-name').text();
	})
	.on('click', '.btn-note-bookmark', function(e) {
		e.preventDefault();
		var self = $(this).parents(".note-box");
		$.ajax({
			type:"POST", url:this.href, data:{ 'note_id':self.data('id') },
			success: function(data) {
				$('.note-wrapper').masonry('remove', self);
				$('.note-wrapper').masonry();
			}
		})
		e.stopPropagation();
		return;
	})
	.on('click', '.btn-edit-question', function(e) {
		e.preventDefault();
		var selected_list = [];
		var self = $(this);
		$('.qbox-container.selected').each(function(idx) {
			selected_list.push($(this).data('id'));
		});
		$.ajax({
			type: "GET", url: this.href, data: { 'note_id': $('.qbox-wrapper').data('note'), 'subject_id': $('.qbox-wrapper').data('subject'), 'question_array': selected_list  },
			success: function(data) {
				$.fancybox(data, {
					openEffect:'none',
					closeEffect:'none',
					afterClose: function() {
						if ((self.data('value') == 'delete' || self.data('value') == 'move') && $('.qbox-container.selected').length == 0) {
							var cnt = $('.note-stat-item-cnt').text();
							$('.note-stat-item-cnt').html(parseInt(cnt)-selected_list.length);
							for (i in selected_list) {
								$('.qbox-wrapper').masonry('remove', $('.qbox-container[data-id="'+selected_list[i]+'"]'));
							}
							$('.qbox-wrapper').masonry();
						}
					}
				});
			}
		});
		e.stopPropagation();
		return;
	})
	.on("click", '.note-box', function(e) {
		window.location.href = '/note/view/'+$(this).attr('data-id');
		e.stopPropagation();
		return;
	})
	.on("click", ".view-single", function(e) {
		if (e.ctrlKey || e.metaKey) {
			var cur = parseInt($('#sq').val());
			if ($(this).parent().hasClass("selected")) {
				$(this).parent().removeClass("selected");
				$('#sq').val(cur-1);
			} else {
				$(this).parent().addClass("selected");
				$('#sq').val(cur+1);
			}
			$('.btn-unselect-all').hide();
			$('.btn-select-all').show();
			if (parseInt($('#sq').val()) < 1) $('.toolbar').fadeOut();
			else $('.toolbar').fadeIn().find('.toolbar-desc').html($('#sq').val() + ' 문제가 선택되었습니다.'); 		
			e.stopPropagation();
		}
	})
	.on("click", '.qbox-check, .qbox-title', function(e) {
		e.preventDefault();
		var cur = parseInt($('#sq').val());
		if ($(this).parent().hasClass("selected")) {
			$(this).parent().removeClass("selected");
			$('#sq').val(cur-1);
		} else {
			$(this).parent().addClass("selected");
			$('#sq').val(cur+1);
		}
		$('.btn-unselect-all').hide();
		$('.btn-select-all').show();
		if (parseInt($('#sq').val()) < 1) $('.toolbar').fadeOut();
		else $('.toolbar').fadeIn().find('.toolbar-desc').html($('#sq').val() + ' 문제가 선택되었습니다.'); 		
		e.stopPropagation();
	})
	.on('click', '.btn-select-all', function(e) {
		var total = 0;
		$('.qbox-container').each(function(i) {
			total++;
			$(this).addClass("selected");
		});
		$('#sq').val(total);
		$('.toolbar').fadeIn().find('.toolbar-desc').html($('#sq').val() + ' 문제가 선택되었습니다.');
		$(this).hide();
		$('.btn-unselect-all').show();
		e.stopPropagation();
	})
	.on('click', '.btn-unselect-all', function(e) {
		$(this).hide();
		$('.btn-select-all').show();
	})
	.on('click', '.fancybox-wrap', function(e) {
		e.stopPropagation();
	})
	.on("click", '.toolbar', function(e) {
		e.stopPropagation();
	});
});
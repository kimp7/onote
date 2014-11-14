var mypage = function(o) {
	this.options = {
		target: null,
		template: {
			notes:
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
			questions:
				'<div class="qbox">' +
					'<img class="qbox-img" src="{qbox_img}" alt="question" />' +
				'</div>' +
				'<div class="qbox-title">{qbox_title}</div>' +
				'<a href="{qbox_link}" data-id="{id}" class="view-single" data-fancybox-type="ajax" data-fancybox-group="questions">' +
					'<div class="qbox-mask"></div>' +
				'</a>',
			tags:
				'<div></div>',
			answer_lists:
				'<li>' +
					'<a href="{answer_link}" class="">{answer_list}</a>' +
				'</li>',
			follows:
				'<div class="user-card-wrapper">' +
					'<div class="user-card round" data-id="{id}">' +
						'<div class="user-info">' +
							'<a href="{mypage_url}">' +
								'<img class="user-profile" alt="{nickname}" src="{profile}" />' +
							'</a>' +
							'<div class="user-point">내공 <strong>{point}</strong></div>' +
						'</div>' +
						'<div class="user-details">' +
							'<a href="{mypage_url}" class="user-name">{nickname}</a>' +
							'<div class="user-bio">{bio}</div>' +
							'{btn_follow}' +
						'</div>' +
					'</div>' +
				'</div>'
		},
		container: $('div.tab-pane')
	};
	$.extend(this.options, o || {});
}
mypage.prototype = {
	initialize: function() {
		this.options.container = $('#'+this.options.target);
		this.options.container.empty();
		$('#loading').show();
	},
	get_data: function() {
		//console.log('get_data...'+this.options.target);
		var self = this;
		$.getJSON('/mypage/'+this.options.target, { 'user_id':$('#username').data('id') }, function(response) {
			$('#loading').hide();
			$('.mypage-title').html(response.title);
			if (response && _.size(response.data) > 0) {
				if ((self.options.target).indexOf("questions") != -1) {
					self.render_questions(response.data);
				} else {
					$('.nav-tabs').find('.'+self.options.target).attr('data-title', response.title);
					if (self.options.target == 'notes') {
						self.render_notes(response.data);
					} else if (self.options.target == 'tags') {
						self.render_tags(response.data);
					} else if (self.options.target == 'answers') {
						self.render_answers(response.data);
					} else if (self.options.target == 'follows') {
						self.render_follows(response.data);
					} else {
						
					}
				}
			} else {
				$('.mypage-title').html('');
				$('.nav-tabs').find('.'+self.options.target).attr('data-title', '');
				var empty_elem = '';
				if (self.options.target == 'notes') {
					empty_elem = '<div class="empty"><i class="fa-icon-book"></i><br><br>'+$('#username').text()+'님의 공개된 오답노트가 없습니다.</div>';
				} else if ((self.options.target).indexOf("questions") != -1) {
					$('.mypage-title').html(response.title);
					empty_elem = '<div class="empty"><i class="fa-icon-edit"></i></i><br><br>빈 오답노트 입니다.</div>';
				} else if (self.options.target == 'tags') {
					empty_elem = '<div class="empty"><i class="fa-icon-tags"></i><br><br>'+$('#username').text()+'님이 관심등록한 태그가 없습니다.</div>';
				} else if (self.options.target == 'answers') {
					empty_elem = '<div class="empty"><i class="fa-icon-comments-alt"></i><br><br>'+$('#username').text()+'님은 아직 등록한 해설이 없습니다.</div>';
				} else {
					empty_elem = '<div class="empty"><i class="fa-icon-warning-sign"></i><br><br>결과가 없습니다.</div>';
				}
				//$('.tab-pane').html('<a href="#notes" class="btn btn-danger note-back"><i class="fa-icon-undo"></i> 돌아가기</a>');
				self.options.container.append(empty_elem);
			}
		});
	},
	render_notes: function(notes) {
		var self = this;
		var fragment = document.createDocumentFragment();
		var status, btn_text;
		for (i in notes) {
			var n = notes[i];
			var template = this.options.template['notes'];
			//template = template.replace(/{id}/gi, n.id);
			template = template.replace('{owner_img}', '<a href="/'+n.owner.mypage_url+'"><img class="owner-img user-profile" src="'+n.owner.img+'" alt="owner" /></a>');
			template = template.replace('{owner_name}', '<a href="/'+n.owner.mypage_url+'">'+n.owner.nickname+'</a>');
			status = (n.status == 'PUBLIC') ? '' : '<i class="fa-icon-lock"></i> ';
			template = template.replace('{subject}', '<span class="label label-subject">'+status+n.subject.name+'</subject>');
			template = template.replace('{title}', n.title);
			template = template.replace('{total}', n.total+' 문제');
			if (n.is_owner) {
				btn_text = '<a href="/note/edit" class="btn-note btn-note-edit">편집하기</a>';
			} else {
				if (n.is_bookmark) {
					btn_text = '<a href="/note/bookmark/delete" class="btn-note btn-note-bookmark">즐겨찾기 해제</a>';
				} else {
					btn_text = '<a href="/note/bookmark/add" class="btn-note btn-note-bookmark">즐겨찾기 추가</a>';
				}
			}
			template = template.replace('{btn_text}', btn_text);
			
			var elem = document.createElement('div');
			$(elem).attr('data-id', n.id);
			$(elem).attr('data-subject', n.subject.id);
			$(elem).addClass('note-box item');
			if (_.contains(['언어', '국어A', '국어B'], n.subject.name)) {
				$(elem).addClass('bg-green');
			} else if (_.contains(['외국어', '영어A', '영어B'], n.subject.name)) {
				$(elem).addClass('bg-yellow');
			} else if (_.contains(['수리가', '수리나', '수학A', '수학B'], n.subject.name)) {
				$(elem).addClass('bg-red');
			} else if (_.contains(['물리1', '물리2', '화학1', '화학2', '생물1', '생물2', '생명과학1', '생명과학2', '지구과학1', '지구과학2'], n.subject.name)) {
				$(elem).addClass('bg-purple');
			} else {
				$(elem).addClass('bg-cyan');
			}
			$(elem).html(template);
			fragment.appendChild( elem );
		}
		self.options.container.append(fragment);
		$('.note-name span').wordBreakKeepAll();
	},
	render_questions: function(questions) {
		var self = this;
		var fragment = document.createDocumentFragment();
		var info;
		for (i in questions) {
			var q = questions[i];
			var template = this.options.template['questions'];
			
			template = template.replace('{qbox_img}', q.img);
			info = q.year + '년 ' + q.month + '월 ' + q.number + '번';
			template = template.replace('{qbox_title}', info);
			template = template.replace('{qbox_link}', '/questions/'+'고'+q.grade+'-'+q.year+'년-'+q.month+'월-'+q.subject+'/'+q.number);
			var elem = document.createElement('div');
			$(elem).attr('data-id', q.id).attr('data-title', '고'+q.grade+' '+q.year+'년 '+q.month+'월 '+q.subject+' '+q.number+'번');
			$(elem).addClass('qbox-container round-small item').html(template);
			fragment.appendChild(elem);
		}
		self.options.container.append(fragment);
	},
	render_tags: function(tags) {
		var self = this;
		var fragment = document.createDocumentFragment();
		for (i in tags) {
			var block = document.createElement('div');
			var group = tags[i];
			$(block).addClass('tag-box round-small').append('<div data-id="'+group[0].subject_id+'" class="tag-box-title">'+i+' ('+_.size(group)+')</div>');
			for (j in group) {
				var t = group[j];
				$(block).append('<a href="/questions/tagging/'+i+'/'+(t.name).replace(/ /g, '-')+'"><span data-id="'+t.id+'" class="label label-tag">'+t.name+'</span></a>');
			}
			fragment.appendChild(block);
		}
		self.options.container.append(fragment);
	},
	render_answers: function(answers) {
		var self = this;
		var lists = document.createElement('ul');
		$(lists).addClass('answer-lists dashboard-list');
		var link, item;
		for (i in answers) {
			var a = answers[i];
			var template = this.options.template['answer_lists'];
			link = '고'+a.question.grade+' '+a.question.year+'년 '+a.question.month+'월 '+a.question.name+' '+a.question.number+'번';
			template = template.replace('{answer_link}', '/questions/'+'고'+a.question.grade+'-'+a.question.year+'년-'+a.question.month+'월-'+a.question.name+'/'+a.question.number);
			var text = $(a.data).text();
			if (text === '') text = '...이미지 해설...';
			if (parseInt(a.votes) >= 0) {
				item = '<div class="a-vote peterriver">'+a.votes+'</div>';
				item += '<div class="a-info">'+link+'</div>';
				item += '<p class="a-comment"><strong>['+a.answer_type+']</strong> '+text+'</p>';
				item += '<div class="a-date">'+a.updated+'</div>';
			} else {
				item = '<div class="a-vote red">'+a.votes+'</div>';
				item += '<div class="a-info">'+link+'</div>';
				item += '<p class="a-comment"><strong>['+a.answer_type+']</strong> '+text+'</p>';
				item += '<div class="a-date">'+a.updated+'</div>';
			}
			template = template.replace('{answer_list}', item);
			$(lists).append(template);
		}
		self.options.container.append(lists);
	},
	render_follows: function(follows) {
		var self = this;
		var tabs = document.createElement('div');
		$(tabs).addClass('tab-follows').append('<span class="btn-follow follower active">팔로워('+_.size(follows.follower)+')</span><span class="btn-follow following">팔로잉('+_.size(follows.following)+')</span>');
		self.options.container.append(tabs);
		var tab1 = document.createElement('div');
		$(tab1).addClass('tab-following')
		if ( _.size(follows.following) > 0 ) {
			for (i in follows.following) {
				var u = follows.following[i];
				var template = this.options.template['follows'];
				template = template.replace(/{id}/gi, u.id);
				template = template.replace(/{nickname}/gi, u.nickname);
				template = template.replace(/{mypage_url}/gi, '/'+u.mypage_url);
				template = template.replace('{profile}', u.profile);
				template = template.replace('{point}', u.point);
				template = template.replace('{bio}', u.bio);
				var btn_follow = '';
				if ($('.header-btn-user').attr('data-id') != u.id) {
					if (u.is_follow) {
						btn_follow = '<button type="button" data-value="off" class="btn btn-mini btn-user-follow btn-other-follow disabled"><i class="fa-icon-ok"></i>팔로잉</button>';
					} else {
						btn_follow = '<button type="button" data-value="on" class="btn btn-mini btn-success btn-user-follow btn-other-follow"><i class="fa-icon-plus"></i>팔로우</button>';
					}
				}
				template = template.replace('{btn_follow}', btn_follow);
				$(tab1).append(template);
			}
		} else {
			$(tab1).append('<div class="empty"><i class="fa-icon-group"></i><br><br>'+$('#username').text()+'님은 아직 팔로잉이 없습니다.</div>');
		}
		var tab2 = document.createElement('div');
		$(tab2).addClass('tab-follower');
		if ( _.size(follows.follower) ) {
			for (i in follows.follower) {
				var u = follows.follower[i];
				var template = this.options.template['follows'];
				template = template.replace(/{id}/gi, u.id);
				template = template.replace(/{nickname}/gi, u.nickname);
				template = template.replace(/{mypage_url}/gi, '/'+u.mypage_url);
				template = template.replace('{profile}', u.profile);
				template = template.replace('{point}', u.point);
				template = template.replace('{bio}', u.bio);
				var btn_follow = '';
				if ($('.header-btn-user').attr('data-id') != u.id) {
					if (u.is_follow) {
						btn_follow = '<button type="button" data-value="off" class="btn btn-mini btn-user-follow btn-other-follow disabled"><i class="fa-icon-ok"></i>팔로잉</button>';
					} else {
						btn_follow = '<button type="button" data-value="on" class="btn btn-mini btn-success btn-user-follow btn-other-follow"><i class="fa-icon-plus"></i>팔로우</button>';
					}
				}
				template = template.replace('{btn_follow}', btn_follow);
				$(tab2).append(template);
			}
		} else {
			$(tab2).append('<div class="empty"><i class="fa-icon-group"></i><br><br>'+$('#username').text()+'님은 아직 팔로워가 없습니다.</div>');
		}
		self.options.container.append(tab1).append(tab2);
	}
}

$(document).ready(function() {
	$('.nav-mypage').tab();
	$('.nav-mypage').bind("show", function(e) {
		var target = $(e.target).attr('href');
		if ($(e.target).attr('data-load') == 'n') {
			var mp = new mypage({ target: target.substr(1) });
			mp.initialize();
			mp.get_data();
			$(e.target).attr('data-load', 'y');
		} else {
			$('.mypage-title').html($(e.target).attr('data-title'));
		}
		//$(target).tab('show');
		$('.tab-pane.active').hide();
		$(target).fadeIn(300);
	});
	
	var hash = window.location.hash;
	if(!hash) {
		$('.nav-mypage a:last').tab("show");
	}
	hash && $('ul.nav a[href="' + hash + '"]').tab('show');
	
	$('.nav-tabs a').click(function (e) {
		var scrollmem = $('body').scrollTop();
		window.location.hash = this.hash;
		$('html,body').scrollTop(scrollmem);
	});
	
	$('.btn-user-edit').qtip({
		content: { text: '프로필 수정' },
		position: { my: 'bottom center', at: 'top center' },
		style: { classes: 'qtip-dark qtip-shadow qtip-rounded' }
	});
	
	$(".btn-user-follow").hover(
		function () {
			if ($(this).attr('data-value') === 'on') { $(this).html('<i class="fa-icon-plus-sign"></i>팔로우'); } else { $(this).html('<i class="fa-icon-remove-sign"></i>언팔로우'); }
		}, function () {
			if ($(this).attr('data-value') === 'on') { $(this).html('<i class="fa-icon-plus"></i>팔로우'); } else { $(this).html('<i class="fa-icon-ok"></i>팔로잉'); }
		}
	);
	
	$(document)
	.on('click', '.item-follow', function(e) {
		$('a.follows').trigger('click');
	})
	.on('click', '.item-answer', function(e) {
		$('a.answers').trigger('click');
	})
	.on('click', '.btn-user-edit', function(e) {
		e.preventDefault();
		var self = $(this);
		$.ajax({
			type:"GET", url:'/mypage/user_edit', data: { },
			success: function(data) {
				$.fancybox(data, {
					afterShow:function(){$('input.nickname').focus();},
					afterClose:function(){}
				});
			}
		});
		e.stopPropagation();
		return;
	})
	.on('click', '.btn-owner-follow', function(e) {
		var self = $(this);
		$.ajax({
			type:"POST", url:'/mypage/follow',
			data:{ 'target_id':$('#username').data('id'), 'status': self.attr('data-value'), 'url':$('#username').data('url') },
			success: function(response) {
				if (response.result) {
					var cnt = $('.item-follow .count').text();
					if (self.attr('data-value') == 'on') {
						self.attr('data-value', 'off');
						self.html('<i class="fa-icon-ok"></i>팔로잉');
						self.addClass('disabled').removeClass('btn-success');
						$('.item-follow .count').text(parseInt(cnt)+1);
					} else {
						self.attr('data-value', 'on');
						self.html('<i class="fa-icon-plus"></i>팔로우');
						self.removeClass('disabled').addClass('btn-success');
						$('.item-follow .count').text(parseInt(cnt)-1);
					}
				} else {
					if (response.is_login) {
						$.ajax({
							type: "GET", url: response.return_url, data: {  },
							success	: function (data) {
								$.fancybox(data, {
									afterShow: function() { $('input#email').focus(); }
								});
							}
						});
					} else {
						bootbox.dialog(response.message, [{
							"label" : "확인",
							"class" : "btn-danger"
						}]);
						return;
					}
				}
			}
		});
		return;
	})
	.on('mouseenter', '.btn-other-follow', function(e) {
		if ($(this).attr('data-value') === 'on') { $(this).html('<i class="fa-icon-plus-sign"></i>팔로우'); } else { $(this).html('<i class="fa-icon-remove-sign"></i>언팔로우'); }
	})
	.on('mouseleave', '.btn-other-follow', function(e) {
		if ($(this).attr('data-value') === 'on') { $(this).html('<i class="fa-icon-plus"></i>팔로우'); } else { $(this).html('<i class="fa-icon-ok"></i>팔로잉'); }
	})
	.on('click', '.btn-other-follow', function(e) {
		var self = $(this);
		$.ajax({
			type:"POST", url:'/mypage/follow',
			data:{ 'target_id':self.parent().parent().data('id'), 'status': self.attr('data-value'), 'url':'ranking' },
			success: function(response) {
				if (response.result) {
					if (self.attr('data-value') === 'on') {
						self.attr('data-value', 'off');
						self.html('<i class="fa-icon-ok"></i>팔로잉');
						self.addClass('disabled').removeClass('btn-success');
					} else {
						self.attr('data-value', 'on');
						self.html('<i class="fa-icon-plus"></i>팔로우');
						self.removeClass('disabled').addClass('btn-success');
					}
				} else {
					if (response.is_login) {
						$.ajax({
							type: "GET", url: response.return_url, data: {  },
							success	: function (data) {
								$.fancybox(data, {
									afterShow: function() { $('input#email').focus(); }
								});
							}
						});
					} else {
						bootbox.dialog(response.message, [{
							"label" : "확인",
							"class" : "btn-danger"
						}]);
						return;
					}
				}
			}
		});
		return;
	})
	.on("click", '.btn-note-bookmark', function(e) {
		e.preventDefault();
		var self = $(this).parents(".note-box");
		$.ajax({
			type:"POST", url:this.href, data: { 'note_id': self.attr('data-id') },
			success: function(response) {
				if (response.result) {
					var btn = self.find('.note-footer a.btn-note-bookmark');
					if (response.flag === 'add') {
						btn.attr('href', '/note/bookmark/delete');
						btn.html('즐겨찾기 해제');
					} else {
						btn.attr('href', '/note/bookmark/add');
						btn.html('즐겨찾기 추가');
					}
				} else {
					if (response.message) {
						bootbox.dialog(response.message, [{
							"label" : "확인",
							"class" : "btn-danger"
						}]);
					} else {
						$.ajax({
							type: "GET", url: '/login?return_url='+$('#username').data('url'), data: {  },
							success	: function (data) {
								$.fancybox(data, {
									afterShow: function() { $('input#email').focus(); }
								});
							}
						});
					}
				}
			}
		});
		e.stopPropagation();
		return;
	})
	.on('click', '.btn-note-edit', function(e) {
		e.preventDefault();
		var self = $(this).parents(".note-box");
		$.ajax({
			type:"GET", url:this.href, data: { 'note_id': self.data('id'), 'subject_id': self.data('subject') },
			success: function(data) {
				$.fancybox(data, {
					afterShow:function(){$('input#name').focus();},
					afterClose:function(){
						var qb = new mypage({ target: 'notes', container: $('#notes') });
						$('#notes').empty();
						qb.get_data();
					} 
				});
			}
		});
		e.stopPropagation();
		return;
	})
	.on('click', '.note-single', function(e) {
		e.preventDefault();
		var qb = new mypage({ target:'questions/'+$(this).parent().data('id'), container: $('#notes') });
		$('#notes').empty();
		qb.get_data();
		e.stopPropagation();
		return;
	})
	.on('click', '.note-back', function(e) {
		var mp = new mypage({ target: 'notes' });
		mp.initialize();
		mp.get_data();
		//$('#notes').tab('show');
	})
	.on('click', '.btn-follow', function(e) {
		if (!$(this).hasClass('active')) {
			if ($(this).hasClass('follower')) {
				$('.tab-following').hide();
				$('.tab-follower').fadeIn(300);
				$(this).addClass('active');
				$('.btn-follow.following').removeClass('active');
			} else {
				$('.tab-follower').hide();
				$('.tab-following').fadeIn(300);
				$(this).addClass('active');
				$('.btn-follow.follower').removeClass('active');
			}
		}
	});
});
$(document).ready(function() {
	var resizer = null;
	$('.single-wrapper').imagesLoaded( function() {
		tinymce.init({plugins : 'advlist autolink link image charmap lists preview jbimages autoresize'});
		$.fancybox.update();
		//console.log(window.location.href);
	});
	$('.editor-frame-login').click(function(e) {
		$.ajax({
			type: "GET", url: '/login?return_url=', data: {  },
			success	: function (data) {
				$.fancybox(data, { afterShow: function() { $('input#email').focus(); } });
			}
		});
	});
	$('.editor-frame').click(function(e) {
		$(this).addClass('hidden');
		var new_editor = '<form id="new-editor" method="post" style="margin-bottom:0;">' +
							'<textarea id="new-answer" class="new-answer" placeholder="자신만의 풀이를 작성해서 공유해보세요!"></textarea>'+
						'</form>';
		$(this).next().prepend(new_editor);
		tinymce.init({
			selector: "textarea.new-answer",
			language : 'ko_KR',
			plugins : 'advlist autolink link image charmap lists preview jbimages autoresize',
			menubar : false,
			statusbar : false,
			resize: false,
			toolbar: "bold underline bullist numlist hr charmap link jbimages preview",
			autoresize_min_height: 100,
			autoresize_max_height: 800,
			content_css : "/static/vendor/tinymce/odab-editor.css",
			relative_urls:false,
			//nowrap : false,
			//force_br_newlines: true,
			//force_p_newlines: false,
			setup : function(editor) {
				editor.on('LoadContent', function(e) {
					tinymce.activeEditor.setContent('');
					tinymce.activeEditor.focus();
					//setInterval(function() { console.log('interval ', tinymce.activeEditor.execCommand('mceAutoResize', false)); }, 1000);
				});
			}
		});
		$(this).next().removeClass('hidden');
	});
	$('.btn-add-answer').click(function(e) {
		var user = $('.editor-meta a');
		var type = $('.answer-types').val();
		var content = tinymce.activeEditor.getContent();
		if ( content.replace(/(<p>)|(<\/p>)|(&nbsp;)|(\s+)/gi,'') == '' ) {
			alert('내용을 입력해주세요'); return;
		}
		$.ajax({
			type	: "POST",
			url		: '/answer/add/'+$('.single').attr('data-id'),
			data	: { 'answer_type': $('.answer-type:selected').data('type'), 'content': content },
			success	: function(response) {
				if (response.result) {
					tinymce.activeEditor.destroy();
					$('form#new-editor').remove();
					var now = new Date();
					var elem = document.createElement('div');
					$(elem).attr('data-id', response.id).addClass('answer-item');
					var item = '<div class="answer-item-header">' +
									'<div class="answer-item-user">' +
										'<img class="answer-item-profile user-profile" src="' + user.prev().attr('src') + '" />' +
										'<a data-id="'+user.attr('data-id') + '" href="' + user.attr('href') + '" class="answer-item-nick">' + user.text() + '</a>' +
										'<span class="rep">,</span>' +
										'<span class="answer-item-userbio">' + user.next().next().text() + '</span>' +
									'</div>' +
									'<div class="answer-item-info round-small">' +
										'<div class="type">' + type + '</div>' +
										'<div class="vote" data-status="up">' +
											'<i class="fa-icon-thumbs-up"></i> <span class="answer-vote-count">0</span>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="answer-item-content">' + content + '</div>' +
								'<div class="answer-item-meta">' +
									'<span class="comments">댓글</span><span class="divider">|</span><span class="accuse">신고</span><span class="divider">|</span>' +
									'<span class="date">' + now.toISOString().slice(0,10).replace(/-/g,".") + '</span>' +
									'<div class="answer-toolbar hidden"><span class="divider">|</span><span class="answer-edit">수정</span>/<span class="answer-delete">삭제</span></div>' +
								'</div>';
					$(elem).html(item);
					$('.answer-wrapper .empty').hide();
					$('.editor-frame').removeClass('hidden');
					$('.editor-content').addClass('hidden');
					$(elem).hide().appendTo('.answer-wrapper').fadeIn(400);
					$(elem).find('.vote').off().on('click', function(e) {
						e.preventDefault();
						var self = $(this);
						$.ajax({
							type:"POST", url: '/answer/vote',
							data: { 'answer_id': self.parent().parent().parent().attr('data-id'), 'status': self.data('status') },
							success: function(response) {
								if (response.result) {
									var cnt = parseInt(self.find('.answer-vote-count').text());
									if (self.hasClass('on')) {
										self.removeClass('on').find('.answer-vote-count').text(cnt-1);
									} else {
										self.addClass('on').find('.answer-vote-count').text(cnt+1);
									}
								} else {
									alert(response.message); return;
								}
							}
						});
					});
					$(elem).find('.answer-edit').off().on('click', function(e) {
						if ($('.editable-content').length > 0) return;
						var self = $(this);
						var content = $(this).parent().parent().parent().find('.answer-item-content').html();
						var editable = 	'<div class="editable-content">' +
											'<form method="post" style="margin-bottom:0;">' +
												'<textarea id="editable-answer" class="editable-answer"></textarea>' +
											'</form>' +
											'<div class="editor-footer"><button type="button" class="btn btn-inverse btn-edit-answer">해설 수정하기</button></div>' +
										'</div>';
						self.parent().parent().parent().append(editable);
						self.parent().parent().parent().find('.answer-item-content').hide().next().hide();
						tinymce.init({
							selector: "textarea.editable-answer",
							language : 'ko_KR',
							plugins : 'advlist autolink link image charmap lists preview jbimages autoresize',
							menubar : false,
							statusbar : false,
							resize: false,
							toolbar: "bold underline bullist numlist hr charmap link jbimages preview",
							autoresize_min_height: 100,
							autoresize_max_height: 800,
							content_css : "/static/vendor/tinymce/odab-editor.css",
							relative_urls:false,
							setup : function(editor) {
								editor.on('LoadContent', function(e) {
									tinymce.activeEditor.setContent(content);
									tinymce.activeEditor.focus();
								});
							}
						});
						$('.btn-edit-answer').click(function(e) {
							 var answer_id = self.parent().parent().parent().attr('data-id');
							 var edited = tinymce.activeEditor.getContent();
							 $.ajax({
							 	type: "POST", url: '/answer/edit', data: { 'answer_id': answer_id, 'content': edited },
							 	success	: function(response) {
							 		if (response.result) {
							 			tinymce.activeEditor.destroy();
							 			$('.editable-content').remove();
							 			self.parent().addClass('hidden');
							 			self.parent().parent().parent().find('.answer-item-content').html(edited).show().next().show();
							 		} else {
							 			alert(response.message);
							 			return;
							 		}
							 	}
							 });
						});
						return;
					});
					$(elem).find('.answer-delete').off().one('click', function(e) {
						var self = $(this);
						bootbox.dialog("정말 삭제하시겠습니까?", [{ "label" : "취소", }, {
							"label" : "삭제", "class" : "btn-danger", "callback": function() {
								$.ajax({
									type:"POST", url: '/answer/delete', data: { 'answer_id' : self.parent().parent().parent().attr('data-id') },
									success: function(response) {
										if (response.result) { self.parent().parent().parent().remove(); }
										else { alert(response.message); return; }
									}
								});
							}
						}]);
					});
					return;
				} else {
					alert(result.message);
					return;
				}
			}
		});
	});
	$('.answer-toolbar')
	.on('click', '.answer-edit', function(e) {
		// 이미 수정중인 해설이 있을 경우는 불가능
		if ($('.editable-content').length > 0) { return; }
		var self = $(this);
		var content = self.parent().parent().parent().find('.answer-item-content').html();
		var editable = 	'<div class="editable-content">' +
							'<form method="post" style="margin-bottom:0;">' +
								'<textarea id="editable-answer" class="editable-answer"></textarea>' +
							'</form>' +
							'<div class="editor-footer"><button type="button" class="btn btn-inverse btn-edit-answer">해설 수정하기</button></div>' +
						'</div>';
		self.parent().parent().parent().append(editable);
		self.parent().parent().parent().find('.answer-item-content').hide().next().hide();
		tinymce.init({
			selector: "textarea.editable-answer",
			language : 'ko_KR',
			plugins : 'advlist autolink link image charmap lists preview jbimages autoresize',
			menubar : false,
			statusbar : false,
			resize: false,
			toolbar: "bold underline bullist numlist hr charmap link jbimages preview",
			autoresize_min_height: 100,
			autoresize_max_height: 800,
			content_css : "/static/vendor/tinymce/odab-editor.css",
			relative_urls:false,
			setup : function(editor) {
				editor.on('LoadContent', function(e) {
					tinymce.activeEditor.setContent(content);
					tinymce.activeEditor.focus();
					//setTimer(function() { console.log('interval ', tinymce.activeEditor.execCommand('mceAutoResize', false)); }, 1000);
				});
			}
		});
		$('.btn-edit-answer').click(function(e) {
			 var answer_id = self.parent().parent().parent().attr('data-id');
			 var edited = tinymce.activeEditor.getContent();
			 $.ajax({
			 	type: "POST", url: '/answer/edit', data: { 'answer_id': answer_id, 'content': edited },
			 	success	: function(response) {
			 		if (response.result) {
			 			tinymce.activeEditor.destroy();
			 			$('.editable-content').remove();
			 			self.parent().addClass('hidden');
			 			self.parent().parent().parent().find('.answer-item-content').html(edited).show().next().show();
			 		} else {
			 			alert(response.message);
			 			return;
			 		}
			 	}
			 });
		});
	})
	.on('click', '.answer-delete', function(e) {
		var self = $(this);
		bootbox.dialog("정말 삭제하시겠습니까?", [{ "label" : "취소", }, {
			"label" : "삭제", "class" : "btn-danger", "callback": function() {
				$.ajax({
					type:"POST", url: '/answer/delete', data: { 'answer_id' : self.parent().parent().parent().attr('data-id') },
					success: function(response) { if (response.result) { self.parent().parent().parent().remove(); } else { alert(response.message); return; } }
				});
			}
		}]);
	});
	$('.answer-wrapper').on('mouseenter', '.answer-item', function(e) {
		$(this).find('.answer-toolbar').removeClass('hidden');
	}).on('mouseleave', '.answer-item', function(e) {
		$(this).find('.answer-toolbar').addClass('hidden');
	});
	$('.answer-item-info').on('click', '.vote', function(e) {
		e.preventDefault();
		var self = $(this);
		$.ajax({
			type:"POST", url: '/answer/vote',
			data: { 'answer_id': self.parent().parent().parent().attr('data-id'), 'status': self.data('status') },
			success: function(response) {
				if (response.result) {
					var cnt = parseInt(self.find('.answer-vote-count').text());
					if (self.hasClass('on')) {
						self.removeClass('on').find('.answer-vote-count').text(cnt-1);
					} else {
						self.addClass('on').find('.answer-vote-count').text(cnt+1);
					}
				} else {
					if (response.is_login) {
						window.location.href = '/login?return_url='+window.location.pathname;
					} else {
						alert(response.message); return;
					}
				}
			}
		});
	});
	$('.answer-item-meta')
	.on('click', '.accuse', function(e) {
		var self = $(this);
		bootbox.prompt('<p style="font-size:18px;"><i class="fa-icon-warning-sign"></i> 신고하기</p><p style="font-weight:normal; margin:10px 0 0;">신고는 반대 의견을 표시하는 기능이 아닙니다.<br>신고 사유를 입력해주세요.</p><small style="font-size:12px;">* 허위신고일 경우, 신고자의 서비스 활동이 제한될 수 있으니, 유의하시어 신중하게 신고해 주세요.</small>', '취소', '신고하기', function(message) {
			if (message != null && message.trim() == '') {
				alert('신고 사유를 입력해 주세요');
				return false;
			} else if (message != null) {
				$.ajax({
					type: "POST", url: "/answer/accuse", data: { "answer_id": self.parent().parent().data('id'), "message": message.trim() },
					success: function(response) {
						if (response.result) {
							$.pnotify({
								text: '<i class="fa-icon-ok"></i> '+response.message,
								type: 'notice', delay: 1000, sticker: false, history: false, icon: false,
								before_open: function(pnotify) {
									pnotify.css({ "top":"30px", "left": ($(window).width() / 2) - (pnotify.width() / 2) });
								}
							});
						} else {
							$.pnotify({
								text: '<i class="fa-icon-exclamation-sign"></i> '+response.message,
								type: 'error', delay: 1000, sticker: false, history: false, icon: false,
								before_open: function(pnotify) {
									pnotify.css({ "top":"30px", "left": ($(window).width() / 2) - (pnotify.width() / 2) });
								}
							});
						}
					}
				});
			}
		});
	})
	.on('click', '.comments', function(e) {
		var self = $(this);
		var wrap = self.parent().next('.comments-wrapper');
		if (self.hasClass('on')) {
			self.removeClass('on').find('i').removeClass('fa-icon-caret-up').addClass('fa-icon-caret-down');
		} else {
			self.addClass('on').find('i').removeClass('fa-icon-caret-down').addClass('fa-icon-caret-up');
		}
		if(wrap.is(':empty')) {
			$.ajax({
				type:"GET", url:"/comment/lists", data: {"answer_id": self.parent().parent().data('id')},
				success: function(response) {
					var data = "<ul>";
					if (response.length) {
						for (i in response) {
							var c = response[i];
							console.log(c);
							data += '<li class="comment-item" data-id="'+c.id+'">';
							data += '<div class="comment-header"><img src="'+c.profile+'" alt="'+c.nickname+'"><span class="answer-item-nick">'+c.nickname+'</span></div>';
							data += '<div class="comment-body">';
							data += '<div class="comment-data">'+c.data+'</div>';
							data += '<div class="comment-meta"><span class="comment-date">'+c.date+'</span>';
							if (c.o) data += ' | <span class="comment-delete">삭제</span>';
							data += '</div></div></li>';
						}
					}
					data += '</ul>';
					data += '<div class="comments-form input-append"><form>' +
									'<input type="text" class="comments-data" placeholder="댓글 입력">' +
									'<button class="btn btn-small btn-seablue" type="submit">등록</button>' +
							'</form></div>';
					wrap.append(data);
					wrap.find('form').submit(function(e) {
						var input = $(this).find('input');
						if (input.val().trim() == '') {
							alert('내용을 입력해주세요.');
							return false;
						}
						$.ajax({
							type:"POST", url:"/comment/add",
							data:{ "answer_id": self.parent().parent().data('id'), "data": input.val().trim(), 'return_url': window.location.pathname },
							success: function(response) {
								if (response.result) {
									var new_item = '<li class="comment-item" data-id="'+response.comment_id+'" style="display:none;">' +
														'<div class="comment-header">' +
															'<img src="'+response.owner.profile+'" alt="'+response.owner.nickname+'">' +
															'<span class="answer-item-nick">'+response.owner.nickname+'</span>' +
														'</div>' +
														'<div class="comment-body">' +
															'<div class="comment-data">'+input.val().trim()+'</div>' +
															'<div class="comment-meta">' +
																'<span class="comment-date">'+response.date+'</span>' +
																' | <span class="comment-delete">삭제</span>' +
															'</div>' +
														'</div>' +
													'</li>';
									$(new_item).appendTo(wrap.find('ul')).slideDown('fast');
									var cnt = wrap.parent().find('.comments-count');
									cnt.html(parseInt(cnt.text())+1);
									input.val('');
									$.pnotify({
										text: '<i class="fa-icon-ok"></i> '+response.message,
										type: 'notice', delay: 1000, sticker: false, history: false, icon: false,
										before_open: function(pnotify) {
											pnotify.css({ "top":"30px", "left": ($(window).width() / 2) - (pnotify.width() / 2) });
										}
									});
								} else {
									if (response.is_login) {
										$.ajax({
											type:"GET", url:response.return_url, data:{},
											success:function (data) { $.fancybox(data, { afterShow: function() { $('input#email').focus(); } }); }
										});
									} else {
										//bootbox.dialog(response.message, [{ "label" : "확인", "class" : "btn-danger" }]);
										alert(response.message);
									}
								}
							}
						});
						return false;
					});
				}
			});
		}
		wrap.toggle();
	});
	$('.comments-wrapper')
	.on('click', '.comment-delete', function(e) {
		var item = $(this).parent().parent().parent();
		$.ajax({
			type:"POST", url:"/comment/delete", data:{"comment_id":item.data('id')},
			success:function(response) {
				if (response.result) {
					var cnt = item.parent().parent().parent().find('.comments-count');
					item.slideUp('fast', function() { $(this).remove(); cnt.html(parseInt(cnt.text())-1); });
					$.pnotify({
						text: '<i class="fa-icon-ok"></i> '+response.message,
						type: 'notice', delay: 1000, sticker: false, history: false, icon: false,
						before_open: function(pnotify) {
							pnotify.css({ "top":"30px", "left": ($(window).width() / 2) - (pnotify.width() / 2) });
						}
					});
				} else {
					alert(response.message);
					return false;
				}
			}
		});
	});
});
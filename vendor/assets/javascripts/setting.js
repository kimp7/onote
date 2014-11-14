$(document).ready(function() {
	$(document)
	.on('click', '.btn-set-profile', function(e) {
		e.preventDefault();
		$.ajax({
			type: "GET", url: '/setting/profile', data: {},
			success: function(response) {
				$.fancybox(response, { fitToView: true });
			}
		});
		e.stopPropagation();
	})
	.on('click', '.btn-set-subject', function(e) {
		e.preventDefault();
		var self = $(this);
		var current = [];
		$('.subject-item-list').each(function(i) {
			current.push($(this).data('slug'));
		});
		$.ajax({
			type:"GET", url:"/setting/subject_edit", data:{ 'current': current.join('|') },
			success: function(response) {
				$.fancybox(response, { fitToView:true });
			}
		})
		e.stopPropagation();
	})
	.on('click', '.btn-password-edit', function(e) {
		$.ajax({
			type:"GET", url:"/setting/password_edit", data:{'user_id':$(this).parent().parent().data('id')},
			success: function(response) {
				$.fancybox(response, { fitToView:true });
				$('.reset-password').qtip({
					content: { text: '비밀번호를 잊으셨나요?' },
					position: { my: 'bottom center', at: 'top center' },
					style: { classes: 'qtip-light qtip-shadow qtip-rounded' }
				});
			}
		});
	})
	.on('click', '.deactivate-user', function(e) {
		e.preventDefault();
		$.ajax({
			type:"GET", url:"/setting/deactivate", data:{ 'user_id':$(this).parent().parent().data('id') },
			success: function(response) {
				$.fancybox(response, { fitToView:true });
			}
		});
		e.stopPropagation();
	})
	.on('click', '.btn-save-setting', function(e) {
		var self = $(this);
		var data = {};
		if ($('.subject-lists').attr('data-change') == 'Y') {
			var subs = [];
			$('.subject-item-list').each(function(e) {
				subs.push($(this).attr('data-slug'));
			});
			data['subject_option'] = subs.join("|");
		}
		if ($('img.user-profile').attr('data-change') == 'Y') {
			data['profile_image'] = $('.user-profile').attr('src'); 
		}
		data['nickname'] = $('.user-nickname').val();
		data['bio'] = $('.user-bio').val();
		data['mypage_url'] = $('.user-mypage').val();
		data['auto_creation'] = $('.auto-creation').find('.active').val();
		$.ajax({
			type: "POST", url: '/setting/save', data: data,
			success: function(response) {
				if (!response.result) {
					if (response.message['nickname']) {
						$('.user-nickname').parent().parent().addClass('error');
						$('.user-nickname').next().html(response.message['nickname']);
					} else {
						$('.user-nickname').parent().parent().removeClass('error');
						$('.user-nickname').next().html('');
					}
					if (response.message['mypage_url']) {
						$('.user-mypage').parent().parent().addClass('error');
						$('.user-mypage').next().html(response.message['mypage_url']);
					} else {
						$('.user-mypage').parent().parent().removeClass('error');
						$('.user-mypage').next().html('');
					}
					if (response.message['bio']) {
						$('.user-bio').parent().parent().addClass('error');
						$('.user-bio').next().html(response.message['bio']);
					} else {
						$('.user-bio').parent().parent().removeClass('error');
						$('.user-bio').next().html('');
					}
					if (response.message['result']) {
						bootbox.dialog(response.message['result'], [{ "label" : "확인", "class" : "btn-danger" }]);
					}
				} else {
					bootbox.classes('bootbox-message');
					bootbox.dialog("회원 정보가 수정되었습니다.", [{
						"label" : "확인",
						"class" : "btn-primary",
						"callback": function() {
							window.location.replace('/setting');
						}
					}]);
				}
			}
		});
	});
});
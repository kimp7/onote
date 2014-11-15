<div class="pop-wrapper">

<form class="form-horizontal password-edit" method="post">
	<h1><i class="glyphicons-icon keys"></i>비밀번호 변경</h1>
	<fieldset>
		<div class="control-group">
			<label class="control-label" for="old_pass">현재 비밀번호</label>
			<div class="controls">
				<input type="password" name="old_password" class="old_password" />
				<div class="error"></div>
				<i class="fa-icon-question-sign reset-password"></i>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="new_pass">새 비밀번호</label>
			<div class="controls">
				<input type="password" name="new_password" class="new_password" />
				<div class="error"></div>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="new_pass_con">비밀번호 확인</label>
			<div class="controls">
				<input type="password" name="new_password_confirm" class="new_password_confirm" />
				<div class="error"></div>
			</div>
		</div>
		<div class="control-group">
			<div class="controls">
				<small>* 비밀번호는 최소 6자 이상입니다.</small>
				<div class="result error"></div>
			</div>
		</div>
		<div class="control-group" style="text-align:right;">
			<input type="hidden" name="user_id" value="<?=$user_id;?>" />
			<button type="button" class="btn btn-cancel">취소</button>
			<button type="button" class="btn btn-primary btn-edit">비밀번호 변경</button>
		</div>
	</fieldset>
</form>

<script type="text/javascript">
$(document).ready(function() {
	$('.btn-cancel').on('click', function() {
		$.fancybox.close(true);
		return;
	});
	$('.reset-password').on('click', function(e) {
		e.preventDefault();
		bootbox.prompt('비밀번호 변경을 위해 사용중인 이메일을 입력해주세요.<br><small>이메일 주소를 잊어버린 경우엔 <a href="mailto:help@odab.net">help@odab.net</a>으로 문의주세요.</small>', "취소", "비밀번호 찾기", function(result) {
			if (result != null) {
				
			}
		});
		e.stopPropagation();
	})
	$('.btn-edit').on('click', function() {
		$.ajax({
			type:"POST", url:'/setting/password_edit', data: $('form.password-edit').serialize(),
			success: function(response) {
				if (!response.result) {
					if (response.message['old_password']) {
						$('.old_password').parent().parent().addClass('error');
						$('.old_password').next().html(response.message['old_password']).show(0).delay(1000).fadeOut(200);
					} else {
						$('.old_password').parent().parent().removeClass('error');
					}
					if (response.message['new_password']) {
						$('.new_password').parent().parent().addClass('error');
						$('.new_password').next().html(response.message['new_password']).show(0).delay(1000).fadeOut(200);
					} else {
						$('.new_password').parent().parent().removeClass('error');
					}
					if (response.message['new_password_confirm']) {
						$('.new_password_confirm').parent().parent().addClass('error');
						$('.new_password_confirm').next().html(response.message['new_password_confirm']).show(0).delay(1000).fadeOut(200);
					} else {
						$('.new_password_confirm').parent().parent().removeClass('error');
					}
					if (response.message['result']) {
						$('.error.result').html(response.message['result']).show(0);
						$('.password-edit input[type=text]').val('');
						$('.old_password').parent().parent().addClass('error');
					}
					else $('.error.result').empty();
					
					return false;
				} else {
					bootbox.dialog(response.message, [{
						"label" : "확인",
						"class" : "btn-primary"
					}]);
					$.fancybox.close(true);
					return;
				}
			}
		});
		return false;
	});
});
</script>

</div>
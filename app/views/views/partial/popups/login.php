<div id="login-wrapper" class="login-wrapper">
	<h2 class="title">로그인</h2>
	<form class="login form-horizontal">
		<div class="info"></div>
		<div class="login-block">
			<input type="text" id="email" name="email" placeholder="이메일 주소" />
		</div>
		<div class="login-block">
			<input type="password" name="password" placeholder="비밀번호" />
			<i class="fa-icon-question-sign reset-password"></i>
		</div>
		<div class="login-block">
			<input type="hidden" name="return_url" value="<?php echo isset($return_url) ? $return_url : '' ?>" />
			<label class="checkbox inline auto-login">
				<input type="checkbox" class=""> 로그인 유지
			</label>
			<button type="submit" class="btn btn-login">로그인</button>
  		</div>
  	</form>
  	<hr>
	<div class="login-signup">
		<a href="/signup?o=facebook">
			<button type="button" class="btn btn-facebook login-facebook"><i class="fa-icon-facebook-sign pull-left"></i>페이스북 로그인</button>
		</a>
		<div>또는, <a href="/signup">이메일로 가입하기</a></div>
	</div>
</div>
<script type="text/javascript">
$(document).ready(function() {
	$(document)
	.on('click', '.btn-login', function(e) {
		e.preventDefault();
		$.ajax({
			type	: "POST",
			url		: '/login',
			data	: $('form.login').serialize(),
			success	: function(response) {
				/*
				 * 1. 회원정보가 없거나
				 * 2. 아직 이메일인증이 되지 않았거나
				 * 3. 로그인 성공하거나
				 */
				if (response.result) {
					if (response.type == '0')
						window.location.replace("/admin");
					else if (response.type == '1')
						window.location.replace("/");
					else
						window.location.replace(response.return_url);
				} else {
					if (response.type == '-1') {
						// 회원정보가 없는 경우
						$('.info').empty().html(response.message).css({"color": "#B03535", "padding": "0 0 10px 0"});
						$('input#email').css("border", "1px solid #B03535").select();
					} else {
						// 이메일 인증이 필요한 경우
						
					}
				}
			}
		});
		return false;
	});
});	
</script>
<div class="pop-wrapper">

<form class="form-horizontal user-edit" method="post">
	<h1><i class="glyphicons-icon edit"></i>프로필 수정</h1>
	<fieldset>
		<div class="control-group">
			<label class="control-label" for="nickname">이름</label>
			<div class="controls">
				<input type="text" name="nickname" class="nickname" value="<?=$nickname;?>" />
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="bio">한줄소개</label>
			<div class="controls">
				<input type="text" name="bio" class="bio" value="<?=$bio;?>" />
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="facebook_link">페이스북</label>
			<div class="controls">
				<label class="plain">facebook.com/</label>
				<input type="text" name="facebook_link" class="fb-link" value="<?=$facebook_link; ?>" />
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="description">프로필</label>
			<div class="controls">
				<textarea class="description" placeholder="안녕하세요^^ 유용한 오답노트 많이 공유해요~"><?=$description;?></textarea>
			</div>
		</div>
		<div class="control-group">
			<div class="controls">
				<small>* 더 자세한 편집은 <a href="/setting">설정</a>페이지에서 할 수 있습니다.</small>
			</div>
		</div>
		<div class="control-group" style="text-align:right;">
			<button type="button" class="btn btn-cancel">취소</button>
			<button type="button" class="btn btn-primary btn-edit">프로필 저장</button>
		</div>
	</fieldset>
</form>

<script type="text/javascript">
$(document).ready(function() {
	$('.bio, .nickname').on('keyup', function() {
		if ( ($('.bio').val().replace(/\s+/g, '') != '') && ($('.nickname').val().replace(/\s+/g, '') != '') ) {
			$('.btn-edit').removeClass('disabled');
		} else {
			$('.btn-edit').addClass('disabled');
		}
	});
	$('.btn-cancel').on('click', function() {
		$.fancybox.close(true);
		return;
	});
	$('.btn-edit').on('click', function() {
		if (!$(this).hasClass('disabled')) {
			var data = {};
			data['nickname'] = $('.nickname').val();
			data['bio'] = $('.bio').val();
			data['description'] = $('.description').val();
			data['facebook_link'] = $('.fb-link').val();
			$.ajax({
				type:"POST", url:'/mypage/user_edit', data: data,
				success: function(response) {
					if (response.result) {
						$.fancybox.close(true);
						bootbox.dialog(response.message, [{
							"label" : "확인",
							"class" : "btn-primary",
							"callback" : function() {
								window.location.reload();
							}
						}]);
					} else {
						bootbox.dialog(response.message, [{
							"label" : "확인",
							"class" : "btn-danger"
						}]);
						return;
					}
				}
			});
		}
		return false;
	});
});
</script>

</div>
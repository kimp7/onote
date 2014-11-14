<div class="pop-wrapper">
<form class="form-horizontal user-deactivate" method="post">
	<h1><i class="glyphicons-icon circle_exclamation_mark"></i>회원 탈퇴하기</h1>
	<fieldset>
		<div class="control-group">
			<h3>혹시 [오:답노트]를 사용하는데 불편함을 느끼셨나요?</h3>
			<h3>만약 그렇다면 자유롭게 의견을 보내주세요.</h3>
			<h3>보다 좋은 서비스를 만들어가는데 큰 도움이 됩니다.</h3>
			<div class="messages">
				<textarea class="deactivate_message" placeholder="불편함이나, 개선점을 자유롭게 적어주세요"></textarea>
			</div>
		</div>
		<div class="control-group">
			<small>* 계정을 삭제하면 서비스에서 관리되는 개인정보 및 성적, 오답노트 등의 데이터가 모두 삭제되며 추후 재가입시에도 복구될 수 없습니다. 단, 공개된 오답노트, 해설 등 일부 데이터는 회원 탈퇴 후에도 기록으로 보존됩니다. 문의: help@odab.net</small>
		</div>
		<div class="control-group" style="text-align:right;">
			<input type="hidden" name="user_id" value="<?=$user_id;?>" />
			<button type="button" class="btn btn-cancel">취소</button>
			<button type="button" class="btn btn-danger btn-deactivate">회원 탈퇴</button>
		</div>
	</fieldset>
</form>
<script type="text/javascript">
$(document).ready(function() {
	$('.btn-cancel').on('click', function() { $.fancybox.close(true); return; });
	$('.btn-deactivate').on('click', function() {
		bootbox.dialog("한번 삭제된 계정은 복구할 수 없습니다.<br>정말 <strong style=\"color:crimson;\">삭제</strong>하시겠습니까?", [{
			"label" : "취소",
		}, {
			"label" : "삭제", "class" : "btn-danger", "callback": function() {
				$.ajax({
					type:"POST", url: '/setting/deactivate', data: { 'user_id':$('input[name=user_id]').val(), 'message':$('.deactivate_message').val() },
					success: function(response) {
						if (response.result) { $.fancybox.close(true); window.location.replace('/'); return;
						} else { alert(response.message); return; }
					}
				});
			}
		}]);
		return false;
	});
});
</script>
</div>
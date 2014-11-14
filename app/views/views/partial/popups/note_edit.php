<div class="note-create-wrapper">

<form class="form-horizontal note-create" method="post">
	<h1><i class="glyphicons-icon edit"></i>오답노트 편집하기</h1>
	<fieldset>
		<div class="control-group">
			<label class="control-label" for="note-name">노트 이름</label>
			<div class="controls">
				<input type="hidden" class="note-id" value="<?=$note->id?>" />
				<input type="text" id="name" name="name" class="note-name required" value="<?php echo $note->title; ?>" placeholder="ex: 자신없는 유형 묶음" />
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="note-subject">과목</label>
			<div class="controls">
				<input type="text" id="<?php echo $subject->id; ?>" name="subject_id" class="subject_id" value="<?php echo $subject->name; ?>" disabled />
				<span class="help-msg">모든 오답노트는 각 과목 기반으로 만들고 관리할 수 있습니다.</span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="note-public">설정</label>
			<div class="controls">
				<div class="btn-group">
					<?php if ($note->status === 'PUBLIC'): ?>
					<button type="button" class="switch btn btn-switch active" value="Y">공개</button>
					<button type="button" class="switch btn btn-switch" value="N">비공개</button>
					<?php else: ?>
					<button type="button" class="switch btn btn-switch" value="Y">공개</button>
					<button type="button" class="switch btn btn-switch active" value="N">비공개</button>
					<?php endif;?>
				</div>
				<span class="help-msg">공개노트는 자신의 <a href="<?=$this->odab_user->get('mypage_url');?>">마이페이지</a>에서 공개되어 보여지며<br>다른 사용자들과 공유할 수 있습니다.</span>
			</div>
		</div>
		<div class="control-group" style="float:left">
			<button type="button" class="btn btn-delete">노트 삭제</button>
		</div>
		<div class="control-group" style="text-align:right;">
			<button type="button" class="btn btn-cancel">취소</button>
			<button type="button" class="btn btn-primary btn-edit">노트 편집</button>
		</div>
	</fieldset>
</form>

<script type="text/javascript">
$(document).ready(function() {
	$('.note-name').on('keyup', function() {
		if ( $(this).val().replace(/\s+/g, '') != '' ) {
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
		/*
		 *	TODO 발리데이션 체크
		 */
		if (!$(this).hasClass('disabled')) {
			$.ajax({
				type	: "POST",
				url		: '/note/edit',
				data	: { 'note_id':$('input.note-id').val(), 'name':$('input.note-name').val(), 'public': $('button.switch.active').val() },
				success	: function(response) {
					if (response.result) {
						$.fancybox.close(true);
					} else {
						alert('편집을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.');
						return;
					}
				}
			});
		}
		return false;
	});
	$('.btn-delete').on('click', function() {
		var message = null;
		if ($('button.switch.active').val() === 'Y') {
			message = '한번 삭제된 노트는 복구할 수 없습니다.<br>또한 이 노트를 즐겨찾기 한 경우도 모두 삭제됩니다.<br>정말 <strong style="color:crimson;">삭제</strong>하시겠습니까?';
		} else {
			message = '한번 삭제된 노트는 복구할 수 없습니다.<br>정말 <strong style="color:crimson;">삭제</strong>하시겠습니까?';
		} 
		var self = $(this);
		bootbox.dialog(message, [{
			"label" : "취소",
		}, {
			"label" : "삭제",
			"class" : "btn-danger",
			"callback": function() {
				$.ajax({
					type:"POST", url: '/note/delete', data: { 'note_id':$('input.note-id').val() },
					success: function(response) {
						if (response.result) {
							$.fancybox.close(true);
						} else {
							alert(respont.message);
							return;
						}
					}
				});
			}
		}]);
	})
});
</script>

</div>
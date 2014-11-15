<div class="note-create-wrapper">

<form class="form-horizontal note-create" method="post">
	<h1><i class="glyphicons-icon book"></i>오답노트 만들기</h1>
	<fieldset>
		<div class="control-group">
			<label class="control-label" for="note-name">노트 이름</label>
			<div class="controls">
				<input type="text" id="name" name="name" class="note-name required" placeholder="ex: 자신없는 유형 묶음" />
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="note-subject">과목</label>
			<div class="controls">
				<select class="" name="subjects">
					<?php foreach($subjects as $subject) : ?>
						<option value="<?php echo $subject->id; ?>"><?php echo $subject->name; ?></option>
					<?php endforeach; ?>
				</select>
				<span class="help-msg">모든 오답노트는 각 과목 기반으로 만들고 관리할 수 있습니다.</span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="note-public">설정</label>
			<div class="controls">
				<div class="btn-group">
					<button type="button" class="switch btn btn-switch" value="Y">공개</button>
					<button type="button" class="switch btn btn-switch active" value="N">비공개</button>
				</div>
				<span class="help-msg">공개노트는 자신의 <a href="<?=$this->odab_user->get('mypage_url');?>">마이페이지</a>에서 공개되어 보여지며<br>다른 사용자들과 공유할 수 있습니다.</span>
			</div>
		</div>
		<div class="control-group" style="text-align:right;">
			<button type="button" class="btn btn-cancel">취소</button>
			<button type="button" class="btn btn-seablue btn-create disabled">노트 만들기</button>
		</div>
	</fieldset>
</form>

<script type="text/javascript">
$(document).ready(function() {
	$('.note-name').on('keyup', function() {
		if ( $(this).val().replace(/\s+/g, '') != '' ) {
			$('.btn-create').removeClass('disabled');
		} else {
			$('.btn-create').addClass('disabled');
		}
	});
	
	$('.btn-cancel').on('click', function() {
		$.fancybox.close(true);
		return;
	});
	$('.btn-create').on('click', function() {
		/*
		 *	TODO 발리데이션 체크
		 */
		if (!$(this).hasClass('disabled')) {
			$.ajax({
				type	: "POST",
				url		: '/note/create',
				//data	: $('form.note-create').serialize(),
				data	: { 'name':$('input.note-name').val(), 'subject_id':$('select').val(), 'public': $('button.switch.active').val() },
				success	: function(response) {
					if (response.result) {
						document.location.replace('/note');
					} else {
						alert('노트 생성 실패!!');
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
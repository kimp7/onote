<div class="question-pop-wrapper">

<form class="form-horizontal question-pop" method="post">
	<h1><i class="glyphicons-icon folder_plus"></i><?php echo count($questions); ?>문제를 다음 노트에 추가하기</h1>
	<fieldset>
		<div class="control-group">
			<label class="control-label" for="note-name">이름 *</label>
			<div class="controls note-picker-wrapper">
				<?php if (count($notes) > 0): ?>
				<div class="note-picker-outer">
					<button type="button" id="<?=$notes[0]->id?>" class="btn note">
						<?php echo $notes[0]->title; ?><span class="caret"></span>
					</button>
				</div>
				<div class="note-picker-inner-wrapper round hidden">
					<div class="note-picker-create">
						<button type="button" class="btn btn-create">만들기</button>
						<div class="note-picker-create-wrapper">
							<input type="text" name="note-create-name" placeholder="ex: 자신없는 유형 묶음" />
						</div>
					</div>
					<div class="note-picker-inner">
						<ul>
						<?php foreach($notes as $note) : ?>
							<li id="<?=$note->id?>" class="note-picker-item round"><?php echo $note->title; if ($note->status == "PRIVATE") { echo '<i class="fa-icon-lock"></i>'; } ?></li>
						<?php endforeach; ?>
						</ul>
					</div>
				</div>
				<?php else: ?>
				<div class="note-picker-create">
					<button type="button" class="btn btn-create">만들기</button>
					<div class="note-picker-create-wrapper">
						<input type="text" name="note-create-name" placeholder="ex: 자신없는 유형 묶음" />
					</div>
				</div>
				<?php endif; ?>
				
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="note-subject">과목 *</label>
			<div class="controls">
				<input type="text" id="<?php echo $subject->id; ?>" class="subject_id" name="subject_id" value="<?php echo $subject->name; ?>" disabled />
			</div>
		</div>
		<div class="control-group">
			<div class="controls">
				<label class="checkbox">
					<input type="checkbox" name="redirect" checked /> 노트 저장 후 해당 노트로 바로 이동하기
				</label>
			</div>
		</div>
		<div class="control-group">
			<div class="controls" style="text-align:right;">
				<button type="button" class="btn btn-cancel">취소</button>
				<button type="button" class="btn btn-primary btn-add">노트 저장</button>
			</div>
		</div>
	</fieldset>
</form>
<script type="text/javascript">
$(document).ready(function() {
	$(document)
	.off('click', '.btn-cancel').on('click', '.btn-cancel', function(e) {
		$.fancybox.close(true);
		return;
	})
	.off('keyup', '.note-name').on('keyup', '.note-name', function() {
		if ( $(this).val().replace(/\s+/g, '') != '' ) {
			$('.btn-create').removeClass('disabled');
		} else {
			$('.btn-create').addClass('disabled');
		}
	})
	.off('click', '.note').on('click', '.note', function(e) {
		$('.note-picker-inner-wrapper').removeClass('hidden');
		$('.note-picker-create input').val('');
		$('.note-picker-inner').find('li#'+$(this).attr('id')).addClass('active');
	})
	.off('click', '.note-picker-item').on('click', '.note-picker-item', function(e) {
		$('.note-picker-inner-wrapper').addClass('hidden');
		$('.note-picker-inner li').removeClass('active');
		var data = '<button type="button" id="'+$(this).attr('id')+'" class="btn note">'+$(this).text()+'<span class="caret"></span></button>';
		$('.note-picker-outer').html(data);
	})
	.off('click', '.btn-create').on('click', '.btn-create', function(e) {
		var name = $(this).next().find('input[name=note-create-name]').val();
		var subject_id = $('input.subject_id').attr('id');
		$.ajax({
			type: "POST", url: '/note/create', data: { 'name':name, 'subject_id':subject_id, 'public':'N' },
			success: function(response) {
				if (response.result) {
					if ($('.note-picker-outer').length) {
						var add = '<li id="'+response.note_id+'" class="note-picker-item round">'+name+'<i class="fa-icon-lock"></i></li>';
						$('.note-picker-inner ul').append(add);
						$('.note-picker-inner-wrapper').addClass('hidden');
						$('.note-picker-inner li').removeClass('active');
						var data = '<button type="button" id="'+response.note_id+'" class="btn note">'+name+'<span class="caret"></span></button>';
						$('.note-picker-outer').html(data);
					} else {
						var picker = '<div class="note-picker-outer">' +
										'<button type="button" id="'+response.note_id+'" class="btn note">'+name+'<span class="caret"></span></button>' +
									'</div>' +
									'<div class="note-picker-inner-wrapper round hidden">' +
									'<div class="note-picker-create">' +
										'<button type="button" class="btn btn-create">만들기</button>' +
										'<div class="note-picker-create-wrapper">' +
											'<input type="text" name="note-create-name" placeholder="ex: 자신없는 유형 묶음" />' +
										'</div>' +
									'</div>' +
									'<div class="note-picker-inner"><ul>' +
										'<li id="'+response.note_id+'" class="note-picker-item round">'+name+'<i class="fa-icon-lock"></i></li>' +
									'</ul></div>' +
								'</div>';
						$('.note-picker-wrapper').empty().html(picker);
					}
				} else {
					alert(response.message);
					return;
				}
			}
		});
	})
	.off('click', '.btn-add').on('click', '.btn-add', function(e) {
		var questions = <?php echo json_encode($questions); ?>;
		var redirect = $('input[name=redirect]').is(':checked');
		var count = _.size(questions);
		$.ajax({
			type	: "POST",
			url		: '/questions/add',
			data	: { 'note_id': $('.note-picker-outer .note').attr('id'), 'questions': questions },
			success	: function(response) {
				if (response.result) {
					if (redirect) {
						document.location.replace('/note/view/'+$('.note-picker-outer .note').attr('id'));
					} else {
						$.fancybox.close(true);
						$.pnotify({
							text: '<i class="fa-icon-ok"></i>  '+count+' 문제가 노트에 저장되었습니다',
							type: 'notice', delay: 1500, sticker: false, history: false, icon: false,
							before_open: function(pnotify) {
								pnotify.css({ "top":"30px", "left": ($(window).width() / 2) - (pnotify.width() / 2) });
							}
						});
					}
				} else {
					alert(response.message);
					return;
				}
			}
		});
		return false;
	});
});
</script>

</div>
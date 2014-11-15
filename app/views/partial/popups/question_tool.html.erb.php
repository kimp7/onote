<div class="question-pop-wrapper">

<form class="form-horizontal question-pop" method="post">
	<h1>
		<?php if ($action === '복사') : ?>
			<i class="glyphicons-icon inbox_in"></i><?php echo count($questions); ?>문제를 다음 노트에 <?php echo $action; ?>하기
		<?php elseif ($action === '이동'): ?>
			<i class="glyphicons-icon scissors"></i><?php echo count($questions); ?>문제를 다음 노트에 <?php echo $action; ?>하기
		<?php else: ?>
			<i class="glyphicons-icon bin"></i><?php echo count($questions); ?>문제를 삭제하기
		<?php endif; ?>
	</h1>
	<fieldset>
		<?php if ($action === '복사' || $action === '이동'): ?>
		<div class="control-group">
			<label class="control-label" for="note-name">노트 *</label>
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
		<?php else: ?>
		<div class="control-group">
			<div class="message">
				정말 <strong><?php echo isset($source_title) ? $source_title : ''; ?></strong> 노트에서 <?php echo count($questions); ?>문제를 <strong style="color:crimson;">삭제</strong>하시겠습니까?
			</div>
		</div>
		<?php endif; ?>
		<div class="control-group">
			<div class="controls" style="text-align:right;">
				<input type="hidden" id="source_id" value="<?=$source_id;?>" />
				<button type="button" class="btn btn-cancel">취소</button>
				<?php if ($action === '복사') : ?>
				<button type="button" class="btn btn-primary btn-copy">문제 복사</button>
				<?php elseif ($action === '이동'): ?>
				<button type="button" class="btn btn-primary btn-move">문제 이동</button>
				<?php else: ?>
				<button type="button" class="btn btn-danger btn-delete">문제 삭제</button>
				<?php endif; ?>
			</div>
		</div>
	</fieldset>
</form>

<script type="text/javascript">
$(document).ready(function() {
	var questions = <?php echo json_encode($questions); ?>;
	$(document)
	.off('click', '.btn-cancel').on('click', '.btn-cancel', function(e) {
		$.fancybox.close(true);
		return;
	})
	.off('keyup', '.note-name').on('keyup', '.note-name', function(e) {
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
	.off('click', '.btn-copy').on('click', '.btn-copy', function(e) {
		var count = _.size(questions);
		var target_id = $('.note-picker-outer .note').attr('id');
		if (target_id === undefined || target_id === null) {
			alert('복사할 노트를 선택하세요'); return false;
		}
		$.ajax({
			type	: "POST",
			url		: '/questions/copy',
			data	: { 'target_id': target_id, 'questions': questions },
			success	: function(response) {
				if (response.result) {
					$('.qbox-container').removeClass('selected');
					$('.toolbar').hide();
					$('#sq').val(0);
					$.fancybox.close(true);
					$.pnotify({
						text: '<i class="fa-icon-copy"></i>  '+count+' 문제가 복사되었습니다',
						type: 'notice', delay: 1500, sticker: false, history: false, icon: false,
						before_open: function(pnotify) {
							pnotify.css({ "top":"30px", "left": ($(window).width() / 2) - (pnotify.width() / 2) });
						}
					});
				} else {
					alert(response.message);
					return;
				}
			}
		});
		return false;
	})
	.off('click', '.btn-move').on('click', '.btn-move', function(e) {
		var count = _.size(questions);
		var target_id = $('.note-picker-outer .note').attr('id');
		if (target_id === undefined || target_id === null) {
			alert('이동할 노트를 선택하세요'); return false;
		}
		$.ajax({
			type	: "POST",
			url		: '/questions/move',
			data	: { 'source_id': $('#source_id').val(), 'target_id': target_id, 'questions': questions },
			success	: function(response) {
				if (response.result) {
					$('.qbox-container').removeClass('selected');
					$('.toolbar').hide();
					$('#sq').val(0);
					$.fancybox.close(true);
					$.pnotify({
						text: '<i class="fa-icon-cut"></i>  '+count+' 문제가 이동되었습니다',
						type: 'notice', delay: 1500, sticker: false, history: false, icon: false,
						before_open: function(pnotify) {
							pnotify.css({ "top":"30px", "left": ($(window).width() / 2) - (pnotify.width() / 2) });
						}
					});
				} else {
					alert(response.message); return;
				}
			}
		});
		return false;
	})
	.off('click', '.btn-delete').on('click', '.btn-delete', function(e) {
		var count = _.size(questions);
		$.ajax({
			type	: "POST",
			url		: '/questions/delete',
			data	: { 'source_id': $('#source_id').val(), 'questions': questions },
			success	: function(response) {
				if (response.result) {
					$('.qbox-container').removeClass('selected');
					$('.toolbar').hide();
					$('#sq').val(0);
					$.fancybox.close(true);
					$.pnotify({
						text: '<i class="fa-icon-trash"></i>  '+count+' 문제가 삭제되었습니다',
						type: 'notice', delay: 1500, sticker: false, history: false, icon: false,
						before_open: function(pnotify) {
							pnotify.css({ "top":"30px", "left": ($(window).width() / 2) - (pnotify.width() / 2) });
						}
					});
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
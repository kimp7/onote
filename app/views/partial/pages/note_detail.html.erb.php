<div id="content" class="note-container">
	<div class="row-fluid">
		<input type="hidden" id="is_owner" value="<?=$is_owner;?>">
		<input type="hidden" id="latest" value="<?=$latest;?>">
		<?php
			/* 내노트 + 공개		=>	true
			 * 내노트 + 비공개	=>	true
			 * 남노트 + 공개		=>	true
			 * 남노트 + 비공개	=>	false
			 */
			if ($is_owner || $is_public):
		?>
		<div class="note-stats-bar">
			<ul class="note-stats">
				<li class="note-stat-item"><a href="/note"><i class="halflings-icon home"></i></a> ></li>
				<li class="note-stat-item"><span class="note-stat-item-name"><?=$status['info']->subject_name?></span> ></li>
				<li class="note-stat-item"><?=$status['info']->title?> ></li>
				<li class="note-stat-item"><span class="note-stat-item-cnt"><?=$status['question']?></span> 문제</li>
			</ul>
			<ul class="note-bar-sort hidden">
				<li class="note-stat-item">
					<button class="btn btn-select-all"><i class="fa-icon-ok-sign"></i> 모두선택</button>
					<button class="btn btn-unselect-all"><i class="fa-icon-ok-circle"></i> 모두해제</button>
				</li>
			</ul>
		</div>
		<div class="qbox-wrapper" data-note="<?=$status['info']->id?>" data-subject="<?=$status['info']->subject_id?>">
			<div></div>
		</div>
		<div class="empty hidden">
			<p class="title">저장된 문제가 없습니다</p>
			<?php if ($is_owner): ?>
			<h2>오답노트에 담을 문제를 직접 선택해서 추가하세요</h2><br>
			<a href="/questions/exam/<?=$latest.'-'.$status['info']->subject_name;?>"><button class="btn btn-seablue"><i class="fa-icon-plus-sign"></i> 문제 추가하기</button></a>
			<?php else: ?>
			<a href="#" onclick="history.back(); return false;"><button class="btn btn-danger"><i class="fa-icon-undo"></i> 돌아가기</button></a>
			<?php endif; ?>
		</div>
		<div class="toolbar">
			<input type="hidden" name="selected_question" id="sq" value="0" />
			<div class="toolbar-wrapper">
				<div class="toolbar-desc pull-left"></div>
				<a href="/questions/prints" data-value="print" class="btn btn-mini pull-right btn-edit-question" data-fancybox-type="ajax">
					<i class="fa-icon-print"></i> 인쇄
				</a>
				<?php if ($is_owner): ?>
				<a href="/questions/delete" data-value="delete" class="btn btn-mini pull-right btn-edit-question" data-fancybox-type="ajax">
					<i class="fa-icon-trash"></i> 삭제
				</a>
				<a href="/questions/move" data-value="move" class="btn btn-mini pull-right btn-edit-question" data-fancybox-type="ajax">
					<i class="fa-icon-cut"></i> 이동
				</a>
				<?php endif; ?>
				<a href="/questions/copy" data-value="copy" class="btn btn-mini pull-right btn-edit-question" data-fancybox-type="ajax">
					<i class="fa-icon-copy"></i> 복사
				</a>
			</div>
		</div>
		<?php else: ?>
		<div class="empty">
			<h2>올바른 접근이 아닙니다.</h2><br>
			<a href="#" onclick="history.back(); return false;"><button class="btn btn-danger"><i class="fa-icon-undo"></i> 돌아가기</button></a>
		</div>
		<?php endif; ?>
	</div>
</div>
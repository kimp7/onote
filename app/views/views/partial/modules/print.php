<div class="print-wrapper">
<?php if ($option == 'o' || $option == 'b'): ?>
	<?php $i=0; $t=ceil(sizeof($questions)/2); foreach($questions as $q): ?>
	<?php if($i%2 == 0): ?>
	<div class="page">
		<div class="print-header"><?=$subject;?> 오답노트</div>
		<div class="divider"></div>
		<div class="print-footer">
			<span class="pagenum"><?php echo ($i/2)+1 .'/'. $t; ?></span>
			<span calss="left">스마트한 공부습관 오답노트</span>
			<span class="right">www.odab.net</span>
		</div>
		<div class="print-column left">
			<div class="meta"><?php echo '고'.$q->grade.' '.$q->year.'년 '.$q->month.'월 '.$q->subject; ?></div>
			<img src="<?=$q->path;?>" alt="question" />
			<?php if($option == 'b'): ?>
			<div class="answer">
				<?php if ($q->answer) {
					echo $q->answer->data;
				} else {
					echo '등록된 해설이 없습니다.';
				} ?>
			</div>
			<?php endif; ?>
		</div>
	<?php else: ?>
		<div class="print-column right">
			<div class="meta"><?php echo '고'.$q->grade.' '.$q->year.'년 '.$q->month.'월 '.$q->subject; ?></div>
			<img src="<?=$q->path;?>" alt="question" />
			<?php if($option == 'b'): ?>
			<div class="answer">
				<?php if ($q->answer) {
					echo $q->answer->data;
				} else {
					echo '등록된 해설이 없습니다.';
				} ?>
			</div>
			<?php endif; ?>
		</div>
	</div>
	<?php endif; ?>
	<?php $i++; endforeach; ?>
<?php elseif ($option == 'q'): ?>
	<div class="page">
		<div class="print-header"><?=$subject;?> 오답노트</div>
		<div class="divider"></div>
		<div class="print-footer">
			<span class="pagenum"><?php //echo ($i/2)+1 .'/'. $t; ?></span>
			<span calss="left">스마트한 공부습관 오답노트</span>
			<span class="right">www.odab.net</span>
		</div>
		<div class="print-column">
			<?php $i=0; foreach($questions as $q): ?>
			<div class="item">
				<div class="meta"><?php echo '고'.$q->grade.' '.$q->year.'년 '.$q->month.'월 '.$q->subject; ?></div>
				<img src="<?=$q->path;?>" alt="question" />
			</div>
			<?php $i++; endforeach; ?>
		</div>
	</div>
<?php elseif ($option == 's'): ?>
	
<?php endif; ?>
</div>

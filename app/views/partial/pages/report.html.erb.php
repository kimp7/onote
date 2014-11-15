<div id="content" class="">
	<div class="row-fluid">
		<div class="report-header-msg"><i class="fa-icon-magic"></i> 총점별 성적표는 각 시험별로 최소 한과목 이상의 성적 기록이 있으면 표시됩니다</div>
		<ul class="nav nav-pills nav-subject">
		<?php $i=0; foreach($subjects as $subject): ?>
			<li class="nav-subject-item">
				<a class="subject-item-list <?php if($i==0) echo 'active'; ?>" data-subid="<?=$subject->id?>" data-slug="<?=$subject->slug?>"><?=$subject->name?></a>
			</li>
		<?php $i++; endforeach; ?>
		</ul>
		<input type="hidden" id="latest" value="<?=$latest;?>" >
		<ul class="btn-group by-group">
			<button type="button" data-id="subject" data-sort="과목" class="btn btn-switch">과목</button>
			<button type="button" data-id="score" data-sort="총점" class="btn btn-switch">총점</button>
			<button type="button" data-id="understanding" data-sort="이해도" class="btn btn-switch">이해도</button>
		</ul>
	</div>
	<div class="row-fluid">
		<div class="box report-box span6">
			<div class="box-content report-wrapper report-list"></div>
		</div>
		<div class="box report-box span6">
			<div class="box-content report-wrapper report-chart">
				<div id="chart-wrapper" class="chart-wrapper"></div>
			</div>
		</div>
	</div>
</div>
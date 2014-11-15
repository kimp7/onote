<div id="content" class="paper-container">
	<div class="filter" style="width:100%; margin-bottom:0; border-radius:6px 6px 0 0; border:1px solid #2c3e50;">
		<input type="hidden" class="search-grade" value="<?php echo (isset($sv_grade)) ? $sv_grade : ''; ?>" />
		<input type="hidden" class="search-year" value="<?php echo (isset($sv_year)) ? $sv_year : ''; ?>" />
		<input type="hidden" class="search-month" value="<?php echo (isset($sv_month)) ? $sv_month : ''; ?>" />
		<input type="hidden" class="search-subject-name" value="<?php echo (isset($sv_subject_name)) ? $sv_subject_name : ''; ?>" />
		<input type="hidden" class="search-subject-id" value="<?php echo (isset($sv_subject_id)) ? $sv_subject_id : ''; ?>" />
		<input type="hidden" class="search-exam-id" value="<?php echo (isset($sv_exam_id)) ? $sv_exam_id : ''; ?>" />
		<div class="navbar-navy" style="border-radius:0; padding:0;">
			<ul class="nav">
				<li class="plain">시험선택</li>
				<li class="menu grade">
					<a>학년</a><b class="caret"></b>
				</li>
				<li class="menu year">
					<a>년도</a><b class="caret"></b>
				</li>
				<li class="menu month">
					<a>시험</a><b class="caret"></b>
				</li>
				<li class="menu subject">
					<a>과목</a><b class="caret"></b>
				</li>
				<li class="count">
					<a class="number"></a>
				</li>
			</ul>
			<ul class="nav pull-right">
				<li class="btn-grading-wrapper" style="border:0; line-height:40px;">
					<button class="btn btn-grading disabled"><i class="fa-icon-check"></i> 채점하기</button>
					<button class="btn btn-paper-download disabled"><i class="fa-icon-download-alt"></i> 시험지 다운받기</button>
				</li>
			</ul>
		</div><!-- /navbar-navy -->
		<div class='filterwrapper' style="border-radius:0; padding:10px 0;">
			<ul class="nav plain"></ul>
			<ul class="nav grade">
				<?php foreach($ov_grade as $grade): ?>
					<li data-id="<?=$grade['val']?>"><?=$grade['val']?>학년</li>
				<?php endforeach; ?>
			</ul>
			<ul class="nav year">
				<?php foreach($ov_year as $year): ?>
					<li data-id="<?=$year['val']?>"><?=$year['val']?>년</li>
				<?php endforeach; ?>
			</ul>
			<ul class="nav month">
				<?php foreach($ov_month as $month): ?>
					<li data-id="<?=$month['val']?>"><?=$month['val']?>월</li>
				<?php endforeach; ?>
			</ul>
			<ul class="nav subject">
				<div class="subject_new">
					<ul class="nav">
						<?php $i=0; foreach($ov_subject['new'] as $subject): if($i==6 || $i==14) echo '</ul><ul class="nav">'; ?>
						<li data-id="<?=$subject->id?>" data-name="<?=$subject->name?>"><?=$subject->name?></li>
						<?php $i++; endforeach; ?>
					</ul>
				</div>
				<div class="subject_old hidden">
					<ul class="nav">
						<?php $i=0; foreach($ov_subject['old'] as $subject): if($i==4 || $i==12) echo '</ul><ul class="nav">'; ?>
						<li data-id="<?=$subject->id?>" data-name="<?=$subject->name?>"><?=$subject->name?></li>
						<?php $i++; endforeach; ?>
					</ul>
				</div>
			</ul>
			<div class="clearfix"></div>
		</div>
		<!--<div class="ft_wrapper round" style="margin:0; border-radius:0; padding:10px 0 0 0;">
			<div class="ft_section">
				<span class="title">학년</span>
				<ul class="ft_grade">
					<?php foreach($ov_grade as $grade): ?>
					<li class="item round-small <?php if ($sv_grade == $grade['val']) echo 'active'; ?>" data-id="<?=$grade['val']?>"><?=$grade['val']?>학년</li>
					<?php endforeach; ?>
				</ul>
				<ul class="pull-right" style="margin-right:15px;">
					<button class="btn btn-grading disabled"><i class="fa-icon-check"></i> 채점하기</button>
					<button class="btn btn-paper-download disabled"><i class="fa-icon-download-alt"></i> 시험지 다운받기</button>
				</ul>
			</div>
			<div class="ft_section">
				<span class="title">년도</span>
				<ul class="ft_year">
					<?php foreach($ov_year as $year): ?>
					<li class="item round-small <?php if ($sv_year == $year['val']) echo 'active'; ?>"  data-id="<?=$year['val']?>"><?=$year['val']?>년</li>
					<?php endforeach; ?>
				</ul>
			</div>
			<div class="ft_section">
				<span class="title">시험</span>
				<ul class="ft_month">
					<?php foreach($ov_month as $month): ?>
					<li class="item round-small <?php if ($sv_month == $month['val']) echo 'active'; ?>"  data-id="<?=$month['val']?>"><?=$month['val']?>월</li>
					<?php endforeach; ?>
				</ul>
			</div>
			<div class="ft_section">
				<span class="title">과목</span>
				<ul class="ft_subject new <?php if ($sv_year < 2013 && !empty($sv_year)) echo 'hidden'; ?>">
					<?php $i=0; foreach($ov_subject['new'] as $subject): if($i==6 || $i==14) echo '<li class="divider"></li>'; ?>
					<li class="item compact round-small <?php if ($sv_year >= 2013 && $sv_subject_name == $subject->name) echo 'active'; ?>" data-id="<?=$subject->id?>" data-name="<?=$subject->name?>"><?=$subject->name?></li>
					<?php $i++; endforeach; ?>
				</ul>
				<ul class="ft_subject old <?php if ($sv_year >= 2013 || empty($sv_year)) echo 'hidden'; ?>">
					<?php $i=0; foreach($ov_subject['old'] as $subject): if($i==4 || $i==12) echo '<li class="divider"></li>'; ?>
					<li class="item compact round-small <?php if ($sv_year < 2013 && $sv_subject_name == $subject->name) echo 'active'; ?>" data-id="<?=$subject->id?>" data-name="<?=$subject->name?>"><?=$subject->name?></li>
					<?php $i++; endforeach; ?>
				</ul>
			</div>
			<div class="ft_section summary hidden">
				<span class="title">시험</span>
				<div style="float:left; line-height:25px; padding:0 10px;">
					<span class="ft_summary_info">고3 2013년 10월 국어A</span>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>-->
		<div id="answersheet" class="paper-input-container">
			<div class="plain">정답입력</div>
			<div class="paper-input-wrapper"></div>
			<div class="clearfix"></div>
		</div>
	</div>
	
	<div class="row-fluid paper-wrapper">
		
	</div>
	<div class="noresult hidden">
		<h2>죄송합니다. 아직 문제가 준비되지 않았습니다.</h2>
	</div>
	
	<div id="backToTop"></div>
	
</div>


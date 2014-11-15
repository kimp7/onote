<div id="content">
	<div id="herobox">
		<button class="close" style="margin:5px 10px;">×</button>
		<div id="hero-content">
			<div id="blurb">
				오답노트는 교육과정평가원의 수능 기출문제와<br>
				시,도 교육청의 학력평가문제를 활용하여<br>
				대입 수험생들의 스마트한 학습을 돕는<br>
				수능 대비 무료 학습 서비스입니다.<br><br>
				<a href="/about" class="btn btn-seablue">더 알아보기</a>
			</div>
			<div id="desc">
				<span style="float:left;"><strong>사용방법 : </strong></span>
				<div class="step" style="clear:left;">
					<i class="fa-icon-check"></i><br>시험 본 과목<br>채점하고
				</div>
				<div class="step">
					<i class="fa-icon-book"></i><br>틀린문제로<br>오답노트 만들고
				</div>
				<div class="step">
					<i class="fa-icon-pencil"></i><br>해설보며<br>공부하고
				</div>
				<div class="step">
					<i class="fa-icon-print"></i><br>인쇄해서<br>한번 더 풀고
				</div>
				<div class="step">
					<i class="fa-icon-bar-chart"></i><br>성적확인하며<br>취약한부분 찾기
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
	<script type="text/javascript">
		if (getCookie('odab_herobox')) { $("#herobox").hide(); }
	</script>
	<div class="filter">
		<input type="hidden" class="search-grade" value="<?php echo (isset($sv_grade)) ? $sv_grade : ''; ?>" />
		<input type="hidden" class="search-year" value="<?php echo (isset($sv_year)) ? $sv_year : ''; ?>" />
		<input type="hidden" class="search-month" value="<?php echo (isset($sv_month)) ? $sv_month : ''; ?>" />
		<input type="hidden" class="search-subject-name" value="<?php echo (isset($sv_subject_name)) ? $sv_subject_name : ''; ?>" />
		<input type="hidden" class="search-subject-id" value="<?php echo (isset($sv_subject_id)) ? $sv_subject_id : ''; ?>" />
		<input type="hidden" class="search-exam-id" value="<?php echo (isset($sv_exam_id)) ? $sv_exam_id : ''; ?>" />
		<input type="hidden" class="search-tag-id" value="<?php echo (isset($sv_tag_id)) ? $sv_tag_id : ''; ?>" />
		<input type="hidden" class="search-tag-name" value="<?php echo (isset($sv_tag_name)) ? $sv_tag_name : ''; ?>" />
		<div class="ft_wrapper round">
			<div class="ft_section">
				<span class="title">학년</span>
				<ul class="ft_grade">
					<?php foreach($ov_grade as $grade): ?>
					<li class="item round-small <?php if ($sv_grade == $grade['val']) echo 'active'; ?>" data-id="<?=$grade['val']?>"><?=$grade['val']?>학년</li>
					<?php endforeach; ?>
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
			<div class="clearfix"></div>
		</div>
	</div>
	<div class="tags hidden">
		<span>태그 : <span class="search-tag"></span></span>
	</div>
	<div id="loading"></div>
	<div id="prob-container" class="prob-container">
		<div id="prob-wrapper" class="prob-wrapper question-wrapper">
			<div class="prob-margin"></div>
		</div>
		<div class="noresult hidden">
			<h2>죄송합니다. 아직 문제가 준비되지 않았습니다.</h2>
		</div>
		<div class="toolbar">
			<div class="toolbar-wrapper">
				<div class="toolbar-desc pull-left"></div>
				<a href="/questions/add" class="pull-right btn btn-seablue btn-mini btn-add-question" data-fancybox-type="ajax">
					<i class="fa-icon-plus-sign"></i> 노트에 추가하기
				</a>
			</div>
		</div>
	</div>
	<div id="backToTop"></div>
</div>

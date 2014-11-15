<div class="pop-wrapper subs">

<form class="form-horizontal subject-option" method="post">
	<h1><i class="glyphicons-icon settings"></i>선택과목 변경</h1>
	<fieldset>
		<input type="hidden" name="current" value="<?=$current;?>" />
		<div class="control-group">
			<label class="control-label" for="subject-option">국어영역</label>
			<div class="controls subject-option">
				<div class="btn-group kor" data-group="subject-korean">
					<?php foreach($subjects['korean'] as $sub) {
						echo '<button id="'.$sub->slug.'" type="button" data-id="'.$sub->id.'" data-slug="'.$sub->slug.'" data-value="'.substr($sub->name, -1, 1).'" class="btn subject-item">'.$sub->name.'</button>';
					} ?>
				</div>
				<span class="error"></span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="subject-option">수학영역</label>
			<div class="controls subject-option">
				<div class="btn-group mat" data-group="subject-math">
					<?php foreach($subjects['math'] as $sub) {
						echo '<button id="'.$sub->slug.'" type="button" data-id="'.$sub->id.'" data-slug="'.$sub->slug.'" data-value="'.substr($sub->name, -1, 1).'" class="btn subject-item">'.$sub->name.'</button>';
					} ?>
				</div>
				<span class="error"></span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="subject-option">영어영역</label>
			<div class="controls subject-option">
				<div class="btn-group eng" data-group="subject-english">
					<?php foreach($subjects['english'] as $sub) {
						echo '<button id="'.$sub->slug.'" type="button" data-id="'.$sub->id.'" data-slug="'.$sub->slug.'" data-value="'.substr($sub->name, -1, 1).'" class="btn subject-item">'.$sub->name.'</button>';
					} ?>
				</div>
				<span class="error"></span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="subject-option">탐구영역</label>
			<div class="controls subject-option">
				<div class="btn-group cur" data-group="subject-curriculum">
					<button id="CN" type="button" class="btn btn-switch btn-curriculum" data-option="natural">과학탐구</button>
					<button id="CL" type="button" class="btn btn-switch btn-curriculum" data-option="liberal">사회탐구</button>
				</div>
				<span class="error"></span>
				<div class="curriculum" data-option="natural">
					<ul class="nav nav-pills nav-subject">
					<?php $i=0; foreach($subjects['science'] as $sub): if ($i == 4) echo '<div class="clearfix"></div>'; ?>
						<li class="nav-subject-item">
							<a id="<?=$sub->slug;?>" class="subject-item" data-id="<?=$sub->id?>" data-slug="<?=$sub->slug?>"><?=$sub->name?></a>
						</li>
					<?php $i++; endforeach; ?>
					</ul>
				</div>
				<div class="curriculum" data-option="liberal">
					<ul class="nav nav-pills nav-subject">
					<?php $i=0; foreach($subjects['society'] as $sub): ?>
						<li class="nav-subject-item">
							<a id="<?=$sub->slug;?>" class="subject-item" data-id="<?=$sub->id?>" data-slug="<?=$sub->slug?>"><?=$sub->name?></a>
						</li>
					<?php $i++; endforeach; ?>
					</ul>
				</div>
			</div>
		</div>
		<div class="control-group" style="text-align:right;">
			<button type="button" class="btn btn-cancel">취소</button>
			<button type="button" class="btn btn-primary btn-save-subject">과목 변경</button>
		</div>
	</fieldset>
</form>
<script type="text/javascript">
$(function() {
	var temp = $('input[name=current]').val().split('|');
	for (i in temp) {
		$('#'+temp[i]).addClass('active');
		if (temp[i] === 'CN') {
			$('.curriculum[data-option=natural]').show();
		} else if (temp[i] === 'CL') {
			$('.curriculum[data-option=liberal]').show();
		}
	}
	
	$('button.subject-item').click(function(e) {
		if (!$(this).hasClass('active')) {
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
		}
		if ( $(this).parent().hasClass('kor')
			&& $(this).data('value') == 'B'
			&& ($(this).data('value') == $('.btn-group.mat').find('.active').data('value'))
		) {
			$(this).parent().next().html('<img src="/static/img/invalid.png"> 국어B형과 수학B형을 동시에 선택할 수 없습니다.').show(0).delay(1000).fadeOut(200);
			console.log($(this).hasClass('active'));
			$(this).removeClass('active');
			$(this).prev().addClass('active');
		} else if ( $(this).parent().hasClass('mat')
			&& $(this).data('value') == 'B'
			&& ($(this).data('value') == $('.btn-group.kor').find('.active').data('value')) 
		) {
			$(this).parent().next().html('<img src="/static/img/invalid.png"> 국어B형과 수학B형을 동시에 선택할 수 없습니다.').show(0).delay(1000).fadeOut(200);
			$(this).removeClass('active');
			$(this).prev().addClass('active');
		}
	});
	$('.btn-curriculum').click(function(e) {
		var opt = $(this).data('option');
		$('.curriculum').hide().find('.active').removeClass('active');
		$('.curriculum[data-option='+opt+']').show();
	});
	$('a.subject-item').click(function(e) {
		if ($(this).hasClass('active')) $(this).removeClass('active');
		else $(this).addClass('active');
		if ($(this).parent().parent().find('.active').length >= 3) {
			$('.btn-group.cur').next().html('<img src="/static/img/invalid.png"> 최대 2개 과목을 선택할 수 있습니다').show(0).delay(1000).fadeOut(200);
			$(this).removeClass('active');
			return;
		}
	});
	$('.btn-cancel').click(function(e) {
		$.fancybox.close(true);
		return;
	});
	$('.btn-save-subject').click(function(e) {
		var items = $('.subject-item.active').length;
		if (items == 4 || items == 5) {
			var lists = '<ul class="nav nav-pills nav-subject">';
			$('.subject-item.active').each(function(i) {
				lists += '<li class="nav-subject-item"><a class="subject-item-list active" data-id="'+$(this).data('id')+'" data-slug="'+$(this).data('slug')+'">'+$(this).text()+'</a></li>';
			});
			lists += '</ul>';
			$('.subject-lists').attr('data-change', 'Y').html(lists);
			$.fancybox.close(true);
			return;
		} else {
			$('.btn-group.cur').next().html('<img src="/static/img/invalid.png"> 최소 1과목 이상 탐구영역 과목을 선택하세요').show(0).delay(1000).fadeOut(200);
			return;
		}
	});
});
</script>

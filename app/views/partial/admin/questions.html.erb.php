<div class="span10" id="content">
	<div class="row-fluid">
		<div class="block">
			<div class="navbar navbar-inner block-header">
				<div class="muted pull-left">문제 관리</div>
			</div>
			<div class="block-content collapse in">
				<div class="alert alert-info" style="margin-bottom:10px;">
					<button class="close" data-dismiss="alert">×</button>
					<strong>최소 두개 이상 입력하세요. 나머지 빈 입력값은 자동으로 전체 검색합니다.</strong>
				</div>
				<div class="well well-small" style="margin-bottom:10px;">
					<form id="searchQuestions">
						<div class="input-append">
							<input type="text" name="y" class="input qs-input qs-year" value="<?=$sy;?>" placeholder="2013" />
							<span class="add-on">년</span>
						</div>
						<div class="input-append">
							<input type="text" name="m" class="input qs-input qs-month" value="<?=$sm;?>" placeholder="11" />
							<span class="add-on">월</span>
						</div>
						<div class="input-append">
							<input type="text" name="s" class="input qs-input qs-subject" value="<?=$ss;?>" placeholder="국어A" />
							<span class="add-on">과목명</span>
						</div>
						<div class="input-append">
							<input type="text" name="t" class="input qs-input qs-subject" value="<?=$st;?>" placeholder="시의 감상" />
							<span class="add-on">태그명</span>
						</div>
						<input type="hidden" name="p" value="<?=$sp;?>" />
						<button type="submit" class="btn btn-success">문제검색</button>
						<span style="font-size:18px; font-weight:bold; line-height:30px;" class="pull-right">총 <?=$total;?> 문제</span>
					</form>
				</div>
				<?php if (count($questions)): ?>
				<table class="table table-striped">
					<thead>
						<tr>
							<th>과목</th>
							<th>문제</th>
							<th>태그</th>
						</tr>
					</thead>
					<tbody>
						<?php foreach ($questions as $q): ?>
						<tr>
							<td class="qd-subject"><?=$q->subject_name;?></td>
							<td class="qd-info"><?=$q->info;?></td>
							<td class="qd-tags">
								<ul data-id="<?=$q->id;?>" data-subject="<?=$q->subject_id;?>" class="qd-taglist"></ul>
							</td>
							<!--
							<td class="qd-add">
							<?php //if (count($q->tags)): foreach ($q->tags as $t): ?>
								<span data-id="<?=$t->id;?>" class="label label-tag"><?=$t->name;?></span>
							<?php //endforeach; else: ?>
								등록된 태그가 없습니다
							<?php //endif; ?>
							</td>-->
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
				<?php else: ?>
				<p>결과가 없습니다.</p>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
$(function(){
	$('.qd-taglist').each(function(i) {
		var self = $(this);
		self.tagHandler({
			getData: { id: self.data('id'), subject_id: self.data('subject') },
			getURL: '/tag/get_tags_by_question_id',
			updateData: { id: self.data('id'), subject_id: self.data('subject') },
			updateURL: '/tag/set_tags_by_question_id',
		    autocomplete: true,
		    autoUpdate: true,
		    allowAdd: false,
		    minChars: 1,
		    afterDelete: function(tag) {  }
		    //onAdd: function(tag) { alert('Added tag: ' + tag); },
		    //onDelete: function(tag) { alert('Deleted tag: ' + tag); }
		});
	});
});
</script>

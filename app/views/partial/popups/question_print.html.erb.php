<div class="question-pop-wrapper">

<form class="form-horizontal question-pop" method="post">
	<h1><i class="glyphicons-icon print"></i><?php echo count($questions); ?>문제 인쇄하기</h1>
	<fieldset>
		<div class="control-group">
			<label class="control-label" for="print-content-option">인쇄 설정</label>
			<div class="controls">
				<div class="btn-group content-option">
					<button type="button" class="btn btn-option active" data-value="o">오답노트</button>
					<button type="button" class="btn btn-option" data-value="b">오답노트+해설</button>
					<button type="button" class="btn btn-option disabled" data-value="q" disabled>문제집</button>
					<button type="button" class="btn btn-option disabled" data-value="s" disabled>해설집</button>
				</div>
			</div>
			<div class="controls">
				<div class="preview">
					<div class="sample o active">
						<img src="/static/img/sample-o.png" />
						<div class="help">한단에 한문제씩 인쇄</div>
					</div>
					<div class="sample b">
						<img src="/static/img/sample-b.png" />
						<div class="help">한단에 한문제 + 해설 인쇄</div>
					</div>
					<div class="sample q">
						<img src="/static/img/sample-q.png" />
						<div class="help">문제만 인쇄</div>
					</div>
					<div class="sample s">
						<img src="/static/img/sample-s.png" />
						<div class="help">해설만 인쇄</div>
					</div>
				</div>
			</div>
		</div>
		<!--<div class="control-group">
			<label class="control-label" for="print-format-option">용지 설정</label>
			<div class="controls">
				<div class="btn-group format-option">
					<button type="button" class="btn btn-option" data-value="1">1쪽에 1문제</button>
					<button type="button" class="btn btn-option active" data-value="2">1쪽에 2문제</button>
				</div>
			</div>
		</div>-->
		<div class="control-group">
			<div class="controls">
				<small>* 문제에 포함된 지문은 함께 출력되지 않습니다.</small>
			</div>
		</div>
		<div class="control-group">
			<div class="controls" style="text-align:right;">
				<!--<input type="text" id="<?php echo $subject->id; ?>" name="subject_id" value="<?php echo $subject->name; ?>" disabled />-->
				<button type="button" class="btn btn-cancel">취소</button>
				<button type="button" class="btn btn-primary btn-print" onclick="prints()">인쇄하기</button>
			</div>
		</div>
	</fieldset>
</form>

<script type="text/javascript">
var objWin = null;
var prints = function() {
	var objOpt = "width=820,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no";
	objWin = window.open('', 'print', objOpt);
}
$(document).ready(function() {
	$(document)
	.on('click', '.btn-option', function(e) {
		if (!$(this).hasClass('active')) {
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			$('.preview').find('.active').removeClass('active');
			$('.preview').find('.'+$(this).data('value')).addClass('active');
		}
	})
	.on('click', '.btn-cancel', function(e) {
		$.fancybox.close(true);
		return;
	})
	.off('click', '.btn-print').on('click', '.btn-print', function(e) {
		var questions = <?php echo json_encode($questions); ?>;
		$.ajax({
			type:"POST", url:'/questions/prints', data:{ 'subject': '<?=$subject->name;?>', 'questions': questions, 'option':$('.content-option .active').data('value') },
			success: function(response) {
				//var objOpt = "width=720,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no";
				//var objWin = window.open('', 'print', objOpt);
				objWin.document.write(response);
				objWin.document.title = '오답노트 > 인쇄하기';
				$(objWin.document).imagesLoaded( function() {
					objWin.document.close();
					objWin.focus();
					objWin.print();
					objWin.close();
					$.fancybox.close(true);
					return;
				});
			}
		});
	});
});
</script>

</div>
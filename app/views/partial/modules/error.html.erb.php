<div id="content" class="span11" style="text-align:center;">
	<h2 style="margin-top:100px;">잘못된 요청입니다.</h2>
	<a href="#" onclick="history.back(); return false;">
		<button class="btn btn-danger"><i class="fa-icon-undo"></i> 돌아가기</button>
	</a>
</div>
<script type="text/javascript">
<?php if (isset($alert)): ?>
$(document).ready(function(){
	bootbox.dialog("<?=$alert;?>", [{
		"label" : "확인",
		"class" : "btn-primary",
		"callback": function() {
			window.location.replace("/");
		}
	}]);
});
<?php endif; ?>
</script>

<div class="span10" id="content">
	<div class="row-fluid">
		<div class="block">
			<div class="navbar navbar-inner block-header">
				<div class="muted pull-left">엑셀 파싱</div>
				<div class="pull-right">
					<span class="badge badge-warning">.xslx 파일만 업로드 가능</span>
				</div>
			</div>
			<div class="block-content collapse in">
				<div class="span12">
					<div class="alert">
						<button class="close" data-dismiss="alert">&times;</button>
						<strong>주의!</strong> Excel2007 이상 버전의 파일만 가능합니다.
					</div>
				</div>
				<div class="span12">
					<?php //var_dump($result['time']); ?>
					<?php
					foreach($results as $data):
						// if (!$data['result']) {
							// //echo '<small>'.$data['data'].'</small><hr>';
							// var_dump($data['data']);
						// } else {
							// echo $data['id'].' ';
						// }
						var_dump($data);
					endforeach;
					?>
				</div>
				<div class="span3">
				</div>
				<div class="span3">
				</div>
				<div class="span3">
				</div>
				<div class="span3">
				</div>
			</div>
		</div>
	</div>
</div>
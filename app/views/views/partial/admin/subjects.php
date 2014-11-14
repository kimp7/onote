<div class="span10" id="content">
	<div class="row-fluid">
		<div class="block">
			<div class="navbar navbar-inner block-header">
				<div class="muted pull-left">과목 관리</div>
			</div>
			<div class="block-content collapse in">
				<ul class="nav nav-tabs nav-subjects">
					<li id="old" class=""><a href="#tab-old" data-toggle="tab">구과목 (~ 2012년)</a></li>
					<li id="new" class="active"><a href="#tab-new" data-toggle="tab">신과목 (2013년 ~)</a></li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane" id="tab-old">
						<table class="table table-bordered table-striped">
							<thead>
								<tr>
									<th>id</th>
									<th>type_name</th>
									<th>section</th>
									<th>name</th>
									<th>slug</th>
									<th>key</th>
								</tr>
							</thead>
							<tbody>
							<?php foreach ($subjects['old'] as $subject): ?>
								<tr>
									<td><?=$subject->id?></td>
									<td><?=$subject->type_code_name?></td>
									<td><?=$subject->section_name?></td>
									<td><?=$subject->name?></td>
									<td><?=$subject->slug?></td>
									<td><?=$subject->key?></td>
								</tr>
							<?php endforeach; ?>
							</tbody>
						</table>
					</div>
					<div class="tab-pane active" id="tab-new">
						<table class="table table-bordered table-striped">
							<thead>
								<tr>
									<th>id</th>
									<th>type_name</th>
									<th>section</th>
									<th>name</th>
									<th>slug</th>
									<th>key</th>
								</tr>
							</thead>
							<tbody>
							<?php foreach ($subjects['new'] as $subject): ?>
								<tr>
									<td><?=$subject->id?></td>
									<td><?=$subject->type_code_name?></td>
									<td><?=$subject->section_name?></td>
									<td><?=$subject->name?></td>
									<td><?=$subject->slug?></td>
									<td><?=$subject->key?></td>
								</tr>
							<?php endforeach; ?>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
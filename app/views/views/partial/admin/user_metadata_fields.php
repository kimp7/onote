<div class="span10" id="content">
	<div class="row-fluid">
		<div class="block">
			<div class="navbar navbar-inner block-header">
				<div class="muted pull-left">유저 메타데이터 필드 관리</div>
			</div>
			<div class="block-content collapse in">
				
				<a href="#addField" role="button" class="btn btn-danger pull-left" style="margin-left:10px;" data-toggle="modal"><i class="icon-plus icon-white"></i> 필드 추가</a>
				<div id="addField" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-header">
						<h3 id="myModalLabel">메타데이터필드 추가</h3>
					</div>
					<div class="modal-body">
						<form class="form-addtag form-inline">
							<div class="admin-form-controls">
								<label class="admin-form-key" for="field-name">필드 이름</label>
								<input type="text" name="addFieldName" class="addFieldName span9" />
							</div>
							<div class="admin-form-controls">
								<label class="admin-form-key" for="field-key">필드 키</label>
								<input type="text" name="addFieldKey" class="addFieldKey span9" />
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">취소</button>
						<button class="btn-add-metadata-field btn btn-primary"><i class="icon-plus icon-white"></i> 필드 추가</button>
					</div>
				</div>
					
				<div class="metadata-field-container span12">
					
					<table class="table table-bordered table-striped">
						<thead>
							<tr>
								<th>id</th>
								<th>name</th>
								<th>key</th>
								<th>created_at</th>
							</tr>
						</thead>
						<tbody>
						<?php
						if (count($metadata_fields)):
							foreach ($metadata_fields as $metadata_field):
						?>
							<tr>
								<td>
									<?=$metadata_field->id?>
								</td>
								<td>
									<?=$metadata_field->name?>
								</td>
								<td>
									<?=$metadata_field->key?>
								</td>
								<td>
									<?=$metadata_field->created_at?>
								</td>
							</tr>
						<?php
							endforeach;
						else:
						?>
							<tr>
								<td colspan="4" style="text-align:center;">데이터가 없습니다</td>
							</tr>
						<?php endif; ?>
						</tbody>
					</table>
					
				</div>
			</div>
		</div>
	</div>
</div>
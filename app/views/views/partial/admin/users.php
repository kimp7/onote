<div class="span10" id="content">
	<div class="row-fluid">
		<div class="block">
			<div class="navbar navbar-inner block-header">
				<div class="muted pull-left">유저 관리</div>
			</div>
			<div class="block-content collapse in">
				
				<div class="input-append pull-left">
					<input class="input-xlarge" type="text" placeholder="유저 검색" />
					<button class="btn user-search" type="button"><i class="icon-search"></i> 검색</button>
				</div>
				<a href="#addUser" role="button" class="btn btn-danger pull-left" style="margin-left:10px;" data-toggle="modal"><i class="icon-plus icon-white"></i> 유저 추가</a>
				<div id="addUser" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-header">
						<h3 id="myModalLabel">유저 추가</h3>
					</div>
					<div class="modal-body">
						<form class="form-addtag form-inline">
							<div class="admin-form-controls">
								<label class="admin-form-key" for="field-name">유저 이름</label>
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
						<button class="btn-add-user btn btn-primary"><i class="icon-plus icon-white"></i> 유저 추가</button>
					</div>
				</div>
					
				<div class="user-container span12">
					
					<table class="table table-bordered table-striped">
						<thead>
							<tr>
								<th>id</th>
								<th>구분</th>
								<th>이메일</th>
								<th>마이페이지</th>
								<th>닉네임</th>
								<th>내공</th>
								<th>방문수</th>
								<th>최종 로그인</th>
							</tr>
						</thead>
						<tbody>
						<?php
						if (count($users)):
							foreach ($users as $user):
						?>
							<tr>
								<td><?=$user->id?></td>
								<td><?=$user->type?></td>
								<td>
									<a href="#meta<?=$user->id?>" data-toggle="modal"><?=$user->email?></a>
									<div id="meta<?=$user->id?>" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-header">
											<h3 id="myModalLabel"><?=$user->nickname?> 메타데이터</h3>
										</div>
										<div class="modal-body">
											<form class="form-meta<?=$user->id?> form-inline">
												<h4>과목 선택</h4>
												<?php
													$options = array();
													if($user->subject_option) $options = explode('|', $user->subject_option);
												?>
												<div class="admin-form-controls">
												<?php $i=0; foreach ($subjects as $subject): ?>
													<label class="checkbox inline">
														<input type="checkbox" id="<?=$subject->id?>" value="<?=$subject->slug?>" <?php if (in_array($subject->slug, $options)) echo 'checked'; ?>> <?=$subject->name?>
													</label>
													<?php if (in_array($i, array(5, 13 ))) echo '<br/><br/>'; ?>
													<?php if (in_array($i, array(1, 3, 9, 15, 18 ))) echo '<br/>'; ?>
												<?php $i++; endforeach; ?>
												</div>
											</form>
										</div>
										<div class="modal-footer">
											<button class="btn" data-dismiss="modal" aria-hidden="true">취소</button>
											<button class="btn-save-meta btn btn-primary" data-user="<?=$user->id?>">저장</button>
										</div>
									</div>
								</td>
								<td><?=$user->mypage_url?></td>
								<td><?=$user->nickname?></td>
								<td><?=$user->point?></td>
								<td><?=$user->visit_count?></td>
								<td><?=$user->last_login_at?></td>
							</tr>
						<?php
							endforeach;
						else:
						?>
							<tr>
								<td colspan="8" style="text-align:center;">데이터가 없습니다</td>
							</tr>
						<?php endif; ?>
						</tbody>
					</table>
					
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
$(document).ready(function() {
	$(document).on('click', '.btn-save-meta', function(e) {
		var selected = [];
		var user_id = $(this).data('user');
		$(this).parent().prev().find('input[type=checkbox]:checked').each(function() {
			selected.push($(this).val());
		});
		$.ajax({
			type: "POST", url:'/admin/user_metadatas', data: { 'user_id': user_id, 'options': selected.join('|') },
			success: function(data) {
				console.log(data);
				$('#meta'+user_id).modal('hide')
			}
		});
	});
	$("input[type=checkbox][name=cate]").click(function() {
		var bol = $("input[type=checkbox][name=cate]:checked").length >= 4;
		$("input[type=checkbox][name=cate]").not(":checked").attr("disabled",bol);
	});
});
</script>

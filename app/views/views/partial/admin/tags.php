<div class="span10" id="content">
	<div class="row-fluid">
		<div class="block">
			<div class="navbar navbar-inner block-header">
				<div class="muted pull-left">태그 관리 [<?=$total;?>]</div>
			</div>
			<div class="block-content collapse in">
				<div class="span12">
					<div class="alert alert-info" style="margin-bottom:10px;">
						<button class="close" data-dismiss="alert">&times;</button>
						과목별로 태그를 검색, 추가, 수정, 삭제할 수 있습니다.
					</div>
				</div>
				<div class="tag-toolbar">
					<div class="span3">
						<select class="select-subject">
							<?php if (count($subjects)): foreach ($subjects as $subject):
								if ($subject->name == '국어A') { echo '<option class="select-dash" disabled="disabled">------------</option>'; }
								if ($subject->id === $current) {
									echo '<option class="sub-item" data-id="'.$subject->id.'" data-name="'.$subject->name.'" selected="selected">'.$subject->name.' ('.$subject->total.')</option>';
								} else {
									echo '<option class="sub-item" data-id="'.$subject->id.'" data-name="'.$subject->name.'">'.$subject->name.' ('.$subject->total.')</option>';
								}
							endforeach; endif; ?>
						</select>
					</div>
					<div class="span9">
						<form id="tag-search-form" class="form-search form-horizontal pull-left">
							<div class="input-append pull-left">
								<input class="input-xlarge" name="s" type="text" value="<?=$sv;?>" placeholder="태그검색" />
								<button class="btn" type="button"><i class="icon-search"></i> 검색</button>
							</div>
						</form>
						
						<a href="#addTag" role="button" class="btn btn-info pull-left" style="margin-left:10px;" data-toggle="modal"><i class="icon-plus icon-white"></i> 태그추가</a>
						<div id="addTag" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-header">
								<h3 id="myModalLabel">태그 추가</h3>
							</div>
							<div class="modal-body">
								<div class="alert alert-info">
									<button class="close" data-dismiss="alert">&times;</button>
									<span class="addTagInfo">태그를 추가하기 전에 반드시 해당 과목이 맞는지 확인하세요!</span>
								</div>
								<form id="addTagForm">
									<label for="tag-name">태그 이름</label>
									<input type="text" name="addTagName" class="addTagName span9" />
								</form>
							</div>
							<div class="modal-footer">
								<button class="btn" data-dismiss="modal" aria-hidden="true">취소</button>
								<button class="do-add-tag btn btn-info"><i class="icon-plus icon-white"></i> 태그추가</button>
							</div>
						</div>
						
						<a href="#delTag" role="button" class="btn btn-danger pull-right" style="margin-right:5px;" data-toggle="modal"><i class="icon-remove icon-white"></i> 삭제</a>
						<div id="delTag" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-header">
								<h3 id="myModalLabel">태그 삭제</h3>
							</div>
							<div class="modal-body">
								<h4>정말 <span style="color:red;">삭제</span>하시겠습니까?</h4>
							</div>
							<div class="modal-footer">
								<button class="btn" data-dismiss="modal" aria-hidden="true">취소</button>
								<button class="do-del-tag btn btn-danger"><i class="icon-remove icon-white"></i> 태그삭제</button>
							</div>
						</div>
						
						<a href="#editTag" role="button" class="btn btn-warning btn-edit-tag pull-right" style="margin-right:5px;" data-toggle="modal"><i class="icon-edit icon-white"></i> 수정</a>
						<div id="editTag" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-header">
								<h3 id="myModalLabel">태그 수정</h3>
							</div>
							<div class="modal-body">
								<div class="alert alert-warning">
									<span class="addTagInfo">구과목(2012년 이전)과 신과목(2013년 이후)을 유의해서 변경해주세요!</span><button class="close" data-dismiss="alert">&times;</button>
								</div>
								<div>
									<span>선택한 태그를 변경할 과목 : </span>
									<select class="edit-subject">
									<?php foreach ($subjects as $subject):
										if ($subject->name == '국어A') { echo '<option class="select-dash" disabled="disabled">------------</option>'; }
										echo '<option class="sub-edit-item" data-id="'.$subject->id.'">'.$subject->name.'</option>';
									endforeach; ?>
									</select>
								</div>
							</div>
							<div class="modal-footer">
								<button class="btn" data-dismiss="modal" aria-hidden="true">취소</button>
								<button class="do-edit-tag btn btn-warning"><i class="icon-edit icon-white"></i> 태그수정</button>
							</div>
						</div>
					</div>
				</div>
				
				<div class="tag-container">
					<!--<div class="span3"><ul class="nav nav-pills nav-stacked subjects">
						<?php //if (count($subjects)): foreach ($subjects as $subject):
							//echo '<li id="'.$subject->id.'"><a href="/admin/tags/'.$subject->id.'">'.$subject->name.'<span class="badge badge-inverse pull-right">'.$subject->total.'</span></a></li>';
						//endforeach; endif; ?>
					</ul></div>-->
					<div class="span12 tag_list">
					 	<div class="tag-data">
						<?php if (count($tags)): foreach($tags as $tag): ?>
							<div class="tag-single">
								<span data-id="<?php echo $tag->id; ?>" class="label label-tag"><?php echo $tag->name; ?></span>
								<a href="#" class="btn-tagged" target="_blank"><?php echo $tag->total; ?></a>
								<a href="#" class="btn-edit-tag-name"><i class="icon-pencil"></i></a>
							</div>
						<?php endforeach; else: ?>
							<p>결과가 없습니다</p>
						<?php endif; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
$(document).ready(function() {
	$('.select-subject').on('change', function (e) {
		window.location.href = '/admin/tags/'+$('.sub-item:selected').data('id');
	});
	
	$('#addTagForm').submit(function(e) {
		e.preventDefault();
		$('.do-add-tag').trigger('click');
	});
	
	$(document)
	.on('click', '.label-tag', function(e) {
		var self = $(this);
		if (!self.hasClass('selected')) {
			self.addClass('selected');
		} else {
			self.removeClass('selected');
		}
	})
	.on('click', '.btn-tagged', function(e) {
		e.preventDefault();
		window.open('/questions/tagging/'+$('.sub-item:selected').data('name')+'/'+($(this).parent().find('.label-tag').text()).replace(/ /g, '-'), '_blank');
	})
	.on('click', '.btn-edit-tag', function(e) {
		if ($('.label-tag.selected').length == 0) {
			// error
		}
	})
	.on('click', '.btn-edit-tag-name', function(e) {
		e.preventDefault();
		var tag = $(this).parent().find('.label-tag')
		bootbox.prompt('<h4>['+tag.text()+'] 에서 변경할 이름을 입력하세요</h4>', "취소", "태그 이름 수정", function(result) {
			if (result == '') {
				alert('공백은 안되요'); return;
			} else if (result != null) {
				$.ajax({
					type: "POST", url: "/admin/tag_action/edit_name", data: { 'tag_id': tag.data('id'), 'name': result },
					success: function(response) {
						if (response.result) {
							window.location.reload();
						} else {
							alert(response.message);
							return;
						}
					}
				});
			}
		});
		e.stopPropagation();
	})
	.on('click', '.do-edit-tag', function(e) {
		if ($('.label-tag.selected').length == 0) { alert('수정할 태그를 먼저 선택해야됩니다.'); return; }
		var selected = [];
		$('.label-tag.selected').each(function(i) {
			selected.push($(this).data('id'));
		});
		var sub_id = $('.sub-edit-item:selected').data('id');
		$.ajax({
			type: "POST", url: "/admin/tag_action/edit", data: { 'subject_id': sub_id, 'tag_array': selected },
			success: function(response) {
				if (response.result) {
					//alert(response.message);
					window.location.reload();
				} else {
					alert(response.message);
					return;
				}
			}
		});
		return;
	})
	.on('click', '.do-add-tag', function(e) {
		var addTagName = $('input.addTagName').val();
		if (!addTagName) {
			$('.addTagInfo').text('태그 이름을 입력하세요!');
			return;
		}
		$.ajax({
			type: "POST", url: "/admin/tag_action/add",
			data: { 'subject_id': $('.sub-item:selected').data('id'), 'value': addTagName },
			success: function(res) {
				console.log(res);
				if (res.result) {
					$('input.addTagName').val('').focus();
					$('.addTagInfo').text('['+addTagName+'] 태그가 추가되었습니다.').parent().removeClass('alert-info').addClass('alert-success');
					return;
				} else {
					alert('태그 추가 중에 문제가 발생했습니다. 다시 시도해주세요.');
				}
			}
		});
		return false;
	})
	.on('click', '.do-del-tag', function(e) {
		if ($('.label-tag.selected').length == 0) { alert('삭제할 태그를 먼저 선택해야됩니다.'); return; }
		var selected = [];
		$('.label-tag.selected').each(function(i) {
			selected.push($(this).data('id'));
		});
		$.ajax({
			type: "POST", url: "/admin/tag_action/delete", data: { 'tag_array': selected },
			success: function(response) {
				if (response.result) {
					window.location.reload();
				} else {
					alert(response.message);
					return;
				}
			}
		});
		return;
	});
});
</script>

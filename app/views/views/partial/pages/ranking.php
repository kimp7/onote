<div id="content">
	<div id="ranking-wrapper" class="row-fluid ranking-wrapper">
		<div class="ranking-header">
			<form id="user-search-form" class="form-search form-horizontal pull-left">
				<div class="input-append span12">
					<input type="text" name="s" class="search-query" placeholder="유저 이름으로 검색해보세요" value="<?=$sv;?>" >
					<button type="submit" class="btn"><i class="icon-search"></i></button>
				</div>
			</form>
			<div class="btn-group by-group">
				<?php if (!($ov) || $ov == 'point'): ?>
				<button type="button" data-sort="point" class="btn btn-order btn-switch active">내공순</button>
				<button type="button" data-sort="date" class="btn btn-order btn-switch">최신순</button>
				<?php else: ?>
				<button type="button" data-sort="point" class="btn btn-order btn-switch">내공순</button>
				<button type="button" data-sort="date" class="btn btn-order btn-switch active">최신순</button>
				<?php endif; ?>
			</div>
		</div>
		<div class="clearfix"></div>
		<?php if (count($users) > 0): foreach($users as $user): ?>
		<div class="user-card-wrapper">
			<div class="user-card round" data-id="<?=$user->id;?>">
				<div class="user-info">
					<a href="/<?=$user->mypage_url;?>">
						<img class="user-profile" alt="<?=$user->nickname;?>" src="<?=$user->profile;?>">
					</a>
					<div class="user-point">내공 <strong><?=$user->point;?></strong></div>
				</div>
				<div class="user-details">
					<a href="/<?=$user->mypage_url;?>" class="user-name"><?=$user->nickname;?></a>
					<div class="user-bio"><?=htmlspecialchars($user->bio);?></div>
					<?php if ($user->id != $this->odab_user->get('id')) { if ($user->is_follow) {
						echo '<a data-value="off" class="btn btn-mini btn-user-follow disabled"><i class="fa-icon-ok"></i>팔로잉</a>';
					} else {
						echo '<a data-value="on" class="btn btn-mini btn-success btn-user-follow"><i class="fa-icon-plus"></i>팔로우</a>';
					} } ?>
				</div>
			</div>
		</div>
		<?php endforeach; ?>
		<div class="clearfix"></div>
		<?=$pagination;?>
		<?php else: ?>
		<div class="empty">
			<i class="fa-icon-search"></i><br><br>'<strong><?=$sv?></strong>'에 대한 검색결과가 없습니다.
		</div>
		<?php endif; ?>
	</div>
</div>

<script type="text/javascript">
$(document).ready(function() {
	console.log('<?=$pagination;?>');
	$(".btn-user-follow").hover(
		function () {
			if ($(this).attr('data-value') === 'on') { $(this).html('<i class="fa-icon-plus-sign"></i>팔로우'); } else { $(this).html('<i class="fa-icon-remove-sign"></i>언팔로우'); }
		}, function () {
			if ($(this).attr('data-value') === 'on') { $(this).html('<i class="fa-icon-plus"></i>팔로우'); } else { $(this).html('<i class="fa-icon-ok"></i>팔로잉'); }
		}
	);
	$(document)
	.on('click', '.btn-user-follow', function(e) {
		var self = $(this);
		$.ajax({
			type:"POST", url:'/mypage/follow',
			data:{ 'target_id':self.parent().parent().data('id'), 'status': self.attr('data-value'), 'url':'ranking' },
			success: function(response) {
				if (response.result) {
					if (self.attr('data-value') === 'on') {
						self.attr('data-value', 'off');
						self.html('<i class="fa-icon-ok"></i>팔로잉');
						self.addClass('disabled').removeClass('btn-success');
					} else {
						self.attr('data-value', 'on');
						self.html('<i class="fa-icon-plus"></i>팔로우');
						self.removeClass('disabled').addClass('btn-success');
					}
				} else {
					if (response.is_login) {
						$.ajax({
							type: "GET", url: response.return_url, data: {  },
							success	: function (data) {
								$.fancybox(data, { afterShow: function() { $('input#email').focus(); } });
							}
						});
					} else {
						bootbox.dialog(response.message, [{ "label" : "확인", "class" : "btn-danger" }]);
						return;
					}
				}
			}
		});
		return;
	})
	.on('click', '.btn-order', function(e) {
		window.location.href = '/ranking?s='+$('#user-search-form .search-query').val()+'&o='+$(this).data('sort')+'&p=1';
	});
	
	$('#user-search-form').submit(function(e) {
		e.preventDefault();
		window.location.href = '/ranking?s='+$('#user-search-form .search-query').val()+'&o='+$('.btn-order.active').data('sort')+'&p=1';
		e.stopPropagation();
	});
});
</script>

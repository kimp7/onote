<div id="content">
	<div class="row-fluid">
		<div id="user-box" class="box user-box">
			<div class="box-content">
				<div class="row-fluid">
					<div class="user-box-info">
						<div class="user-profile-wrapper">
							<img src="<?=$user->profile;?>" class="user-profile">
						</div>
						<div class="item-point">내공 <span class="count"><?=$user->point;?></span></div>
					</div>
					<div class="user-box-meta">
						<div class="well">
							<div class="item-visit"><span class="count"><?=$user->visit_count;?></span> 회 방문</div>
							<hr style="height:1px; margin:1px 0; padding:0px; background: linear-gradient(to right, #aaa 0%, #ddd 50%, #fff 100%);">
							<div class="item-answer"><span class="count"><?=$user->meta['answer_count'];?></span> 개 답변</div>
							<hr style="height:1px; margin:1px 0; padding:0px; background: linear-gradient(to right, #aaa 0%, #ddd 50%, #fff 100%);">
							<div class="item-follow"><span class="count"><?=$user->meta['follow'];?></span> 팔로워</div>
						</div>
					</div>
					<div class="user-box-data">
						<div class="item-user">
							<span id="username" class="item-name" data-id="<?=$user->id;?>" data-url="<?=$user->mypage_url;?>"><?=$user->nickname;?></span>,
							<span class="item-bio"><?=$user->bio;?></span>
						</div>
						<div class="item-desc">
						<?php if( empty($user->meta['description']) || $user->meta['description'] == '') {
							echo '안녕하세요^^<br>유용한 오답노트 많이 공유해요~';
						} else {
							echo nl2br($user->meta['description']);
						} ?>
						</div>
						<?php if ( empty($user->meta['facebook_link']) || $user->meta['facebook_link'] == '') {
							echo '<div class="user-facebook"></div>';
						} else {
							echo '<a href="http://fb.com/'.$user->meta['facebook_link'].'" target="_blank"><div class="user-facebook active"></div></a>';
						} ?>
						<?php if ($user->id == $this->odab_user->get('id')): ?>
							<i class="fa-icon-pencil btn-user-edit"></i>
						<?php else: ?>
							<?php if ($user->meta['is_follow']) {
								echo '<button type="button" data-value="off" class="btn btn-user-follow btn-owner-follow disabled"><i class="fa-icon-ok"></i>팔로잉</button>';
							} else {
								echo '<button type="button" data-value="on" class="btn btn-success btn-user-follow btn-owner-follow"><i class="fa-icon-plus"></i>팔로우</button>';
							} ?>
						<?php endif; ?>
					</div>
				</div><!--/row -->
			</div>
		</div>
		<div id="userdata-box" class="box userdata-box">
			<div class="box-content">
				<div class="row-fluid">
					<ul class="nav nav-tabs nav-mypage">
						<li class="mypage-title"></li>
						<li><a href="#follows" class="follows" data-toggle="tab" data-load="n" title="팔로잉 상태를 확인할 수 있습니다">팔로워</a></li>
						<li><a href="#answers" class="answers" data-toggle="tab" data-load="n" title="답변 내역을 확인할 수 있습니다">답변</a></li>
						<li><a href="#tags" class="tags" data-toggle="tab" data-load="n" title="관심 등록한 태그를 확인할 수 있습니다">태그</a></li>
						<li><a href="#notes" class="notes" data-toggle="tab" data-load="n" title="직접 만들거나 즐겨찾기 한 오답노트를 확인할 수 있습니다">오답노트</a></li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane" id="notes"></div>
						<div class="tab-pane" id="tags"></div>
						<div class="tab-pane" id="answers"></div>
						<div class="tab-pane" id="follows"></div>
					</div>
					<div id="loading"></div>
				</div>
			</div>
		</div>
	</div>
</div>
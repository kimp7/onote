<div class="single-container <?php echo ($q->passage_array) ? 'ext' : ''; ?>">
	<input type="hidden" class="share-url" />
	<div id="single-wrapper" class="single-wrapper">
		<?php if ($q->passage_array): ?>
		<div class="single-ext">
			<?php foreach($q->passages as $p): ?>
				<img src="<?=$p->img;?>" alt="passage" />
			<?php endforeach; ?>
		</div>
		<?php endif; ?>
		<div class="single" data-id="<?=$q->id;?>">
			<?php if (count($q->tags) > 0): ?>
			<div class="tag-container">
			<?php foreach ($q->tags as $t): ?>
				<a href="/questions/tagging/<?=$q->subject_name;?>/<?=$t->name;?>"><span class="label label-tag"><?=$t->name;?></span></a>
			<?php endforeach; ?>
			</div>
			<?php endif; ?>
			<img src="<?=$q->img;?>" class="q_img" alt="question" />
			<div class="single-report">
				<?php if ($q->report) echo '<span class="">나의답 '.get_circled_number($q->report).'</span> | '; ?>
				<span class="">정답 <?=get_circled_number($q->correct);?></span>
			</div>
			<div class="single-extend">
				<span class="">문제 공유하기</span>
				<div class="single-share">
					<a href="#" class="fb" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=<?=urldecode(current_url());?>', 'facebook-share-dialog', 'width=626,height=436'); return false;">Share on Facebook</a>
					<a href="#" class="tw" onclick="window.open('https://twitter.com/share?url=<?=urldecode(current_url());?>', 'twitter-share-dialog', 'width=500,height=220'); return false;">Share on Twitter</a>
					<a href="https://plus.google.com/share?url=<?=urlencode(current_url());?>" class="gp" onclick="window.open(this.href, 'google-plus-share-dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=500'); return false;"></a>
				</div>
				<input type="text" class="single-url" value="<?=urldecode(current_url());?>">
			</div>
		</div>
		<div class="answer-container">
			<div class="answer-count"><?=count($answers);?>개의 해설이 있습니다</div>
			<div id="editor-wrapper" class="editor-wrapper round-small">
				<?php if ($user): ?>
				<div class="editor-meta">
					<img class="user-profile answer-item-profile" src="<?=$user->profile;?>" />
					<a data-id="<?=$user->id;?>" href="/<?=$user->mypage_url?>" class="answer-item-nick"><?=$user->nickname?></a>
					<span class="rep">,</span>
					<span class="answer-item-userbio"><?=$user->bio;?></span>
				</div>
				<div class="editor-frame">자신만의 풀이를 작성해서 공유해보세요!</div>
				<div class="editor-content hidden">
					<div class="editor-footer">
						<select class="answer-types">
						<?php foreach($answer_type as $k => $v) {
							echo '<option class="answer-type" data-type="'.$k.'">'.$v.'</option>';
						}?>
						</select>
						<button type="button" class="btn btn-seablue btn-add-answer">해설 올리기</button>
					</div>
				</div>
				<?php else: ?>
				<div class="editor-frame-login">자신만의 풀이를 작성해서 공유해보세요!</div>
				<?php endif; ?>
			</div>
			<div id="answer-wrapper" class="answer-wrapper">
			<?php if (count($answers) > 0): ?>
				<?php foreach($answers as $answer): ?>
				<div data-id="<?=$answer->id;?>" class="answer-item">
					<div class="answer-item-header">
						<div class="answer-item-user">
							<img class="answer-item-profile user-profile" src="<?=$answer->profile;?>" alt="profile-image">
							<a data-id="<?=$answer->user_id;?>" href="/<?=$answer->mypage;?>" class="answer-item-nick"><?=$answer->nickname;?></a>
							<span class="rep">,</span>
							<span class="answer-item-userbio"><?=$answer->bio;?></span>
						</div>
						<div class="answer-item-info round-small">
							<div class="type"><?=$answer->answer_type;?></div>
							<div class="vote <?php echo ($answer->vote['my'] === 'up') ? 'on' : ''; ?>" data-status="up">
								<i class="fa-icon-thumbs-up"></i> <span class="answer-vote-count"><?=$answer->cnt;?></span>
							</div>
						</div>
					</div>
					<div class="answer-item-content">
						<?=$answer->data;?>
					</div>
					<div class="answer-item-meta">
						<span class="comments">댓글 <span class="comments-count"><?=$answer->comments;?></span> <i class="fa-icon-caret-down"></i></span><span class="divider">|</span><span class="accuse">신고</span><span class="divider">|</span>
						<span class="date"><?=$answer->date;?></span>
						<?php if ($user && $user->id === $answer->user_id): ?>
						<div class="answer-toolbar hidden"><span class="divider">|</span><span class="answer-edit">수정</span>/<span class="answer-delete">삭제</span></div>
						<?php endif; ?>
					</div>
					<div class="comments-wrapper"></div>
				</div>
				<?php endforeach; ?>
			<?php else: ?>
				<div class="empty">
					<span class="title">아직 등록된 해설이 없습니다.</span><br><br>첫 해설을 등록하고 내공 10점 받으세요
				</div>
			<?php endif; ?>
			</div>
		</div>
	</div>
	<div class="clearfix"></div>
</div>
<script type="text/javascript" src="/static/js/single.js"></script>

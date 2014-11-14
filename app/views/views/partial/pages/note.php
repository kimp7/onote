<div id="content" class="note-container">
	<div class="row-fluid">
		
		<div class="note-stats-bar hidden">
			<ul class="note-stats">
				<li class="note-stat-item">
					<a href="/note"><i class="halflings-icon home"></i></a>
					<!--<i class="glyphicons-icon home" style="margin-top:-8px; margin-left:-8px; width:40px;"></i>-->
				</li>
				<li class="note-stat-item">
					<strong><?php echo $status['note']; ?></strong> 개의 노트에 <strong><?php echo $status['question']; ?></strong> 문제가 있습니다.
				</li>
			</ul>
			<ul class="note-bar-create">
				<li class="note-stat-item">
					<a href="/note/create" class="btn btn-seablue btn-note-create" data-fancybox-type="ajax">
						<i class="fa-icon-plus"></i> 새노트 만들기
					</a>
				</li>
			</ul>
		</div>
		<div class="note-wrapper">
			<div></div>
		</div>
		<div class="empty hidden">
			<p class="title">아직 오답노트가 없습니다</p>
			<h2>나만의 오답노트를 만들어 다시 풀어보고 싶은 문제를 저장하세요</h2><br>
			<a href="/note/create" class="fancybox.ajax gnb-login">
				<button class="btn btn-seablue"><i class="fa-icon-plus"></i> 노트 만들기</button>
			</a>
		</div>
		
	</div>
</div>

<div id="sidebar-left">
	<div class="nav-collapse sidebar-nav">
		<ul class="nav nav-tabs nav-stacked main-menu">
			<li id="note" class="">
				<a href="/note">
					<i class="fa-icon-book"></i>
					<span> 오답노트</span>
				</a>
			</li>
			<!--<li id="study">
				<a href="/study"><i class="fa-icon-hdd"></i><span> 공부하기</span></a>
			</li>-->
			<li id="grading">
				<a href="/grading">
					<i class="fa-icon-ok"></i>
					<span> 채점하기</span>
				</a>
			</li>
			<li id="report">
				<a href="/report">
					<i class="fa-icon-bar-chart"></i>
					<span> 성적표</span>
				</a>
			</li>
			<li id="ranking">
				<a href="/ranking">
					<i class="fa-icon-group"></i>
					<span> 랭킹</span>
				</a>
			</li>
			<li id="setting">
				<a href="/setting">
					<i class="fa-icon-cog"></i>
					<span> 설정</span>
				</a>
			</li>
		</ul>
	</div>
</div>

<script type="text/javascript">
	var selected = window.location.pathname.split('/')[1];
	if ( $.inArray( selected, ['note', 'study', 'grading', 'report', 'ranking', 'setting'] ) != -1 ) {
		$('.main-menu #'+selected).addClass('active');
	}
	// if (['note', 'study', 'grading', 'report', 'ranking', 'setting'].indexOf(selected) != '-1') {
		// document.querySelector('li#'+selected).classList.add('active');
	// }
</script>

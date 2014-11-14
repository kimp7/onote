<!DOCTYPE html>
<html lang="ko-KR" class="no-js">
	<head>
		<meta charset="utf-8">
		<title>오답노트 관리자</title>
		<link rel="shortcut icon" href="http://www.odab.net/static/favicon.ico" type="image/x-icon" />
		<!-- Bootstrap -->
		<link href="/static/vendor/admin/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="/static/vendor/admin/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
		<link href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" rel="stylesheet">
		<link href="/static/vendor/admin/vendors/easypiechart/jquery.easy-pie-chart.css" rel="stylesheet" media="screen">
		<link href="/static/vendor/admin/assets/styles.css" rel="stylesheet" media="screen">
		<link href="/static/vendor/fancybox/source/jquery.fancybox.css" rel="stylesheet">
		<link href="/static/vendor/taghandler/css/jquery.taghandler.css" rel="stylesheet">
		<link href="/static/css/admin.css" rel="stylesheet" media="screen">
		<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<script src="/static/vendor/admin/vendors/modernizr-2.6.2-respond-1.1.0.min.js"></script>
		<script src="/static/vendor/jquery/jquery-1.10.1.min.js"></script>
	</head>
	<body>
		<!-- s: topNavigation -->
		<div class="navbar navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container-fluid">
					<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</a>
					<a class="brand" href="/admin">Odabnote Backend System</a>
					<div class="nav-collapse collapse">
						<ul class="nav pull-right">
							<li class="dropdown">
								<a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"> <i class="icon-user"></i> 관리자 <i class="caret"></i></a>
								<ul class="dropdown-menu">
									<li><a tabindex="-1" href="/">홈으로 이동</a></li>
									<li><a tabindex="-1" href="/logout">로그아웃</a></li>
								</ul>
							</li>
						</ul>
						<ul class="nav">
							<li class="active">
								<a href="#">Dashboard</a>
							</li>
							<li class="dropdown">
								<a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
									Sample <i class="caret"></i>
								</a>
								<ul class="dropdown-menu">
									<li>
										<a tabindex="-1" href="/admin/sample/buttons">Button & Icon</a>
									</li>
									<li>
										<a tabindex="-1" href="/admin/sample/interface">UI & Interface</a>
									</li>
									<li class="divider"></li>
									<li>
										<a tabindex="-1" href="/admin/sample/calendar">Calendar</a>
									</li>
									<li>
										<a tabindex="-1" href="/admin/sample/stats">Statistics</a>
									</li>
								</ul>
							</li>
							<li class="dropdown">
								<a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
									Users <i class="caret"></i>
								</a>
								<ul class="dropdown-menu">
									<li>
										<a tabindex="-1" href="#">User List</a>
									</li>
									<li>
										<a tabindex="-1" href="#">Search</a>
									</li>
									<li>
										<a tabindex="-1" href="#">Permissions</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- e: topNavigation -->

<script type="text/javascript">
$(function() {
	var uri = window.location.pathname;
	var current = uri.split("/");
	if (current[2]) {
		$('ul.sidebar').find('li#'+current[2]).addClass('active');
	} else {
		$('ul.sidebar').find('li:first').addClass('active');
	}
});
</script>

		<div class="container-fluid">
			<div class="row-fluid">
				
				<?php echo $partial_sidebar; ?>
				
				<?php echo $partial_content; ?>
				
			</div>
			<hr>
			<footer>
				<p>&copy; 오답노트 관리자 2013</p>
			</footer>
		</div>
		
		<script src="/static/vendor/admin/vendors/jquery-1.9.1.min.js"></script>
		<script src="/static/vendor/jquery/jquery-ui.min.js"></script>
		<script src="/static/vendor/admin/bootstrap/js/bootstrap.min.js"></script>
		<script src="/static/vendor/fancybox/source/jquery.fancybox.pack.js"></script>
		<script src="/static/vendor/admin/vendors/easypiechart/jquery.easy-pie-chart.js"></script>
		<script src="/static/vendor/admin/assets/scripts.js"></script>
		<script src="/static/vendor/bootbox.min.js"></script>
		<script src="/static/vendor/taghandler/js/jquery.taghandler.js"></script>
		<script>
		$(function() {
			// Easy pie charts
			$('.chart').easyPieChart({animate: 1000});
		});
		</script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.4.5/bootstrap-editable/js/bootstrap-editable.min.js"></script>
		<script src="/static/vendor/admin/vendors/select2.js"></script>
		
	</body>
</html>
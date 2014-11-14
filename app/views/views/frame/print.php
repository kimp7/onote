<!DOCTYPE html>
<html lang="ko-KR">
<head>
	<meta charset="utf-8">
	<title>오답노트 > 인쇄</title>
	<meta name="keywords" content="오답,오답노트,odab,ohdab,odabnote">
	<meta name="description" content="오답노트">
	<link rel="shortcut icon" href="http://www.odab.net/static/favicon.ico" type="image/x-icon" />
	<style>
.print-wrapper			{  }
.page					{ position:relative; width: 19cm; min-height: 27.7cm; padding:1cm; }
.print-header			{ width:100%; margin:0; height:1cm; line-height:1cm; text-align:center; font-size:18px; font-weight:bold; border-bottom:1px solid #000; }
.divider				{ position:absolute; left:50%; top:2cm; height:25.7cm; border-left:1px solid #000; }
.print-column			{ width:44%; text-align:center; height:24.7cm; overflow:hidden; }
.print-column.left		{ float:left; padding:0.5cm 4% 0.5cm 2%; }
.print-column.right		{ float:right; padding:0.5cm 2% 0.5cm 4%; }
.print-column .item		{ position:relative; margin-bottom:40px; }
.print-column img		{ width:100%; }
.print-column .meta		{ border:1px dotted #777; padding:3px; font-size:12px; margin-bottom:10px; }
.print-column .answer	{ margin:20px 0 0 0; border:1px solid #ccc; padding:10px; font-size:12px; }
.print-column .answer p { margin:0; }
.print-footer			{ position:absolute; bottom:1cm; width:19cm; margin:0; height:1cm; line-height:1cm; font-size:13px; border-top:1px solid #000; }
.print-footer .pagenum	{ position:absolute; width:30px; left:50%; margin-left:-15px; text-align:center; }
.print-footer .left		{ float:left; }
.print-footer .right	{ float:right; }

@page {
	size: A4;
	margin: 0;
}
@media print {
	body		{ margin:0; padding:0; }
	.page		{ page-break-after: always; }
}
	</style>
</head>
<body>
	<!-- s: content -->
	<?php echo $partial_content; ?>
	<!-- e: content -->
	<div class="clearfix"></div>
</body>
</html>

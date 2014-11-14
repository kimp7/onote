<div class="tagmap-mask"></div>
<div class="tagmap-wrapper">
	<div class="tagmap-selector">
		<select class="" name="subjects">
			<?php foreach($subjects as $subject) : ?>
				<option data-id="<?=$subject->id;?>" value="<?=$subject->slug;?>"><?php echo $subject->name; ?></option>
			<?php endforeach; ?>
		</select>
		<!--<span>* 현재 정리된 과목 : 경제, 세계사, 사회문화, 윤리와사상, 한국사, 한국지리</span>-->
	</div>
	<table class="table table-condensed tagmap-table">
		<tbody></tbody>
	</table>
</div>
<div class="tagmap-msg round">
	<span style="font-size:24px;">태그맵은 현재 콘텐츠 감수 진행중입니다.</span>
	<div style="margin-top:20px;">수험생 여러분께 정확한 콘텐츠를 제공하기 위해<br>여러 선생님들께서 태그맵을 검토해주고 계세요.</div>
</div>
<script type="text/javascript">
$(document).ready(function() {
	$('select').on('change', function (e) {
		$('tbody').empty();
		var selected = '/static/tagmap/'+$('option:selected').val()+'.json';
		$.getJSON(selected, {}, function(json_data) {
			$.each(json_data, function(index, item){
				var row = document.createElement('tr');
				var content = document.createElement('td');
				$.each(item, function(i, d) {
					if ( i <= 2 ) {
						if (d) $(row).append('<td>'+d+'</td>');
						else $(row).append('<td></td>');
					} else {
						if (d) $(content).append('<label class="label label-tag">'+d+'</label>');
					}
				});
				$(row).append(content);
				$('tbody').append(row);
			});
			$.fancybox.update();
		});
	});
	$("select").val("EC").trigger('change');
	
	$(document).on('click', '.label-tag', function(e) {
		//window.location.href = '/questions/tagged_by_slug/'+$('option:selected').val()+'/'+($(this).text()).replace(/ /g, '-');
		window.location.href = '/questions/tagging/'+$('option:selected').text()+'/'+($(this).text()).replace(/ /g, '-');
	});
});
</script>
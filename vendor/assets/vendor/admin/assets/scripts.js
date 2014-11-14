$(function() {
	// Side Bar Toggle
	$('.hide-sidebar').click(function() {
		$('#sidebar').hide('fast', function() {
			$('#content').removeClass('span10').addClass('span12');
			$('.hide-sidebar').hide();
			$('.show-sidebar').show();
		});
	});
	$('.show-sidebar').click(function() {
		$('#content').removeClass('span12').addClass('span10');
		$('.show-sidebar').hide();
		$('.hide-sidebar').show();
		$('#sidebar').show('fast');
	});
	
	$(document)
	.on("click", ".btn-add-metadata-field", function(e) {
		var addFieldName = $('input.addFieldName').val();
		var addFieldKey = $('input.addFieldKey').val();
		if (!addFieldName || !addFieldKey) {
			alert('올바른 값을 입력하세요');
			return;
		}
		$.ajax({
			type	: "POST",
			url		: "/admin/user_metadata_fields",
			data	: { 'name': addFieldName, 'key': addFieldKey },
			success	: function(res) {
				if (res) location.reload();
				else alert('실패'); return;
			}
		});
		return false;
	});
});
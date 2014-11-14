<div class="demo">
    <div class="bbody">
        <form id="upload_form" enctype="multipart/form-data" method="post" action="/setting/profile" >
            <input type="hidden" id="x1" name="x1" />
            <input type="hidden" id="y1" name="y1" />
            <input type="hidden" id="w" name="w" />
            <input type="hidden" id="h" name="h" />
			
            <h3>1. 프로필 사진을 업로드 하세요.</h3>
            <span style="color:#555;">jpg, png 형식의 파일만 가능합니다.</span>
            <div style="margin-top:10px;">
            	<input type="file" id="image_file" name="image_file" class="filestyle" data-classButton="btn" data-input="false" onchange="fileSelectHandler()" />
            </div>
			
            <div class="jcrop-error"></div>
			
            <div class="step2">
                <h3>2. 알맞은 영역을 선택하세요.</h3>
                <img id="preview" />
                <div class="jcrop-error s2"></div>
                <div style="margin-top:15px;">
                	<input type="button" class="btn btn-cancel" value="취소" onclick="$.fancybox.close(true);" />
					<input type="submit" class="btn btn-primary btn-upload-profile" value="저장" />
                </div>
            </div>
        </form>
        <!--
        <iframe id="upload_target" name="upload_target" src="#" style="width:0;height:0;border:0px solid #fff;"></iframe>
        -->
    </div>
</div>

<script src="/static/vendor/bootstrap-filestyle.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$('.btn-upload-profile').click(function(e) {
		e.preventDefault();
		if (parseInt($('#w').val())) {
			$('form#upload_form').submit();
		} else {
			$('.jcrop-error.s2').html('영역을 먼저 선택해주세요').show();
			return false;
		}
		e.stopPropagation();
	});
	
	var options = {
		beforeSend: function() {},
		uploadProgress: function(event, position, total, percentComplete) {},
		success: function() {},
		complete: function(response) {
			console.log('upload complete : ', response.responseJSON);
			if (response.responseJSON.result) {
				$('img.user-profile').attr('src', response.responseJSON.data).attr('data-change', 'Y');
				$.fancybox.close(true);
				return;
			} else {
				alert(response.responseJSON.message);
				return false;
			}
		},
		error: function() {
			//$("#message").html("<font color='red'> ERROR: unable to upload files</font>");
		}
	};
	$('form#upload_form').ajaxForm(options);
});
</script>


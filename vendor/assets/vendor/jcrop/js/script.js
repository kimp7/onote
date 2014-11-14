// convert bytes into friendly format
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

// update info by cropping (onChange and onSelect events handler)
function updateInfo(e) {
    $('#x1').val(e.x);
    $('#y1').val(e.y);
    $('#w').val(e.w);
    $('#h').val(e.h);
};

function clearInfo() {
    $('#w').val('');
    $('#h').val('');
};

function fileSelectHandler() {
    var oFile = $('#image_file')[0].files[0];
    console.log(oFile);
    $('.jcrop-error').hide();
    var rFilter = /^(image\/jpeg|image\/png)$/i;
    var msg = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">×</button><strong>{error_msg}</strong></div>'
    if (! rFilter.test(oFile.type)) {
    	// 'Please select a valid image file (jpg and png are allowed)'
        $('.jcrop-error').html('jpg, png 파일을 업로드 하세요.').show();
        return;
    }
    if (oFile.size > 1024 * 1024) {
    	// 'You have selected too big file, please select a one smaller image file'
        $('.jcrop-error').html('파일 크기가 너무 큽니다. 좀 더 작은 이미지를 선택하세요.').show();
        return;
    }
    // preview element
    var oImage = document.getElementById('preview');
    // prepare HTML5 FileReader
    var oReader = new FileReader();
        oReader.onload = function(e) {
        // e.target.result contains the DataURL which we can use as a source of the image
        oImage.src = e.target.result;
        oImage.onload = function () { // onload event handler
            // display step 2
            $('.step2').fadeIn(500);
            // display some basic image info
            var sResultFileSize = bytesToSize(oFile.size);
            // Create variables (in this scope) to hold the Jcrop API and image size
            var jcrop_api, boundx, boundy;
            if (typeof jcrop_api != 'undefined') 
                jcrop_api.destroy();
            // initialize Jcrop
            $('#preview').Jcrop({
            	setSelect: [ 0, 0, 100, 100 ],
                minSize: [100, 100],
                aspectRatio : 1,
                bgFade: true,
                bgOpacity: .3,
                onChange: updateInfo,
                onSelect: updateInfo,
                onRelease: clearInfo
            }, function(){
                // use the Jcrop API to get the real image size
                var bounds = this.getBounds();
                boundx = bounds[0];
                boundy = bounds[1];
                // Store the Jcrop API in the jcrop_api variable
                jcrop_api = this;
            });
        };
    };
    // read selected file as DataURL
    oReader.readAsDataURL(oFile);
}
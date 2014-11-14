$(document).ready(function() {
	/* fancybox setup */
	$.fancybox.defaults.beforeShow = function () {
		$.fancybox.wrap.bind("contextmenu", function (e) { // Disable right click
			return true; //return false;
		});
	}
	$.fancybox.defaults.afterShow = function() {
		if($('div.fancybox-inner').css('overflow') == 'auto') {
			$('div.fancybox-inner').css('overflow-x', 'hidden');
		}
	}
	/* header profile dropdown */
	$('ul.nav li.dropdown').hover(function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(400);
	}, function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(400);
	});
	/* global search autocomplete */
	$.widget( "custom.catcomplete", $.ui.autocomplete, {
		_renderMenu: function( ul, items ) {
			var that = this, currentCategory = "";
			$.each( items, function( index, item ) {
				if ( item.category != currentCategory ) {
					ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
					currentCategory = item.category;
				}
				that._renderItemData( ul, item );
			});
		}
	});
	$.getJSON('/static/tags.json', function(data) {
		tags_array = new Array();
		$.each(data, function(k, v) {
			tags_array.push(v);
		});
		$('#global-search .search-query').catcomplete({
			delay : 500,
			minLength: 1,
			source: tags_array,
			focus: function( event, ui ) { return false; },
			select: function( event, ui ) {
				$('#global-search .search-query').val( ui.item.label );
				$('#global-search .search-tagid').val( ui.item.id );
				$('#global-search .search-subject').val( ui.item.category );
				window.location.href = '/questions/tagging/'+$('#global-search .search-subject').val()+'/'+($('#global-search .search-query').val()).replace(/ /g, '-');
				return false;
			},
			open: function( event, ui ) { $('.ui-menu-item a').removeClass('ui-corner-all'); }
		});
	});
	$('#global-search').submit(function(e) {
		e.preventDefault();
		if ($('#global-search .search-tagid').val() == '') { $('#global-search .search-tagid').val(''); }
		if ($('#global-search .search-subject').val() == '') { $('#global-search .search-subject').val('-'); }
		window.location.href = '/questions/tagging/'+$('#global-search .search-subject').val()+'/'+($('#global-search .search-query').val()).replace(/ /g, '-');
		e.stopPropagation();
	});
	/* tooltip setup */
	$('.btn-tagmap').qtip({
		content: { text: '각 과목별 태그맵에서 공부할 범위를 한눈에 확인해보세요' },
		position: { my: 'right center', at: 'left center' },
		style: { classes: 'qtip-dark qtip-shadow qtip-rounded' }
	});
	$('.reset-password').qtip({
		content: { text: '비밀번호를 잊으셨나요?' },
		position: { my: 'bottom center', at: 'top center' },
		style: { classes: 'qtip-light qtip-shadow qtip-rounded' }
	});
	/* event setup */
	$(document)
	.on('click', '#herobox .close', function(e) {
		setCookie('odab_herobox', Math.random().toString(36).substring(2));
		$('#herobox').slideUp(400, function() {
			$(this).remove();
		});
	})
	.on('mouseenter', '.label-tag', function(e) {  })
	.on('mouseleave', '.label-tag', function(e) {  })
	.on('click', '.tag-follow', function(e) {
		e.preventDefault();
		var self = $(this);
		$.ajax({
			type: "POST", url: '/tag/follow',
			data: { 'id': self.data('id'), 'status': self.attr('data-value'), 'return_url': window.location.pathname },
			success: function(response) {
				if (response.result) {
					var cnt = self.next('.count').text();
					if (self.attr('data-value') == 'on') {
						self.attr('data-value', 'off').removeClass('active').next('.count').text(parseInt(cnt)-1);
					} else {
						self.attr('data-value', 'on').addClass('active').next('.count').text(parseInt(cnt)+1);
					}
				} else {
					if (response.is_login) {
						$.ajax({
							type: "GET", url: response.return_url, data: {  },
							success	: function (data) {
								$.fancybox(data, { afterShow: function() { $('input#email').focus(); } });
							}
						});
					} else {
						bootbox.dialog(response.message, [{
							"label" : "확인",
							"class" : "btn-danger"
						}]);
						return;
					}
				}
			}
		});
		e.stopPropagation();
	})
	.on('click', 'a.gnb-login', function(e) {
		e.preventDefault();
		$.ajax({
			type: "GET", url: this.href, data: {  },
			success	: function (data) {
				$.fancybox(data, {
					openEffect:'none',
					closeEffect:'none',
					afterShow: function() { $('input#email').focus(); }
				});
				$('.reset-password').qtip({
					content: { text: '비밀번호를 잊으셨나요?' },
					position: { my: 'bottom center', at: 'top center' },
					style: { classes: 'qtip-light qtip-shadow qtip-rounded' }
				});
			}
		});
		e.stopPropagation();
	})
	.on('click', '.reset-password', function(e) {
		e.preventDefault();
		bootbox.prompt('비밀번호 변경을 위해 사용중인 이메일을 입력해주세요.<br><small>이메일 주소를 잊어버린 경우엔 <a href="mailto:help@odab.net">help@odab.net</a>으로 문의주세요.</small>', "취소", "비밀번호 찾기", function(result) {
			if (result != null) {
				
			}
		});
		e.stopPropagation();
	})
	.on('click', '.view-single', function(e) {
		e.preventDefault();
		e.stopPropagation();
	})
	.on('click', '.btn-tagmap', function(e) {
		e.preventDefault();
		$.ajax({
			type:"GET", url:'/tag/map', data:{},
			success: function(data) {
				$.fancybox(data, {
					fitToView: true,
					openEffect:'none',
					closeEffect:'none',
					beforeShow: function() {
						$('.fancybox-skin').css({'padding':'5px', 'background-color':'#fff'});
					}
				});
			}
		});
		e.stopPropagation();
	})
	.on('click', '.btn-switch', function(e) {
		if (!$(this).hasClass('active')) {
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
		}
	});
	
	$('.view-single').fancybox({
		helpers: {
			overlay : {
				closeClick : false,
				showEarly  : false,
				css        : {},
				locked     : true
			},
			title : {
				type : 'float' // 'float', 'inside', 'outside' or 'over'
			} /*,thumbs : { width: 50, height: 50, position: 'bottom' }*/
		},
		keys: {
			next : {
				34 : 'up',   // page down
				39 : 'left' // right arrow
				//40 : 'up'    // down arrow
			},
			prev : {
				33 : 'down',   // page up
				37 : 'right'  // left arrow
				//38 : 'down'    // up arrow
			},
			//play   : [32], // space - start/stop slideshow
			//toggle : [70],  // letter "f" - toggle fullscreen
			close  : [27] // escape key
		},
		loop : false,
		nextEffect: 'none',
		prevEffect: 'none',
		margin: [20, 60, 20, 60],
		autoCenter: false,
		tpl: {
			next: '<a class="fancybox-nav fancybox-next"><span></span></a>',
			prev: '<a class="fancybox-nav fancybox-prev"><span></span></a>',
			closeBtn: '<a class="fancybox-item fancybox-close" href="javascript:;"></a>'
		},
		beforeShow: function() {
			console.log('beforeShow', this.href);
			this.skin.css("background-color", "#fff");
			$('.fancybox-wrap').addClass('fancybox-single');
			this.title = $(this.element).parent().data('title');
		},
		afterShow: function() {
			//$('.nav-single li:first').addClass('active');
			$('.fancybox-title-float-wrap').css({
				"bottom": "auto",
				"margin-bottom": 0,
				"top": 0,
				"margin-top": "-40px"
			});
			$('.fancybox-title-float-wrap .child').css({
				"font-size": "14px",
				"background": "#888",
				"border": "2px solid #666",
				"text-shadow": "none"
			});
			$('.fancybox-overlay').click(function(e) { e.stopPropagation(); });
			$('.single-wrapper').imagesLoaded( function() {
				$('.fancybox-wrap').css({"top": "140px", "bottom": "auto"});
			});
			$('.fancybox-next, .fancybox-prev, .fancybox-close').qtip({
				content: { text: '<strong>키보드 방향키로 앞/뒤 문제를 확인하세요</strong> (창닫기=ESC)' },
				position: { target:$('.fancybox-title span'), my: 'center left', at: 'center right' },
				style: { classes: 'qtip-light qtip-shadow qtip-rounded' }
				//show: { ready: true }
			});
			$('.answer-vote').qtip({
				content: { text: function(api) {
					var tooltip = null;
					if ($(this).hasClass('active')) {
						tooltip = ($(this).data('status') === 'up') ? '추천되었습니다' : '비추천되었습니다';
					} else {
						tooltip = ($(this).data('status') === 'up') ? '추천합니다' : '비추천합니다';
					}
					return tooltip;
				} },
				position: { my:'right center', at:'center left' },
				style: { classes: 'qtip-strong qtip-light qtip-rounded' }
			});
		},
		afterLoad: function(current, previous) {
			//window.location.hash = ((current.href).replace('/questions/', '')).replace(/\//g, '-');
			//this.inner.prepend( '<h1>'+this.href+'</h1>' );
			// var self = this;
			// $.ajax({
				// type: "GET", url: this.href, data: {  },
				// success	: function (data) {
					// self.inner.prepend(data);
				// }
			// });
	        //this.content = '<h1>2. My custom title</h1>' + this.content;
		},
		afterClose: function() {
			//window.location.hash = '';
			//history.pushState('', document.title, window.location.pathname);
		}
	});
	
	/* back to top scroll button */
	$(window).scroll(function(){
		if($(window).scrollTop() < 1000) $('#backToTop').fadeOut();
		else $('#backToTop').fadeIn();
	});
	$('#backToTop').click(function() {
		$('html, body').animate({scrollTop:0}, 100);
	});
});

var get_circled_number = function(input) {
	switch(parseInt(input)) {
		case 1: return '①';
		case 2: return '②';
		case 3: return '③';
		case 4: return '④';
		case 5: return '⑤';
		default: return input;
	}
}

function setCookie (c_name,value,exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null || exdays==0) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie (c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) return unescape(y);
	}
}

function array_search (needle, haystack, argStrict) {
	var key = '';
	for (key in haystack) {
		if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {            
			return key;
		}
	}
	return false;
} 

function print_r (array, return_val) {
	var output = "",pad_char = " ",pad_val = 4,d = this.window.document;
	var getFuncName = function (fn) {
		var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
		if (!name) { return '(Anonymous)'; }
		return name[1];
	};
	var repeat_char = function (len, pad_char) {
		var str = "";
		for (var i = 0; i < len; i++) {	str += pad_char; }
		return str;
	};
	var formatArray = function (obj, cur_depth, pad_val, pad_char) {
		if (cur_depth > 0) { cur_depth++; }
		
		var base_pad = repeat_char(pad_val * cur_depth, pad_char);
		var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
		var str = "";
		
		if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
			str += "Array\n" + base_pad + "(\n";
			for (var key in obj) {                
				if (obj[key] instanceof Array) {
					str += thick_pad + "[" + key + "] => " + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
				} else {
					str += thick_pad + "[" + key + "] => " + obj[key] + "\n";
				}            }
				str += base_pad + ")\n";
		} else if (obj === null || obj === undefined) {
			str = '';
		} else { // for our "resource" class            str = obj.toString();
			
		}
		
		return str;
	};
	output = formatArray(array, 0, pad_val, pad_char);
	
	if (return_val !== true) {
		if (d.body) {            
			this.echo(output);
		} else {
			try {
				d = XULDocument; // We're in XUL, so appending as plain text won't work; trigger an error out of XUL
				this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');            
			} catch (e) {
				this.echo(output); // Outputting as plain text may work in some plain XML
			}
		}
		return true;    
	} else {
		return output;
	}
} 

var Base64 = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode : function (input) {
		var output = "";var chr1, chr2, chr3, enc1, enc2, enc3, enc4;var i = 0;
 		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 			chr1 = input.charCodeAt(i++);chr2 = input.charCodeAt(i++);chr3 = input.charCodeAt(i++);
 			enc1 = chr1 >> 2;enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 			output = output +	this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +	this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 		}
 		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";var chr1, chr2, chr3;var enc1, enc2, enc3, enc4;var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 		while (i < input.length) {
 			enc1 = this._keyStr.indexOf(input.charAt(i++));	enc2 = this._keyStr.indexOf(input.charAt(i++));	enc3 = this._keyStr.indexOf(input.charAt(i++));	enc4 = this._keyStr.indexOf(input.charAt(i++));
 			chr1 = (enc1 << 2) | (enc2 >> 4);	chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);chr3 = ((enc3 & 3) << 6) | enc4;
 			output = output + String.fromCharCode(chr1);
 			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
 
		output = Base64._utf8_decode(output);
		return output;
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 		for (var n = 0; n < string.length; n++) {
 			var c = string.charCodeAt(n);
 			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);	utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);utftext += String.fromCharCode(((c >> 6) & 63) | 128);utftext += String.fromCharCode((c & 63) | 128);
			}
 		}
 		return utftext;
	},
 	
	_utf8_decode : function (utftext) {
		var string = "";var i = 0;var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 			c = utftext.charCodeAt(i);
 			if (c < 128) {
				string += String.fromCharCode(c);	i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);c3 = utftext.charCodeAt(i+2);string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));	i += 3;
			}
 		}
 		return string;
	}
}
<div id="content">
	<div id="signup-wrapper" class="signup-wrapper">
		<h2 class="title">회원가입</h2>
		<form class="signup form-horizontal">
			<fieldset>
				<div class="control-group">
					<label class="control-label" for="user-type">구분</label>
					<div class="controls user-type">
						<label class="radio inline">
							<input type="radio" name="type_code_key" id="type_code_key" value="student" checked />  학생
						</label>
						<label class="radio inline">
							<input type="radio" name="type_code_key" id="type_code_key" value="general" />  일반
						</label>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="email">이메일</label>
					<div class="controls user-email">
						<?php if (isset($userdata['user_email'])): ?>
						<input type="text" id="email" name="email" class="input-signup required" value="<?=$userdata['user_email'];?>" />
						<?php else: ?>
						<input type="text" id="email" name="email" class="input-signup required" />
						<?php endif; ?>
						<span class="error"></span>
						<span class="help-msg">로그인 시 필요하며 외부로 공개되지 않습니다.</span>
					</div>
				</div>
				<?php if (!isset($userdata)): ?>
				<div class="control-group">
					<label class="control-label" for="password">비밀번호</label>
					<div class="controls user-password">
						<input type="password" id="password" name="password" class="input-signup required" />
						<span class="error"></span>
						<span class="help-msg">최소 6자 이상의 안전한 비밀번호를 입력하세요.</span>
					</div>
				</div>
				<?php endif; ?>
				<div class="control-group">
					<label class="control-label" for="profile">프로필 사진</label>
					<div class="controls">
						<div class="user-profile-wrapper">
							<input type="hidden" name="profile" value="" />
							<?php if (isset($userdata['user_profile'])): ?>
							<img class="user-profile" src="<?=$userdata['user_profile'];?>" />
							<?php else: ?>
							<img class="user-profile" src="<?=$no_profile;?>" />
							<?php endif; ?>
							<a href="#" class="btn btn-set-profile" data-fancybox-type="ajax">사진 변경</a>
						</div>
						<span class="profile-helper">권장크기: 160x160<br>최대파일크기: 1MB<br>파일형식: *.jpg, *.png</span>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="nickname">이름</label>
					<div class="controls user-nickname">
						<?php if (isset($userdata['user_name'])): ?>
						<input type="text" id="nickname" name="nickname" class="input-signup required" value="<?=$userdata['user_name'];?>" />
						<?php else: ?>
						<input type="text" id="nickname" name="nickname" class="input-signup required" />
						<?php endif; ?>
						<span class="error"></span>
						<span class="help-msg">실명을 입력하면, 다른 사람들이 찾기가 쉬워집니다.</span>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="bio">한줄 소개</label>
					<div class="controls user-bio">
						<input type="text" id="bio" name="bio" class="required input-signup user-bio" placeholder="" />
						<span class="error"></span>
						<span class="help-msg">20자 이내로 자신을 소개해보세요.</span>
						<?php if (isset($userdata['user_desc'])): ?>
							<input type="hidden" name="description" value="<?=$userdata['user_desc'];?>" />
						<?php else: ?>
							<input type="hidden" name="description" value="" />
						<?php endif; ?>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="mypage">프로필 주소</label>
					<div class="controls user-mypage">
						<label class="plain">odab.net/</label>
						<?php if (isset($userdata['user_mypage'])): ?>
						<input type="hidden" name="facebook_link" value="<?=$userdata['user_mypage'];?>" />
						<input type="text" id="mypage" name="mypage" maxlength="20" class="required input-mypage user-mypage" value="<?=$userdata['user_mypage'];?>" />
						<?php else: ?>
						<input type="hidden" name="facebook_link" value="" />
						<input type="text" id="mypage" name="mypage" maxlength="20" class="required input-mypage user-mypage" />
						<?php endif; ?>
						<span class="error"></span>
						<span class="help-msg">자신의 마이페이지로 연결됩니다.</span>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="subject-option">과목선택</label>
					<div class="controls subject-option">
						<div class="btn-group kor" data-group="subject-korean">
							<?php foreach($subjects['korean'] as $sub) {
								echo '<button type="button" data-id="'.$sub->id.'" data-slug="'.$sub->slug.'" data-value="'.substr($sub->name, -1, 1).'" class="btn btn-signup">'.$sub->name.'</button>';
							} ?>
						</div>
						<span class="error"></span>
					</div>
					<div class="controls subject-option">
						<div class="btn-group mat" data-group="subject-math">
							<?php foreach($subjects['math'] as $sub) {
								echo '<button type="button" data-id="'.$sub->id.'" data-slug="'.$sub->slug.'" data-value="'.substr($sub->name, -1, 1).'" class="btn btn-signup">'.$sub->name.'</button>';
							} ?>
						</div>
						<span class="error"></span>
					</div>
					<div class="controls subject-option">
						<div class="btn-group eng" data-group="subject-english">
							<?php foreach($subjects['english'] as $sub) {
								echo '<button type="button" data-id="'.$sub->id.'" data-slug="'.$sub->slug.'" data-value="'.substr($sub->name, -1, 1).'" class="btn btn-signup">'.$sub->name.'</button>';
							} ?>
						</div>
						<span class="error"></span>
					</div>
					<div class="controls subject-option">
						<div class="btn-group cur" data-group="subject-curriculum">
							<button type="button" class="btn btn-signup btn-curriculum" data-option="natural">과학탐구</button>
							<button type="button" class="btn btn-signup btn-curriculum" data-option="liberal">사회탐구</button>
						</div>
						<div class="error"></div>
						<div class="curriculum" data-option="natural">
							<ul class="nav nav-pills nav-subject">
							<?php $i=0; foreach($subjects['science'] as $sub): if ($i == 4) echo '<br/>'; ?>
								<li class="nav-subject-item">
									<a class="subject-item" data-id="<?=$sub->id?>" data-slug="<?=$sub->slug?>"><?=$sub->name?></a>
								</li>
							<?php $i++; endforeach; ?>
							</ul>
						</div>
						<div class="curriculum" data-option="liberal">
							<ul class="nav nav-pills nav-subject">
							<?php $i=0; foreach($subjects['society'] as $sub): ?>
								<li class="nav-subject-item">
									<a class="subject-item" data-id="<?=$sub->id?>" data-slug="<?=$sub->slug?>"><?=$sub->name?></a>
								</li>
							<?php $i++; endforeach; ?>
							</ul>
						</div>
					</div>
					<input type="hidden" name="subject-korean" value="" />
					<input type="hidden" name="subject-math" value="" />
					<input type="hidden" name="subject-english" value="" />
					<input type="hidden" name="subject-select" value="" />
				</div>
				<div class="control-group">
					<label class="checkbox" style="width:300px; margin:0 auto; margin-bottom:20px;">
						<input type="checkbox" class="btn-agree"> <span><a href="/terms">서비스이용약관</a>과 <a href="/privacy">개인정보취급방침</a>에 동의합니다.</span>
					</label>
					<input type="hidden" name="type" value="<?=$type;?>" />
					<button type="submit" class="btn btn-seablue btn-register">회원가입</button>
					<button type="button" class="btn btn-cancel">취소</button>
				</div>
			</fieldset>
		</form>
	</div>
</div>

<script type="text/javascript">
$(document).ready(function() {
	$(document)
	.on('click', '.btn-signup', function(e) {
		if (!$(this).hasClass('active')) {
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			$('input[name='+$(this).parent().data('group')+']').val($(this).data('slug'));
			if ( $(this).parent().hasClass('kor')
				&& $(this).data('value') == 'B'
				&& ($(this).data('value') == $('.btn-group.mat').find('.active').data('value'))
			) {
				$(this).parent().next().html('<img src="/static/img/invalid.png"> 국어B형과 수학B형을 동시에 선택할 수 없습니다.').show(0).delay(1000).fadeOut(200);
				$(this).removeClass('active');
				$(this).prev().addClass('active');
				$('input[name='+$(this).parent().data('group')+']').val($(this).prev().data('slug'));
			} else if ( $(this).parent().hasClass('mat')
				&& $(this).data('value') == 'B'
				&& ($(this).data('value') == $('.btn-group.kor').find('.active').data('value')) 
			) {
				$(this).parent().next().html('<img src="/static/img/invalid.png"> 국어B형과 수학B형을 동시에 선택할 수 없습니다.').show(0).delay(1000).fadeOut(200);
				$(this).removeClass('active');
				$(this).prev().addClass('active');
				$('input[name='+$(this).parent().data('group')+']').val($(this).prev().data('slug'));
			}
		}
	})
	.on('click', '.btn-curriculum', function(e) {
		var opt = $(this).data('option');
		$('.curriculum').hide().find('.active').removeClass('active');
		$('.curriculum[data-option='+opt+']').show();
	})
	.on('click', '.subject-item', function(e) {
		if ($(this).hasClass('active')) $(this).removeClass('active');
		else $(this).addClass('active');
		
		if ($(this).parent().parent().find('.active').length >= 3) {
			$('.btn-group.cur').next().html('<img src="/static/img/invalid.png"> 최대 2개 과목을 선택할 수 있습니다').show(0).delay(1000).fadeOut(200);
			$(this).removeClass('active');
			return;
		}
	})
	.on('click', '.btn-set-profile', function(e) {
		e.preventDefault();
		$.ajax({
			type: "GET", url: '/setting/profile', data: {},
			success: function(response) {
				$.fancybox(response, {
					fitToView: true,
					openEffect:'none',
					closeEffect:'none',
					afterShow: function() { $('input#email').focus(); } 
				});
			}
		});
		e.stopPropagation();
	})
	.on('click', '.btn-register', function(e) {
		e.preventDefault();
		if (!$('.btn-agree').is(':checked')) {
			bootbox.classes('bootbox-message');
			bootbox.dialog('서비스 이용약관 및 개인정보취급방침을<br>확인 후 동의해 주세요', [{
				"label" : "확인",
				"class" : "btn-warning"
			}]);
			return;
		}
		$('input[name=profile]').val($('.user-profile').attr('src'));
		var selects = [];
		$('.subject-item.active').each(function(i) {
			selects.push($(this).data('slug'));
		});
		if (selects.length == 1 || selects.length == 2) {
			$('input[name=subject-select]').val(selects.join('|'));
		}
		$.ajax({
			type: "POST", url: '/signup', data: $('form.signup').serialize(),
			success: function(response) {
				if (!response.result) {
					if (response.message['email']) { $('.user-email').find('.input-signup').removeClass('valid').addClass('invalid').next().html(response.message['email']); }
					else { $('.user-email').find('.input-signup').removeClass('invalid').addClass('valid').next().empty(); }
					if (response.message['nickname']) { $('.user-nickname').find('.input-signup').removeClass('valid').addClass('invalid').next().html(response.message['nickname']); }
					else { $('.user-nickname').find('.input-signup').removeClass('invalid').addClass('valid').next().empty(); }
					if (response.message['password']) { $('.user-password').find('.input-signup').removeClass('valid').addClass('invalid').next().html(response.message['password']); }
					else { $('.user-password').find('.input-signup').removeClass('invalid').addClass('valid').next().empty(); }
					if (response.message['mypage']) { $('.user-mypage').find('.input-mypage').removeClass('valid').addClass('invalid').next().html(response.message['mypage']); }
					else { $('.user-mypage').find('.input-mypage').removeClass('invalid').addClass('valid').next().empty(); }
					if (response.message['bio']) { $('.user-bio').find('.input-signup').removeClass('valid').addClass('invalid').next().html(response.message['bio']); }
					else { $('.user-bio').find('.input-signup').removeClass('invalid').addClass('valid').next().empty(); }
					if (response.message['sub-kor']) { $('.btn-group.kor').next().html('<img src="/static/img/invalid.png"> 국어과목을 선택하세요').show(); }
					else { $('.btn-group.kor').next().html('<img src="/static/img/valid.png">').show(); }
					if (response.message['sub-mat']) { $('.btn-group.mat').next().html('<img src="/static/img/invalid.png"> 수학과목을 선택하세요').show(); }
					else { $('.btn-group.mat').next().html('<img src="/static/img/valid.png">').show(); }
					if (response.message['sub-eng']) { $('.btn-group.eng').next().html('<img src="/static/img/invalid.png"> 영어과목을 선택하세요').show(); }
					else { $('.btn-group.eng').next().html('<img src="/static/img/valid.png">').show(); }
					if (response.message['sub-sel']) { $('.btn-group.cur').next().html('<img src="/static/img/invalid.png"> 공부할 과목을 선택하세요').show(); }
					else { $('.btn-group.cur').next().html('<img src="/static/img/valid.png">').show(); }
					
					$('input.invalid:first').focus();
				} else {
					bootbox.classes('bootbox-message');
					bootbox.dialog(response.name + "님, 회원가입을 축하합니다.", [{
						"label" : "확인",
						"class" : "btn-primary",
						"callback" : function() {
							window.location.href = "/";
						}
					}]);
				}
			}
		});
		return false;
	})
	.on('click', '.btn-cancel', function(e) {
		window.location.href = '/';
	});
});	
</script>
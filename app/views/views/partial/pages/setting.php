<div id="content" class="">
	<div class="row-fluid">
		<div class="box span12" style="margin-top:0; min-width:500px;">
			<div class="box-header" data-original-title="">
				<h3><i class="fa-icon-user"></i><span class="break"></span>회원 정보 수정</h3>
			</div>
			<div class="box-content">
				
				<form class="form-horizontal setting-user">
					<fieldset>
						<div class="control-group">
							<label class="control-label" for="email">이메일</label>
							<div class="controls">
								<input class="input-xlarge disabled" type="text" value="<?=$user->email;?>" disabled />
								<span class="help-msg">이메일은 공개되지 않습니다.</span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="profile_img">프로필 사진</label>
							<div class="controls">
								<div class="user-profile-wrapper">
									<img class="user-profile" data-change="N" src="<?=$metadata['profile_image'];?>" />
									<a href="#" class="btn btn-set-profile">사진 변경</a>
								</div>
								<span class="profile-helper">권장크기: 160x160<br>최대파일크기: 1MB<br>파일형식: *.jpg, *.png</span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="nickname">이름</label>
							<div class="controls">
								<input type="text" name="nickname" class="input-xlarge user-nickname" value="<?=$user->nickname;?>" />
								<span class="error"></span>
								<span class="help-msg">실명을 입력하면, 다른 사람들이 찾기가 쉬워집니다.</span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="bio">한줄 소개</label>
							<div class="controls">
								<input type="text" name="bio" class="input-xlarge user-bio" value="<?=$user->bio;?>">
								<span class="error"></span>
								<span class="help-msg">20자 이내로 자신을 표현해보세요.</span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="email">프로필 주소</label>
							<div class="controls">
								<label class="plain">http://odab.net/</label>
								<input type="text" name="mypage_url" maxlength="15" class="input-medium user-mypage" value="<?=$user->mypage_url;?>" />
								<span class="error"></span>
								<span class="help-msg">자신의 마이페이지로 연결됩니다.</span>
							</div>
						</div>
						<div class="control-divider"></div>
						<div class="control-group">
							<label class="control-label" for="subject-option">과목 선택</label>
							<div class="controls">
								<div class="subject-lists" data-change="N">
									<?php if (count($metadata['subject_option']) > 0): ?>
									<ul class="nav nav-pills nav-subject">
										<?php foreach($metadata['subject_option'] as $sub): ?>
										<li class="nav-subject-item">
											<a class="subject-item-list active" data-id="<?=$sub['id'];?>" data-slug="<?=$sub['slug'];?>"><?=$sub['name'];?></a>
										</li>
										<?php endforeach; ?>
									</ul>
									<?php else: ?>
									<span>선택 과목이 없습니다.</span>
									<?php endif; ?>
								</div>
								<a href="#" class="btn btn-set-subject">과목 변경</a>
								<span class="error"></span>
								<span class="help-msg">선택 과목 기준으로 성적표에 표시됩니다.</span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="auto_creation">오답노트 자동 생성</label>
							<div class="controls auto-creation">
								<div class="btn-group">
								<?php if ($metadata['auto_creation'] == 'Y'): ?>
									<button type="button" class="btn btn-switch active" value="Y">설정</button>
									<button type="button" class="btn btn-switch" value="N">해제</button>
								<?php else: ?>
									<button type="button" class="btn btn-switch" value="Y">설정</button>
									<button type="button" class="btn btn-switch active" value="N">해제</button>
								<?php endif; ?>
								</div>
								<span class="help-msg">채점 후 틀린문제에 대한 오답노트를 자동으로 생성할 수 있습니다.</span>
							</div>
						</div>
						<div class="control-divider"></div>
						<div class="control-group" data-id="<?=$user->id;?>">
							<label class="control-label" for="password">계정 관리</label>
							<div class="controls">
								<button type="button" class="btn btn-password-edit">비밀번호 변경</button>
							</div>
							<div class="controls" style="margin-top:5px;">
								<a href="#" class="deactivate-user" style="font-size:12px;">회원 탈퇴하기</a>
							</div>
						</div>
						<div class="form-actions">
							<button type="button" class="btn btn-primary btn-save-setting">저장하기</button>
						</div>
					</fieldset>
				</form>
				
			</div>
		</div>
	</div>
</div>

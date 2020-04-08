<?php include('header.php'); ?>




<section class="cabinet">
	<div class="container">
		<h1 class="h1 sec-title">Кабинет</h1>
		<div class="vertical-form-wrapper vertical-form-wrapper-login">
			<form action="https://smile-at-once.ru/cabinet/" method="post" class="vertical-form">
				<fieldset>
					<div class="form-row">
						<span><input type="text" name="user_login" id="user_login" placeholder="Введите имя*" class="input-text"></span>
					</div>
					<div class="form-row">
						<span><input type="password" id="password" name="user_pw" placeholder="Пароль" class="input-text"></span>
					</div>
					<input type="hidden" name="enter" value="1">
					<div class="form-row form-row-button">
						<button type="submit" class="button">Вход</button>
					</div>
					<div id="error"></div>
				</fieldset>
			</form>
		</div>
	</div>
</section>



<section class="cabinet" id="cabinet">
	<div class="container">
		<div class="btn-holder" style="padding: 5px 0;overflow: hidden;">
			<a href="/index.php?cabinet=yes&logout=1" class="button button-green button--small" style="float: right">Выход</a>
			<a href="#reestr" class="button button-green button--small" style="float: right; margin: 0 20px 0 0">К реестру</a>
		</div>
		<h1 class="h1 sec-title">Создать консультацию</h1>
		<div class="vertical-form-wrapper">
			<form action="" method="post" class="form vertical-form" id="addConsult">
				<fieldset>
					<div class="vertical-form-inner">
						<input type="hidden" name="isExclusive" value="true"/>
						<input type="hidden"  name="addConference" value="true"/>
						<div class="vertical-form-col">
							<div class="form-row">
								<label for="doc_select" class="form__label">Выбор врача:</label>
								<select id="doc_select" class="form__select" name="doctor">
									<option value="Бакарян С.М.">Бакарян Сона Мартиросовна</option>
									<option value="Беляева О.А.">Беляева Ольга Александровна</option>
									<option value="Беспалов Р.Д.">Беспалов Роман Дмитриевич</option>
									<option value="Вагапов З.И.">Вагапов Закир Иркинович</option>
									<option value="Варламова Т.В.">Варламова Татьяна Витальевна</option>
									<option value="Васильев А.А.">Васильев Александр Александрович</option>
									<option value="Васин Ю.А.">Васин Юрий Александрович</option>
									<option value="Горовой Е.А.">Горовой Евгений Андреевич</option>
									<option value="Джутова А.В.">Джутова Аида Владимировна</option>
									<option value="Дулгаров Ж.Г.">Дулгаров Жаргал Галсанович</option>
									<option value="Ергогло О.Н.">Ергогло Ольга Николаевна</option>
									<option value="Жиленко Е.А.">Жиленко Евгений Александрович</option>
									<option value="Кашаева В.Н.">Кашаева Виктория Николаевна</option>
									<option value="Коликов Д.В.">Коликов Дмитрий Владимирович</option>
									<option value="Копылов И.П.">Копылов Иван Павлович</option>
									<option value="Кример Д.А.">Кример Дмитрий Аркадьевич</option>
									<option value="Намдаков Н.В.">Намдаков Николай Владимирович</option>
									<option value="Непочатых В.В.">Непочатых Виктор Владимирович</option>
									<option value="Орлова Е.В.">Орлова Елена Владимировна</option>
									<option value="Путь В.А.">Путь Владимир Анатольевич</option>
									<option value="Самбуев Б.С.">Самбуев Баир Сергеевич</option>
									<option value="Сидоров Д.А.">Сидоров Дмитрий Алексеевич</option>
									<option value="Тарабановская М.И.">Тарабановская Марина Игоревна</option>
									<option value="Чернов А.Р.">Чернов Андрей Растиславович</option>
									<option value="Чорный С.В.">Чорный Станислав Владимирович</option>
								</select>
							</div>
							<div class="form-row">
								<label for="name" class="form__label">Фио пациента:</label>
								<span><input id="name" name="fio" type="text" placeholder="" class="input-text"></span>
							</div>
						</div>
						<div class="vertical-form-col">
							<div class="form-row form-row__date">
								<label for="form_date" class="form__label">Дата и время :</label>
								<span><input id="form_date" name="date_start" type="text" placeholder="" class="input-text"></span>
							</div>
							<!--  <div class="form-row">
								<label for="name_create_select" class="form__label">Основатель встречи:</label>
								<select id="name_create_select" class="form__select">
									<option>doc1</option>
									<option>doc2</option>
									<option>doc3</option>
								</select>
							</div>
							-->
						</div>
					</div>
					<div class="form-row form-row-button">
						<button type="submit" class="button">Создать</button>
					</div>
				</fieldset>
			</form>
		</div>
		<div class="" id="reestr"></div>
		<h2 class="h2 sec-title">Реестр консультаций</h2>
		<div class="meeting-register">
			<table class="meeting-register__table">
				<tr>
					<th class="meeting-register__th meeting-register__th-room">Комната</th>
					<th class="meeting-register__th meeting-register__th-name">Пациент</th>
					<th class="meeting-register__th meeting-register__th-name-doctor">Врач</th>
					<th class="meeting-register__th meeting-register__th-date">Дата консультации</th>
					<th class="meeting-register__th meeting-register__th-date">Дата окончания</th>
					<th class="meeting-register__th meeting-register__th-link-doctor">Врачу</th>
					<th class="meeting-register__th meeting-register__th-link-client">Пациенту</th>
					<th class="meeting-register__th meeting-register__th-link-manager">Менджеру</th>
					<th class="meeting-register__th meeting-register__th-creator">Автор</th>
					<th class="meeting-register__th meeting-register__th-status">Статус</th>
					<th class="meeting-register__th meeting-register__th-control">Операции</th>
				</tr>
				<tr>
					<td class="meeting-register__td meeting-register__td-room"><div><em>34</em></div></td>
					<td class="meeting-register__td meeting-register__td-name"><div>Горулева Евгения Романовна</div></td>
					<td class="meeting-register__td meeting-register__td-name-doctor"><div>Копылов И.П.</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>07.04.2020 19:15</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>07.04.2020 19:50</div></td>
					<td class="meeting-register__td meeting-register__td-link-doctor"><div><span class="link-chat">https://smile-at-once.ru/chat/doctor_cm9vbV8zNA==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-client"><div><span class="link-chat">https://smile-at-once.ru/chat/cm9vbV8zNA==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-manager"><div><span class="link-chat">https://smile-at-once.ru/chat/manager_cm9vbV8zNA==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-name-creator"><div>vedishev@medwebservice.ru</div></td>
					<td class="meeting-register__td meeting-register__td-status"><div>
							<span class="meeting-register__meeting meeting-register__meeting-canceled">проведена</span>
						</div>
					</td>
					<td class="meeting-register__td meeting-register__td-control">
						<div>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(34,'Возобновить?','/index.php?cabinet=yes&reload=1&roomID='); return false">Возобновить</a>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(34,'Удалить консультацию?','/index.php?cabinet=yes&del=1&roomID='); return false">Удалить</a>
						</div>
					</td>
				</tr>
				<tr>
					<td class="meeting-register__td meeting-register__td-room"><div><em>39</em></div></td>
					<td class="meeting-register__td meeting-register__td-name"><div>Горулева Евгения Романовна</div></td>
					<td class="meeting-register__td meeting-register__td-name-doctor"><div>Копылов И.П.</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>07.04.2020 18:30</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div></div></td>
					<td class="meeting-register__td meeting-register__td-link-doctor"><div><span class="link-chat">https://smile-at-once.ru/chat/doctor_cm9vbV8zOQ==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-client"><div><span class="link-chat">https://smile-at-once.ru/chat/cm9vbV8zOQ==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-manager"><div><span class="link-chat">https://smile-at-once.ru/chat/manager_cm9vbV8zOQ==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-name-creator"><div>konovalova@medwebservice.ru</div></td>
					<td class="meeting-register__td meeting-register__td-status"><div>
							<span class="meeting-register__meeting meeting-register__meeting-held">запланирована</span>
						</div>
					</td>
					<td class="meeting-register__td meeting-register__td-control">
						<div>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(39,'Удалить консультацию?','/index.php?cabinet=yes&del=1&roomID='); return false">Удалить</a>
						</div>
					</td>
				</tr>
				<tr>
					<td class="meeting-register__td meeting-register__td-room"><div><em>36</em></div></td>
					<td class="meeting-register__td meeting-register__td-name"><div>Яковлев Алексей Геннадьевич</div></td>
					<td class="meeting-register__td meeting-register__td-name-doctor"><div>Намдаков Н.В.</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>07.04.2020 17:00</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div></div></td>
					<td class="meeting-register__td meeting-register__td-link-doctor"><div><span class="link-chat">https://smile-at-once.ru/chat/doctor_cm9vbV8zNg==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-client"><div><span class="link-chat">https://smile-at-once.ru/chat/cm9vbV8zNg==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-manager"><div><span class="link-chat">https://smile-at-once.ru/chat/manager_cm9vbV8zNg==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-name-creator"><div>vedishev@medwebservice.ru</div></td>
					<td class="meeting-register__td meeting-register__td-status"><div>
							<span class="meeting-register__meeting meeting-register__meeting-held">online</span>
						</div>
					</td>
					<td class="meeting-register__td meeting-register__td-control">
						<div>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(36,'Завершить?','/index.php?cabinet=yes&finish=1&roomID='); return false">Завершить</a>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(36,'Удалить консультацию?','/index.php?cabinet=yes&del=1&roomID='); return false">Удалить</a>
						</div>
					</td>
				</tr>
				<tr>
					<td class="meeting-register__td meeting-register__td-room"><div><em>33</em></div></td>
					<td class="meeting-register__td meeting-register__td-name"><div>Борисов Михаил Николаевич</div></td>
					<td class="meeting-register__td meeting-register__td-name-doctor"><div>Дулгаров Ж.Г.</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>07.04.2020 16:15</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>07.04.2020 16:45</div></td>
					<td class="meeting-register__td meeting-register__td-link-doctor"><div><span class="link-chat">https://smile-at-once.ru/chat/doctor_cm9vbV8zMw==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-client"><div><span class="link-chat">https://smile-at-once.ru/chat/cm9vbV8zMw==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-manager"><div><span class="link-chat">https://smile-at-once.ru/chat/manager_cm9vbV8zMw==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-name-creator"><div>vedishev@medwebservice.ru</div></td>
					<td class="meeting-register__td meeting-register__td-status"><div>
							<span class="meeting-register__meeting meeting-register__meeting-canceled">проведена</span>
						</div>
					</td>
					<td class="meeting-register__td meeting-register__td-control">
						<div>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(33,'Возобновить?','/index.php?cabinet=yes&reload=1&roomID='); return false">Возобновить</a>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(33,'Удалить консультацию?','/index.php?cabinet=yes&del=1&roomID='); return false">Удалить</a>
						</div>
					</td>
				</tr>
				<tr>
					<td class="meeting-register__td meeting-register__td-room"><div><em>37</em></div></td>
					<td class="meeting-register__td meeting-register__td-name"><div>Семина Валентина Александровна</div></td>
					<td class="meeting-register__td meeting-register__td-name-doctor"><div>Васильев А.А.</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>07.04.2020 15:00</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>07.04.2020 15:46</div></td>
					<td class="meeting-register__td meeting-register__td-link-doctor"><div><span class="link-chat">https://smile-at-once.ru/chat/doctor_cm9vbV8zNw==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-client"><div><span class="link-chat">https://smile-at-once.ru/chat/cm9vbV8zNw==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-manager"><div><span class="link-chat">https://smile-at-once.ru/chat/manager_cm9vbV8zNw==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-name-creator"><div>vedishev@medwebservice.ru</div></td>
					<td class="meeting-register__td meeting-register__td-status"><div>
							<span class="meeting-register__meeting meeting-register__meeting-canceled">проведена</span>
						</div>
					</td>
					<td class="meeting-register__td meeting-register__td-control">
						<div>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(37,'Возобновить?','/index.php?cabinet=yes&reload=1&roomID='); return false">Возобновить</a>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(37,'Удалить консультацию?','/index.php?cabinet=yes&del=1&roomID='); return false">Удалить</a>
						</div>
					</td>
				</tr>
				<tr>
					<td class="meeting-register__td meeting-register__td-room"><div><em>24</em></div></td>
					<td class="meeting-register__td meeting-register__td-name"><div>Ходжаева Дарман Матякубовна</div></td>
					<td class="meeting-register__td meeting-register__td-name-doctor"><div>Коликов Д.В.</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>06.04.2020 16:00</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div></div></td>
					<td class="meeting-register__td meeting-register__td-link-doctor"><div><span class="link-chat">https://smile-at-once.ru/chat/doctor_cm9vbV8yNA==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-client"><div><span class="link-chat">https://smile-at-once.ru/chat/cm9vbV8yNA==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-manager"><div><span class="link-chat">https://smile-at-once.ru/chat/manager_cm9vbV8yNA==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-name-creator"><div>kulakov@medwebservice.ru</div></td>
					<td class="meeting-register__td meeting-register__td-status"><div>
							<span class="meeting-register__meeting meeting-register__meeting-held">запланирована</span>
						</div>
					</td>
					<td class="meeting-register__td meeting-register__td-control">
						<div>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(24,'Удалить консультацию?','/index.php?cabinet=yes&del=1&roomID='); return false">Удалить</a>
						</div>
					</td>
				</tr>
				<tr>
					<td class="meeting-register__td meeting-register__td-room"><div><em>22</em></div></td>
					<td class="meeting-register__td meeting-register__td-name"><div>Юшкевич Ираида Викторовна</div></td>
					<td class="meeting-register__td meeting-register__td-name-doctor"><div>Кример Д.А.</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div>06.04.2020 15:00</div></td>
					<td class="meeting-register__td meeting-register__td-date"><div></div></td>
					<td class="meeting-register__td meeting-register__td-link-doctor"><div><span class="link-chat">https://smile-at-once.ru/chat/doctor_cm9vbV8yMg==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-client"><div><span class="link-chat">https://smile-at-once.ru/chat/cm9vbV8yMg==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-link-manager"><div><span class="link-chat">https://smile-at-once.ru/chat/manager_cm9vbV8yMg==/</span><i>Нажмите, чтобы скопировать строку в буфер обмена</i></div></td>
					<td class="meeting-register__td meeting-register__td-name-creator"><div>kulakov@medwebservice.ru</div></td>
					<td class="meeting-register__td meeting-register__td-status"><div>
							<span class="meeting-register__meeting meeting-register__meeting-held">запланирована</span>
						</div>
					</td>
					<td class="meeting-register__td meeting-register__td-control">
						<div>
							<a href="javascript:void(0)" class="button button--small" onclick="confirmDelete(22,'Удалить консультацию?','/index.php?cabinet=yes&del=1&roomID='); return false">Удалить</a>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="pagination">
			<div class="pagination__nav">

			</div>
		</div>
		<div>
			<div class="btn-holder" style="padding: 5px 0;overflow: hidden;">
				<a href="#cabinet" class="button button-green button--small" style="float: right">К форме</a>
			</div>
		</div>
	</div>
</section>
<a href="#cabinet" class="button to-up" style="float: right">Вверх</a>

<div class="consultation-rating" style="display: none">
	<div class="consultation-rating-bg">
		<div class="consultation-rating-box">
			<strong class="h3 sec-title">Ваше мнение о консультации</strong>
			<form action="#" method="post" class="vertical-form form-all">
				<fieldset>
					<div class="stars-rating"></div>
					<textarea class="textarea"  cols="5" rows="3" placeholder="Oставьте свой отзыв или пожелания по улучшению"></textarea>
				</fieldset>
				<button type="submit" class="button">Отправить</button>
			</form>
			<span class="fancybox-button fancybox-close-small" title="Закрыть"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg></span>
		</div>
	</div>
</div>






<?php include('footer.php'); ?>

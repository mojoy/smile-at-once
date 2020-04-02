<?php include('header.php'); ?>


<link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<section class="cabinet">
	<div class="container">

		<h1 class="h1 sec-title">Реестр встреч</h1>

		<form action="" method="post" class="vertical-form cabinet-form-search">
			<fieldset>
				<div class="form-row">
					<label for="search_patient" class="form__label">поиск пациента:</label>
					<input id="search_patient" type="text" placeholder="" class="input-text input-text--small">
					<button type="submit" class="button button--small">найти пациента</button>
				</div>
				<div class="form-row">
					<label for="search_doctor" class="form__label">поиск врача:</label>
					<input id="search_doctor" type="text" placeholder="" class="input-text input-text--small">
					<button type="submit" class="button button--small">найти врача</button>
				</div>
			</fieldset>
		</form>

		<div class="meeting-register">
			<table class="meeting-register__table">
				<tr>
					<th class="meeting-register__th">Пациент</th>
					<th class="meeting-register__th">Врач</th>
					<th class="meeting-register__th  meeting-register__th-date"">Дата создание встречи</th>
					<th class="meeting-register__th">Ссылка на встречу</th>
					<th class="meeting-register__th meeting-register__th-status">Статус</th>
				</tr>
				<tr>
					<td class="meeting-register__td">Стефан О.А.</td>
					<td class="meeting-register__td">Стефан О.А.</td>
					<td class="meeting-register__td">21 апреля 2020</td>
					<td class="meeting-register__td">http://link.com/?1568995dvsevdsvd2v6sd</td>
					<td class="meeting-register__td meeting-register__td-status">
						<span class="meeting-register__meeting meeting-register__meeting-canceled">проведена</span>
					</td>
				</tr>
				<tr>
					<td class="meeting-register__td">Стефан О.А.</td>
					<td class="meeting-register__td">Стефан О.А.</td>
					<td class="meeting-register__td">21 апреля 2020</td>
					<td class="meeting-register__td">http://link.com/?1568995dvsevdsvd2v6sd</td>
					<td class="meeting-register__td meeting-register__td-status">
						<span class="meeting-register__meeting meeting-register__meeting-held">запланирована</span>
					</td>
				</tr>
				<tr>
					<td class="meeting-register__td">Стефан О.А.</td>
					<td class="meeting-register__td">Стефан О.А.</td>
					<td class="meeting-register__td">21 апреля 2020</td>
					<td class="meeting-register__td">http://link.com/?1568995dvsevdsvd2v6sd</td>
					<td class="meeting-register__td meeting-register__td-status">
						<span class="meeting-register__meeting meeting-register__meeting-canceled">проведена</span>
					</td>
				</tr>
				<tr>
					<td class="meeting-register__td">Стефан О.А.</td>
					<td class="meeting-register__td">Стефан О.А.</td>
					<td class="meeting-register__td">21 апреля 2020</td>
					<td class="meeting-register__td">http://link.com/?1568995dvsevdsvd2v6sd</td>
					<td class="meeting-register__td meeting-register__td-status">
						<span class="meeting-register__meeting meeting-register__meeting-held">запланирована</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
</section>




<section class="cabinet">
	<div class="container">

		<h1 class="h1 sec-title">Кабинет</h1>

		<div class="vertical-form-wrapper">
			<form action="" method="post" class="vertical-form">
				<fieldset>
					<div class="form-row">
						<span><input type="text" placeholder="Введите имя*" class="input-text"></span>
					</div>
					<div class="form-row">
						<span><input type="password" placeholder="Пароль" class="input-text"></span>
					</div>

					<div class="form-row form-row-button">
						<button type="submit" class="button">Вход</button>
					</div>
				</fieldset>
			</form>
		</div>



	</div>
</section>




<section class="cabinet">
	<div class="container">

		<h1 class="h1 sec-title">Создание ссылки</h1>

		<div class="vertical-form-wrapper">
			<form action="" method="post" class="form vertical-form">
				<fieldset>
					<div class="form-row">
						<label for="name_meeting" class="form__label">Название встречи</label>
						<span><input id="name_meeting" type="text" placeholder="" class="input-text"></span>
					</div>


					<div class="form-row">
						<label for="doc_select" class="form__label">Выбор врача:</label>
						<select id="doc_select" class="form__select">
							<option>doc1</option>
							<option>doc2</option>
							<option>doc3</option>
						</select>
					</div>

					<div class="form-row form-row__date">
						<label for="form_date" class="form__label">Дата:</label>
						<span><input id="form_date" type="text" placeholder="" class="input-text"></span>
					</div>

					<div class="form-row">
						<label for="name" class="form__label">Фио пациента:</label>
						<span><input id="name" type="text" placeholder="" class="input-text"></span>
					</div>


					<div class="form-row">
						<label for="name_create_select" class="form__label">Основатель встречи:</label>
						<select id="name_create_select" class="form__select">
							<option>doc1</option>
							<option>doc2</option>
							<option>doc3</option>
						</select>
					</div>


					<div class="form-row form-row-button">
						<button type="submit" class="button">Создать</button>
					</div>
				</fieldset>
			</form>
		</div>



	</div>
</section>







<?php include('footer.php'); ?>

<?php include('header.php'); ?>

<div class="pb">
	<div class="box-pay-success box-pay-success--error">
		<strong class="h3 sec-title">Во время оплаты возникла ошибка!</strong>
		<div class="row-btn">
			<a href="javascript:void(0)" class="button button--medium" onclick="window.parent.location.href='/';">Вернуться на сайт</a>
		</div>
	</div>
</div>

<div class="pb">
	<div class="box-pay-success">
		<strong class="h3 sec-title">Операция успешно завершена!</strong>
		<div class="row-btn">
			<a href="javascript:void(0)" class="button button--medium" onclick="window.parent.location.href='/';">Вернуться на сайт</a>
		</div>
	</div>
</div>


<div class="pb">

	<div class="row box-pay">
		<div class="grid-3 grid-6_l">
			<div class="box-pay-card">
				<div class="row box-pay-card-row">
					<div class="grid-12">
						<img src="/data/teeth_new/img/pay/_Visa.png" title="карты VISA" alt="карты VISA"/>
					</div>
					<div class="grid-12">
						<img src="/data/teeth_new/img/pay/Mastercard-logo.svg.png" title="карты MasterCard" alt="карты MasterCard"/>
					</div>
					<div class="grid-12">
						<img src="/data/teeth_new/img/pay/logo_mir.jpg" title="карты МИР" title="карты МИР"/>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-6 grid-12_l">
			<div class="box-pay-form">
				<form method="post" action="" class="form vertical-form">
					<fieldset>
						<input class='orderNumber' type='hidden' value='{$payID}'>
						<div class='element'>
							<label for="amount" class="form__label">Сумма:</label>
							<input id="amount" class='amount input-text input-text--medium' type='text' value=''>
						</div>
						<div class='element'>
							<label for="purpose-payment" class="form__label">Назначение платежа:</label>
							<textarea id="purpose-payment" class='descr textarea textarea--medium' placeholder="Введите назанчение: Оплата по договору №XXXX, пациент ФИО, дата рождения - согласно реквизитам на оплату, которые вам предоставил менеджер."></textarea>
						</div>
						<div class='element'>
							<label for="email_pay" class="form__label">Email:</label>
							<input id="email_pay" class='clientEmail input-text input-text--medium' type='text' value=''>
						</div>
					</fieldset>
				</form>
				<div
					id="alfa-payment-button"
					data-token="n7hbrkqk09l9kqu4efb8bngk9n"
					data-return-url="https://smile-at-once.ru/pay/success/"
					data-fail-url="https://smile-at-once.ru/pay/error_pay/"
					data-language="ru"
					data-stages="1"
					data-order-number-selector='.orderNumber'
					data-amount-format="rubli"
					data-amount-selector=".amount"
					data-description-selector=".descr"
					data-email-selector='.clientEmail'
				></div>
				<div class="box-pay-note">
					Вам отобразится форма Альфа банка с использованием защищенного соединения. Все транзакции проходят на стороне банка, Ваши данные сугубо конфиденциальны и не доступны сайту.
				</div>
			</div>
		</div>
		<div class="grid-3 grid-6_l">
			<div class="box-pay-card">
				<div class="row box-pay-card-row">
					<div class="grid-12">
						<img src="/data/teeth_new/img/pay/_verified-by-visa.png" title="карты visa" alt="карты visa"/>
					</div>
					<div class="grid-12">
						<img src="/data/teeth_new/img/pay/_mastercard-securecode.png" title="карты mastercard"/>
					</div>
					<div class="grid-12">
						<img src="/data/teeth_new/img/pay/MIRaccept.png" title="карты MIRaccept" alt="карты MIRaccept"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<h2>Правила оплаты и безопасность платежей, конфиденциальность информации</h2>

<p>Оплата банковскими картами осуществляется через АО «АЛЬФА-БАНК».</p>
<div class="pb">
	<div class="card-list">
		<div class="row card-list-row">
			<div class="grid-12">
				<img src="/data/teeth_new/img/pay/AlfaBank.png" title="" style="max-width: 250px;"/>
			</div>
		</div>
	</div>
</div>

<p>Услуга оплаты через интернет осуществляется в соответствии с Правилами международных платежных систем Visa, MasterCard и Платежной системы МИР на принципах соблюдения конфиденциальности и безопасности совершения платежа, для чего используются самые современные методы проверки, шифрования и передачи данных по закрытым каналам связи. Ввод данных банковской карты осуществляется на защищенной платежной странице АО «АЛЬФА-БАНК».</p>
<p>На странице для ввода данных банковской карты потребуется ввести <strong>данные банковской карты</strong>: номер карты, имя владельца карты, срок действия карты, трёхзначный код безопасности (CVV2 для VISA, CVC2 для MasterCard, Код Дополнительной Идентификации для МИР). Все необходимые данные пропечатаны на самой карте. Трёхзначный код безопасности — это три цифры, находящиеся на обратной стороне карты.</p>
<p>Далее вы будете перенаправлены на страницу Вашего банка для ввода кода безопасности, который придет к Вам в СМС. Если код безопасности к Вам не пришел, то следует обратиться в банк выдавший Вам карту.</p>

<h3>Случаи отказа в совершении платежа:</h3>

<ul>
	<li>банковская карта не предназначена для совершения платежей через интернет, о чем можно узнать, обратившись в Ваш Банк;</li>
	<li>недостаточно средств для оплаты на банковской карте. Подробнее о наличии средств на банковской карте Вы можете узнать, обратившись в банк, выпустивший банковскую карту;</li>
	<li>данные банковской карты введены неверно;</li>
	<li>истек срок действия банковской карты. Срок действия карты, как правило, указан на лицевой стороне карты (это месяц и год, до которого действительна карта). Подробнее о сроке действия карты Вы можете узнать, обратившись в банк, выпустивший банковскую карту;</li>
</ul>

<p>По вопросам оплаты с помощью банковской карты и иным вопросам, связанным с работой сайта, Вы можете обращаться по следующим телефонам: <strong>+7 495 540-50-42</strong>.</p>
<p>Предоставляемая вами персональная информация (имя, адрес, телефон, e-mail, номер банковской карты) является конфиденциальной и не подлежит разглашению. Данные вашей кредитной карты передаются только в зашифрованном виде и не сохраняются на нашем Web-сервере.</p>

<h3>Правила возврата средств</h3>

<p>При оплате картами возврат наличными денежными средствами не допускается. Порядок возврата регулируется правилами международных платежных систем.</p>
<p>Для возврата денежных средств на банковскую карту необходимо заполнить «Заявление о возврате денежных средств», которое высылается по требованию компанией на электронный адрес и оправить его вместе с приложением копии паспорта по адресу <strong>support@smile-at-once.ru</strong></p>
<p>Возврат денежных средств будет осуществлен на банковскую карту в течение 21 (двадцати одного) рабочего дня со дня получения «Заявление о возврате денежных средств» Компанией.</p>
<p>Для возврата денежных средств по операциям проведенными с ошибками необходимо обратиться с письменным заявлением и приложением копии паспорта и чеков/квитанций, подтверждающих ошибочное списание. Данное заявление необходимо направить по адресу <strong>support@smile-at-once.ru</strong></p>
<p>Сумма возврата будет равняться сумме покупки. Срок рассмотрения Заявления и возврата денежных средств начинает исчисляться с момента получения Компанией Заявления и рассчитывается в рабочих днях без учета праздников/выходных дней.</p>

<h3>Контактная информация</h3>
<p>На сайте должна быть размещена полная информация об организации: адрес, номер телефона, реквизиты юридического лица.</p>

<h4>ПРИМЕР:</h4>
<table>
	<tbody>
	<colgroup width="50%"></colgroup>
	<tr>
		<td style="text-align:left"><span>Название компании           </span></td>
		<td style="text-align:left"><span>ООО «Центр стоматологии Новая Улыбка»</span></td>
	</tr>
	<tr>
		<td style="text-align:left"><span>ИНН / КПП                   </span></td>
		<td style="text-align:left"><span>7709998092 / 770901001                           </span></td>
	</tr>
	<tr>
		<td style="text-align:left"><span>ОГРН                        </span></td>
		<td style="text-align:left"><span>1177746383210 </span></td>
	</tr>
	<tr>
		<td style="text-align:left"><span>Фактический адрес           </span></td>
		<td style="text-align:left"><span>109004, г. Москва, ул. Станиславского дом 11                 </span></td>
	</tr>
	<tr>
		<td style="text-align:left"><span>Телефон                     </span></td>
		<td style="text-align:left"><span> +7 495 540-50-42               </span></td>
	</tr>
	<tr>
		<td style="text-align:left"><span>e-mail:                     </span></td>
		<td style="text-align:left"><span> support@smile-at-once.ru                </span></td>
	</tr>
	</tbody>
</table>



<?php include('footer.php'); ?>

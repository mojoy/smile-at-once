<?php include('header.php'); ?>

<script src="https://cdn.ckeditor.com/4.14.0/standard-all/ckeditor.js"></script>

<section class="cabinet">
	<div class="container">
		<h1 class="h1 sec-title">Ваше мнение о консультации</h1>

		<div class="vertical-form-middle">
			<div class="consultation-rating-box">
				<form action="#" method="post" class="vertical-form form-all">
					<fieldset>

						<div class="vertical-form-small">
							<div class="stars-rating"></div>
							<!--
							<span><input type="text" name="" id="" placeholder="e-mail" class="input-text"></span>
							<span><input type="password" name="" id="" placeholder="e-mail" class="input-text"></span>
							<span><input type="email" name="" id="" placeholder="e-mail" class="input-text"></span>
							-->
						</div>

						<div class="vertical-form__textarea">
							<textarea class="textarea" id="patient_review" name="patient_review" cols="5" rows="3" placeholder="Oставьте свой отзыв или пожелания по улучшению" data-sample-short></textarea>
						</div>
						<div class="row-btn">
							<button type="submit" class="button">Отправить</button>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</section>

<script>
    CKEDITOR.replace('patient_review', {
        height: 260,
        width: 700,
    });
</script>




<?php include('footer.php'); ?>

/***********************
 Input mask BEGIN
***********************/
$(function () {
	var telInputs = $("input[type='tel']");
	String.prototype.replaceAt = function(index, replacement) {
		return this.substr(0, index) + replacement + this.substr(index + replacement.length);
	};

	var options =  {
		onKeyPress: function(cep, event, currentField, options){
			if (cep.charAt(1) === "8"){
				var currentValue = currentField.get(0).value;
				currentField.get(0).value = currentValue.replaceAt(1, "7");
			}
		}
	};

	telInputs.mask("+0 (000) 000-00-00", options);

	telInputs.on('focus',function () {
		if ($(this).get(0).value.length < 2){
			$(this).get(0).value = "+"
		}
	});

	telInputs.on('blur',function () {
		if ($(this).get(0).value === "+"){
			$(this).get(0).value = ""
		}
	})
});
/***********************
 Input mask END
 ***********************/


/***********************
 fancybox BEGIN
 ***********************/
$.fancybox.defaults.backFocus = false;
$.fancybox.defaults.autoFocus = false;
$.fancybox.defaults.lang = 'ru';
$.fancybox.defaults.idleTime = 0;
$.fancybox.defaults.infobar = false;
$.fancybox.defaults.btnTpl.arrowLeft = '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
	'<span class="i i-left"></span>' +
	"</button>";
$.fancybox.defaults.btnTpl.arrowRight = '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
	'<span class="i i-right"></span>' +
	"</button>";
$.fancybox.defaults.i18n =
	{
		'ru': {
			CLOSE: 'Закрыть',
			NEXT: 'Дальше',
			PREV: 'Назад',
			ERROR: 'Не удается загрузить. <br/> Попробуйте позднее.',
			PLAY_START: 'Начать слайдшоу',
			PLAY_STOP: 'Остановить слайдшоу',
			FULL_SCREEN: 'На весь экран',
			THUMBS: 'Превью'
		}
	};

function init_fancy() {
	$('.fancy').fancybox({
		buttons: ['close'],
		baseClass: "pb"
	});
	$('.fancy-modal').fancybox({
		touch: false,
		baseClass: "pb"
	});
	$('.fancy-map').fancybox({
		toolbar: false,
		smallBtn: true,
		defaultType: "iframe",
		baseClass: "pb"
	});
}

function init_fancy__video() {
	$('.fancy-video').fancybox({
		toolbar: false,
		smallBtn: true,
		baseClass: "pb",
		youtube: {
			controls: 1,
			showinfo: 0,
			autoplay: 1
		}
	});
}

$(function () {
	init_fancy();
	init_fancy__video();
});
/***********************
 fancybox END
 ***********************/


/***********************
 Прокрутка к секциям BEGIN
 ***********************/
$(function () {
	$('.scrollto').on('click', function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html,body').stop().animate({scrollTop: destination}, 1000);
		return false;
	});
});
/***********************
 Прокрутка к секциям END
 ***********************/


/***********************
 Waypoints BEGIN
 ***********************/
$(function () {
	$('.anim').waypoint(function () {
		$(this.element).toggleClass('animated');
	}, {
		offset: '85%'
	});
});
/***********************
 Waypoints END
 ***********************/


/***********************
Cases slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var casesSlider = new Swiper ('.cases-slider', {
		direction: 'vertical',
		slidesPerView: 5,
		spaceBetween: 30,
		grabCursor: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	});

	var casesThumbs = document.querySelectorAll('.case-thumb');
	var casesSlides = document.querySelectorAll('.case-thumb');

	for (var i = 0; i < casesThumbs.length; ++i) {
		casesThumbs[i].index = i;
		casesThumbs[i].addEventListener("click", function () {
			selectCase(this.index)
		});
	}

	function selectCase(index) {
		for (var i = 0; i < casesThumbs.length; ++i) {
			casesThumbs[i].classList.remove('active');
		}
		casesThumbs[index].classList.add('active');
	}
});
/***********************
Cases slider END
***********************/


/***********************
Prizes slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var prizesSlider = new Swiper ('.prizes-slider', {
		slidesPerView: 'auto',
		grabCursor: true,
		centeredSlides: true,
		roundLengths: true,
		initialSlide: 3,
		loop: true,
		loopedSlides: 7
	});
});
/***********************
Prizes slider END
***********************/


/***********************
Photo line slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var photoLineSlider = new Swiper ('.photo-line-slider', {
		slidesPerView: 'auto',
		roundLengths: true,
		loop: true,
		loopedSlides: 12
	});
});
/***********************
Photo line slider END
***********************/


/***********************
Team BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var teamThumbs = new Swiper ('.team-thumbs', {
		slidesPerView: 'auto',
		centeredSlides: true,
		loop: true,
		slideToClickedSlide: true,
		initialSlide: 1,
		navigation: {
			nextEl: '.slider-arrow--next',
			prevEl: '.slider-arrow--prev',
		},
		threshold: 5
	});

	var teamSlider = new Swiper ('.team-slider', {
		slidesPerView: 'auto',
		centeredSlides: true,
		loop: true,
		threshold: 5,
		initialSlide: 1,
		grabCursor: true
	});

	teamThumbs.controller.control = teamSlider;
	teamSlider.controller.control = teamThumbs;
});
/***********************
Team END
***********************/
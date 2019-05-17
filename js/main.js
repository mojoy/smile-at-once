/***********************
 Input mask BEGIN
***********************/
/*$(function () {
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
});*/
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
 Lazy BEGIN
 ***********************/
function lazyLoad(){
	var lazyImgs = $('[data-lazy]');
	lazyImgs.each(function(){
		var lazyImage = $(this);
		var src = lazyImage.attr('data-lazy');
		lazyImage.attr('src',src);
	});
}

function lazyLoadBg(){
	var lazyImgs = $('[data-lazybg]');

	lazyImgs.each(function(){
		var lazyImage = $(this);
		var src = lazyImage.attr('data-lazybg');
		lazyImage.css('background-image','url('+src+')');
	});
}

$(function(){
	lazyLoad();
	lazyLoadBg();
});

$(window).on('load',function () {
	Waypoint.refreshAll();
});
/***********************
 Lazy END
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
		loopedSlides: 10,
		watchSlidesVisibility: true,
		preloadImages: false,
		threshold: 5,
		lazy: {
			preloaderClass: 'slide-loading'
		},
		navigation: {
			nextEl: '.slider-arrow--next',
			prevEl: '.slider-arrow--prev'
		}
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
		loop: true,
		loopedSlides: 12,
		watchSlidesVisibility: true,
		preloadImages: false,
		lazy: {
			preloaderClass: 'slide-loading'
		}
	});
});
/***********************
Photo line slider END
***********************/


/***********************
Team BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	if ($('.team-thumbs').length) {
		var teamThumbs = new Swiper('.team-thumbs', {
			slidesPerView: 'auto',
			centeredSlides: true,
			loop: true,
			slideToClickedSlide: true,
			watchSlidesVisibility: true,
			initialSlide: 1,
			preloadImages: false,
			lazy: {
				preloaderClass: 'slide-loading'
			},
			navigation: {
				nextEl: '.slider-arrow--next',
				prevEl: '.slider-arrow--prev'
			},
			threshold: 5
		});

		var teamSlider = new Swiper('.team-slider', {
			slidesPerView: 'auto',
			centeredSlides: true,
			loop: true,
			threshold: 5,
			grabCursor: true,
			watchSlidesVisibility: true,
			initialSlide: 1,
			preloadImages: false,
			lazy: {
				preloaderClass: 'slide-loading',
				loadPrevNext: true,
				loadPrevNextAmount: 4
			}
		});

		teamThumbs.controller.control = teamSlider;
		teamSlider.controller.control = teamThumbs;
	}
});
/***********************
Team END
***********************/


/***********************
Cases BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var casesThumbs = new Swiper ('.cases-thumbs', {
		slidesPerView: 'auto',
		centeredSlides: true,
		loop: true,
		slideToClickedSlide: true,
		watchSlidesVisibility: true,
		preloadImages: false,
		lazy: {
			preloaderClass: 'slide-loading'
		},
		navigation: {
			nextEl: '.slider-arrow--next',
			prevEl: '.slider-arrow--prev'
		},
		threshold: 5
	});

	casesThumbs.on('transitionEnd', function () {
		selectCase(casesThumbs.realIndex);
	});

	var cases = $('.case');

	function selectCase(index) {
		cases.removeClass('active').eq(index).addClass('active');
	}

	selectCase(0);
});
/***********************
Cases END
***********************/


/***********************
faq steps BEGIN
***********************/
$(function($){
	var faqSteps = $('.faq-step');
	var faqStepsNav;
	var faqStepsNavContainer = $('.faq-steps-nav');

	function generateFaqStepsNav() {
		faqSteps.each(function () {
			var index = parseInt($(this).index()) + 1;
			var dot = '<div class="faq-steps-nav__item"><span>'+index+'</span></div>';
			faqStepsNavContainer.append(dot);
		});
		faqStepsNav = $('.faq-steps-nav__item');

		faqStepsNav.on('click',function (e) {
			e.preventDefault();
			var thisIndex = $(this).index();
			selectFaqStep(thisIndex);
		});

		return faqStepsNav;
	}

	generateFaqStepsNav();

	function selectFaqStep(index) {
		faqSteps.removeClass('active').eq(index).addClass('active');
		faqStepsNav.removeClass('active').eq(index).addClass('active');
		faqStepsNav.filter('.active').prevAll().addClass('active');
	}

	selectFaqStep(0);

	$('.faq-step__next').on('click',function (e) {
		e.preventDefault();
		var nextIndex = faqSteps.filter('.active').next().index();
		selectFaqStep(nextIndex);
	});

});
/***********************
faq steps END
***********************/


/***********************
Head-slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var headSlider = new Swiper ('.head-slider', {
		slidesPerView: 1,
		loop: true,
		threshold: 5,
		grabCursor: true,
		preloadImages: false,
		lazy: {
			preloaderClass: 'slide-loading'
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
	});
});
/***********************
Head-slider END
***********************/


/***********************
Promo slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var promoSlider = new Swiper ('.promo-slider', {
		slidesPerView: 1,
		loop: true,
		threshold: 5,
		grabCursor: true,
		preloadImages: false,
		lazy: {
			preloaderClass: 'slide-loading'
		},
		navigation: {
			nextEl: '.promo-slider__next',
			prevEl: '.promo-slider__prev'
		},
		pagination: {
			el: '.promo-slider__pages',
			type: 'fraction'
		}
	});
});
/***********************
Promo slider END
***********************/


/***********************
Smi slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var smiSlider = new Swiper ('.smi-row', {
		slidesPerView: 'auto',
		loop: true,
		threshold: 5,
		grabCursor: true
	});
});
/***********************
Smi slider END
***********************/


/***********************
 select-like BEGIN
***********************/
$(function($){
	var selects = $('.select-like__current');

	selects.on('click',function (e) {
		e.preventDefault();
		var thisDrop = $(this).next('.select-like__drop');
		selects.next('.select-like__drop').not(thisDrop).removeClass('active');
		thisDrop.toggleClass('active');
	});

	selects.on('click', function(evt) {
		evt.stopPropagation();
	});

	document.addEventListener("click", function () {
		$('.select-like__drop').removeClass('active');
	});
});
/***********************
 select-like END
***********************/


/***********************
Filter mob BEGIN
***********************/
$(function($){
	$('.mob-filter-opener').on('click',function (e) {
		e.preventDefault();
		$('.reviews-filter-block').toggleClass('visible');
	})
});
/***********************
Filter mob END
***********************/


/***********************
Stars BEGIN
***********************/
$(function($){
	$(".stars-rating").starRating({
		useFullStars: true,
		emptyColor: '#cedae1',
		hoverColor: '#239ca3',
		activeColor: '#239ca3',
		ratedColor: '#239ca3',
		disableAfterRate: false,
		starSize: 24,
		useGradient: false,
		strokeColor: 'transparent',
		callback: function(currentRating, $el){
			$el.siblings('input').val(currentRating);
		}
	});
});
/***********************
Stars END
***********************/


/***********************
Reviews maps BEGIN
***********************/
$(function($){
	if ($('#users-map').length) {
		ymaps.ready(init);

		function init() {
			var myMap = new ymaps.Map("users-map", {
				center: [55.76, 37.64],
				zoom: 7,
				controls: ['zoomControl']
			});

			var clusterer = new ymaps.Clusterer({
				hasBaloon: false,
				hasHint: false,
				clusterIcons: [{
					href: '/img/claster.png',
					size: [55, 44],
					offset: [-27, -22]
				}],
				clusterIconContentLayout: ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold; top: -10px; position: relative;font-size: 14px;">{{ properties.geoObjects.length }}</div>')
			});

			var points = user_coordinates;

			var geoObjects = [];

			var placemarkOptions = {
				iconLayout: 'default#image',
				iconImageHref: '/img/placemark.png',
				iconImageSize: [20, 20],
				iconImageOffset: [-10, -10]
			};

			for (var i = 0, len = points.length; i < len; i++) {
				geoObjects[i] = new ymaps.Placemark(points[i], null, placemarkOptions);
			}

			clusterer.add(geoObjects);
			myMap.geoObjects.add(clusterer);

			myMap.setBounds(clusterer.getBounds(), {
				checkZoomRange: true
			});

		}
	}
});
/***********************
Reviews maps END
***********************/


/***********************
Review thanks slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var photoStackSlider = new Swiper ('.photo-stack-slider', {
		slidesPerView: 1,
		loop: false,
		threshold: 5,
		grabCursor: true,
		lazy: {
			preloaderClass: 'slide-loading'
		},
		on: {
			init: function () {
				var thisSliderWrapper = this.el.parentElement;
				var thisBtnNext = thisSliderWrapper.querySelector('.slider-arrow--next');
				var thisBtnPrev = thisSliderWrapper.querySelector('.slider-arrow--prev');
				this.params.navigation.nextEl = thisBtnNext;
				this.params.navigation.prevEl = thisBtnPrev;
			}
		}
	});
});
/***********************
Review thanks slider END
***********************/


/***********************
 how-change-slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var howChangeSlider = new Swiper ('.how-change-slider', {
		slidesPerView: 'auto',
		loop: false,
		threshold: 5,
		grabCursor: true,
		preloadImages: false,
		watchSlidesVisibility: true,
		watchOverflow: true,
		lazy: {
			preloaderClass: 'slide-loading'
		},
		on: {
			init: function () {
				var thisSliderWrapper = this.el.parentElement;
				var thisBtnNext = thisSliderWrapper.querySelector('.slider-arrow--next');
				var thisBtnPrev = thisSliderWrapper.querySelector('.slider-arrow--prev');
				this.params.navigation.nextEl = thisBtnNext;
				this.params.navigation.prevEl = thisBtnPrev;
			}
		}
	});
});
/***********************
 how-change-slider END
***********************/


/***********************
Video-slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var videoSlider = new Swiper ('.video-slider', {
		slidesPerView: 1,
		loop: false,
		threshold: 5,
		grabCursor: true,
		watchOverflow: true,
		on: {
			init: function () {
				var thisSliderWrapper = this.el.parentElement;
				var thisBtnNext = thisSliderWrapper.querySelector('.slider-arrow--next');
				var thisBtnPrev = thisSliderWrapper.querySelector('.slider-arrow--prev');
				this.params.navigation.nextEl = thisBtnNext;
				this.params.navigation.prevEl = thisBtnPrev;
			},
			slideChange: function () {
				var index = this.activeIndex;
				var thisWrapper = $(this.$el).parents('.swiper-with-nav');
				selectTabSlider(thisWrapper,index);
			}
		}
	});

	$('.slider-nav__tab').on('click',function (e) {
		e.preventDefault();
		var self = $(this);
		var thisWrapper = self.parents('.swiper-with-nav');
		var thisSlider = thisWrapper.find('.swiper-container').get(0).swiper;
		var index = self.index();
		thisSlider.slideTo(index);
		selectTabSlider(thisWrapper,index);
	});

	function selectTabSlider(wrapper,index) {
		var thisNavTabs = wrapper.find('.slider-nav__tab');
		thisNavTabs.removeClass('active');
		thisNavTabs.eq(index).addClass('active');
	}

	$('.swiper-with-nav').each(function () {
		selectTabSlider($(this),0);
	})
});
/***********************
Video-slider END
***********************/


/***********************
 review-doctor-slider BEGIN
 ***********************/
document.addEventListener('DOMContentLoaded',function () {
	var reviewDoctorSlider = new Swiper ('.review-doctor-slider', {
		slidesPerView: 1,
		loop: false,
		threshold: 5,
		grabCursor: true,
		watchOverflow: true,
		on: {
			init: function () {
				var thisSliderWrapper = this.el.parentElement;
				var thisBtnNext = thisSliderWrapper.querySelector('.slider-arrow--next');
				var thisBtnPrev = thisSliderWrapper.querySelector('.slider-arrow--prev');
				this.params.navigation.nextEl = thisBtnNext;
				this.params.navigation.prevEl = thisBtnPrev;
			}
		}
	});
});
/***********************
 review-doctor-slider END
 ***********************/


/***********************
 steps-slider BEGIN
 ***********************/
document.addEventListener('DOMContentLoaded',function () {
	var stepsSlider = new Swiper ('.steps-slider', {
		slidesPerView: 1,
		loop: false,
		threshold: 5,
		grabCursor: true,
		watchOverflow: true,
		autoHeight: true,
		pagination: {
			el: '.swiper-pagination-numbers',
			type: 'bullets',
			bulletClass: 'swiper-pagination-number',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '"><span>' + (index + 1) + '</span></span>';
			}
		},
		on: {
			slideChange: function () {
				var thisBullet = $(this.pagination.bullets).eq(this.activeIndex);
				thisBullet.prevAll('.swiper-pagination-number').addClass('active');
				thisBullet.nextAll('.swiper-pagination-number').removeClass('active');
			}
		}
	});

	$('.step .button--outline').on('click',function (e) {
		e.preventDefault();
		stepsSlider.slideNext();
	});
});
/***********************
 steps-slider END
 ***********************/
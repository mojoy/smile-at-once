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
		baseClass: "pb",
		smallBtn: true
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
	$(document).on('click','.scrollto', function () {
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
		autoHeight: true,
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
				if (this.isLocked){
					this.$wrapperEl.addClass('centered')
				} else {
					this.$wrapperEl.removeClass('centered')
				}
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
		autoHeight: true,
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


/***********************
Pop messages BEGIN
***********************/
function openPopMessage(id) {
	$(id).addClass('active');
	return true;
}

function closePopMessage(id) {
	$(id).removeClass('active');
	return true;
}

$(function($){
	$('.pop-message__close').on('click',function (e) {
		e.preventDefault();
		var thisPopMessageId = $(this).parents('.pop-message').attr('id');
		closePopMessage('#'+thisPopMessageId);
		console.log(thisPopMessageId);
	});
});
/***********************
Pop messages END
***********************/


/***********************
price BEGIN
***********************/
$(function($){
	//tip
	var tippyOptions = {
		content: function (reference) {
			var id = reference.getAttribute('data-tip');
			var template = document.getElementById(id);
			return template.innerHTML;
		},
		animation: 'shift-away',
		animateFill: false,
		arrow: false,
		placement: 'bottom',
		theme: 'sao',
		maxWidth: 440,
		interactive: true,
		trigger: 'click',
		zIndex: 99
	};

	if (document.querySelectorAll('[data-tip]').length > 0){
		tippy.group(tippy('[data-tip]', tippyOptions))
	}
	//tip


	$('.border-drop__header').on('click',function (e) {
		e.preventDefault();
		var thisDrop = $(this).parent('.border-drop');
		var thisDropContent = thisDrop.find('.border-drop__content');
		thisDropContent.slideToggle();
		thisDrop.toggleClass('opened');
	});

	$('.price-root__header').on('click',function (e) {
		e.preventDefault();
		var thisDrop = $(this).parent('.price-root');
		var thisDropContent = thisDrop.find('.price-root__hidden');
		thisDropContent.slideToggle();
		thisDrop.toggleClass('opened');
	});

	$('.checked-drop__header').on('click',function (e) {
		e.preventDefault();
		var thisDrop = $(this).parent('.checked-drop');
		var thisDropContent = thisDrop.find('.checked-drop__content');
		thisDropContent.slideToggle();
		thisDrop.toggleClass('opened');
	});

	function openAllPrices() {
		$('.checked-drop__content,.price-root__hidden,.border-drop__content').show();
		$('.checked-drop,.price-root,.border-drop').addClass('opened');
	}

	$('.js-open-all-prices').on('click',function (e) {
		e.preventDefault();
		openAllPrices();
	})
});
/***********************
price END
***********************/


/***********************
Price video slider BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var priceVideoSlider = new Swiper ('.price-faq-slider-thumbs', {
		slidesPerView: 'auto',
		loop: false,
		threshold: 5,
		grabCursor: true,
		watchOverflow: true,
		autoHeight: true,
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
Price video slider END
***********************/


/***********************
Price video right nav BEGIN
***********************/
$(function($){
	$('.video-nav-block').on('click',function (e) {
		e.preventDefault();
		var index = $(this).index();
		var thisNavItems = $(this).parent('.video-nav-blocks').find('.video-nav-block');
		var thisVideoBlocks = $(this).parents('.price-faq').find('.price-faq-right-nav__item');
		thisNavItems.removeClass('active').eq(index).addClass('active');
		thisVideoBlocks.removeClass('active').eq(index).addClass('active');
	})
});
/***********************
Price video right nav END
***********************/


/***********************
price video drops BEGIN
***********************/
$(function($){
	$('.price-video-drop__header').on('click',function (e) {
		e.preventDefault();
		var thisDrop = $(this).parent('.price-video-drop');
		var thisDropContent = thisDrop.find('.price-video-drop__content');
		thisDropContent.slideToggle();
		thisDrop.toggleClass('opened');
	});
});
/***********************
price video drops END
***********************/


/***********************
revnew BEGIN
***********************/
$(function($){
	if ($('.revnew-nav').length) {
		var revnewNav = new Swiper('.revnew-nav', {
			speed: 600,
			slidesPerView: 'auto',
			centeredSlides: true,
			slideToClickedSlide: true,
			watchOverflow: true,
			threshold: 2,
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

		var revnewItems = new Swiper('.revnew-list', {
			speed: 600,
			slidesPerView: 'auto',
			watchOverflow: true,
			preloadImages: false,
			lazy: true,
			threshold: 10
		});

		revnewNav.controller.control = revnewItems;
		revnewItems.controller.control = revnewNav;
	}
});
/***********************
revnew END
***********************/


/***********************
sert slider BEGIN
***********************/
$(function($){
	var sertsSlider = new Swiper('.serts-slider', {
		speed: 600,
		slidesPerView: 'auto',
		watchOverflow: true,
		watchSlidesVisibility: true,
		on: {
			init: function () {
				var thisSliderWrapper = this.el.parentElement;
				var thisBtnNext = thisSliderWrapper.querySelector('.slider-arrow--next');
				var thisBtnPrev = thisSliderWrapper.querySelector('.slider-arrow--prev');
				this.params.navigation.nextEl = thisBtnNext;
				this.params.navigation.prevEl = thisBtnPrev;
				if (this.isLocked){
					this.$wrapperEl.addClass('centered')
				} else {
					this.$wrapperEl.removeClass('centered')
				}
			}
		}
	});
});
/***********************
sert slider END
***********************/


/***********************
doctor portfolio slider BEGIN
***********************/
$(function($){
	$('.portfolio-ba').twentytwenty({
		no_overlay: true,
		move_slider_on_hover: false
	});

	var portfolioSlider = new Swiper('.portfolio-slider', {
		speed: 600,
		slidesPerView: 3,
		watchOverflow: true,
		preloadImages: true,
		watchSlidesVisibility: true,
		spaceBetween: 50,
		allowTouchMove: false,
		lazy: true,
		on: {
			init: function () {
				var thisSliderWrapper = this.el.parentElement;
				var thisBtnNext = thisSliderWrapper.querySelector('.slider-arrow--next');
				var thisBtnPrev = thisSliderWrapper.querySelector('.slider-arrow--prev');
				this.params.navigation.nextEl = thisBtnNext;
				this.params.navigation.prevEl = thisBtnPrev;
				var self = this
				setTimeout(function () {
					if (self.isLocked){
						self.$wrapperEl.addClass('centered')
					} else {
						self.$wrapperEl.removeClass('centered')
					}
				},500)
			},
			lazyImageReady: function (item,imageEl) {
				$(window).trigger("resize.twentytwenty");
			}
		},
		breakpoints: {
			1024: {
				spaceBetween: 20
			},
			640: {
				slidesPerView: 2
			},
			480: {
				slidesPerView: 1,
				spaceBetween: 10
			}
		}
	});

	var portfolioSlider4 = new Swiper('.portfolio-slider-4', {
		speed: 600,
		slidesPerView: 4,
		watchOverflow: true,
		preloadImages: true,
		watchSlidesVisibility: true,
		spaceBetween: 40,
		allowTouchMove: false,
		lazy: true,
		on: {
			init: function () {
				var thisSliderWrapper = this.el.parentElement;
				var thisBtnNext = thisSliderWrapper.querySelector('.slider-arrow--next');
				var thisBtnPrev = thisSliderWrapper.querySelector('.slider-arrow--prev');
				this.params.navigation.nextEl = thisBtnNext;
				this.params.navigation.prevEl = thisBtnPrev;
				var self = this
				setTimeout(function () {
					if (self.isLocked){
						self.$wrapperEl.addClass('centered')
					} else {
						self.$wrapperEl.removeClass('centered')
					}
				},500)
			},
			lazyImageReady: function (item,imageEl) {
				$(window).trigger("resize.twentytwenty");
			}
		},
		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			640: {
				slidesPerView: 2
			},
			480: {
				slidesPerView: 1,
				spaceBetween: 10
			}
		}
	});



});
/***********************
doctor portfolio slider END
***********************/


/***********************
doctor minivides toggle BEGIN
***********************/
$(function($){
	$('.js-minivideos-show').on('click',function () {
		$('.doctor-faq-minivideos__hidden').slideToggle();
		if ($(this).text() === "Показать еще") {
			$(this).text("Свернуть");
		} else {
			$(this).text("Показать еще");
		}
	})
});
/***********************
doctor minivides toggle END
***********************/


/***********************
 oc-solution-tip BEGIN
***********************/
$(function($){
	$('.oc-solution-tip').on('click',function (e) {
		$('.oc-solution-tip__pop').toggleClass('visible');
		e.stopPropagation();
	});

	$(document).on('click touchstart', function () {
		$('.oc-solution-tip__pop').removeClass('visible');
	});
});
/***********************
 oc-solution-tip END
***********************/


/***********************
 oc-why BEGIN
***********************/
$(function($){
	var tippyOptions = {
		content: function (reference) {
			var id = reference.getAttribute('data-tip-why');
			var template = document.getElementById(id);
			return template.innerHTML;
		},
		animation: 'shift-away',
		animateFill: false,
		arrow: false,
		placement: 'bottom',
		theme: 'sao',
		maxWidth: 440,
		interactive: true,
		trigger: 'click',
		zIndex: 99
	};

	if (document.querySelectorAll('[data-tip-why]').length > 0){
		if (window.matchMedia("(max-width: 1040px)").matches) {
			tippy.group(tippy('[data-tip-why]', tippyOptions))
		}
	}
});
/***********************
 oc-why END
***********************/


/***********************
ba filter BEGIN
***********************/
$(function($){
	$('.mob-filter-ba-opener').on('click',function (e) {
		e.preventDefault();
		$('.ba-filter-block').toggleClass('visible');
	});
});
/***********************
ba filter END
***********************/


/***********************
Truncated blocks BEGIN
***********************/
$(function($){
	$(document).on('click','.truncated-block__toggler',function (e) {
		e.preventDefault();
		var thisBlock = $(this).parent('.truncated-block');
		thisBlock.toggleClass('opened');
		if ($(this).text() === "Подробнее") {
			$(this).text("Свернуть");
		} else {
			$(this).text("Подробнее");
		}
	})
});
/***********************
Truncated blocks END
***********************/
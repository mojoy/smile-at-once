/***********************
 Mob menu BEGIN
 ***********************/
document.addEventListener('DOMContentLoaded',function () {
	var burger = document.querySelector('.burger');
	var mobPanel = document.querySelector('.mob-panel');

	burger.addEventListener('click',function (evt) {
		evt.preventDefault();
		burger.classList.toggle('active');
		mobPanel.classList.toggle('active');
		document.body.classList.toggle('stopped');
	});

	mobPanel.addEventListener('click', function(evt) {
		evt.stopPropagation();
	});
	burger.addEventListener('click', function(evt) {
		evt.stopPropagation();
	});

	document.addEventListener("click", function () {
		burger.classList.remove('active');
		mobPanel.classList.remove('active');
		document.body.classList.remove('stopped');
	});
});
/***********************
 Mob menu END
 ***********************/


/***********************
 Fixed panel BEGIN
 ***********************/
document.addEventListener('DOMContentLoaded',function () {
	var fixedPanel = document.querySelector('.main-nav');
	checkFixedPanel();

	window.onscroll = function() {
		checkFixedPanel();
	};

	function checkFixedPanel() {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		var topPanelHeight = document.querySelector('.s-top-panel').offsetHeight;
		if (scrolled > topPanelHeight){
			fixedPanel.classList.add('fixed','compensate-for-scrollbar');
		} else {
			fixedPanel.classList.remove('fixed','compensate-for-scrollbar');
		}
	}
});
/***********************
 Fixed panel END
 ***********************/


/***********************
Services menu BEGIN
***********************/
document.addEventListener('DOMContentLoaded',function () {
	var servicesLinks = document.querySelectorAll('.services-menu__category-link');
	var servicesTabs = document.querySelectorAll('.services-menu-category');
	var header = document.querySelector('.pb-header');

	for (var i = 0; i < servicesLinks.length; ++i) {
		servicesLinks[i].index = i;
		servicesLinks[i].addEventListener('click',function (e) {
			e.preventDefault();
			selectServiceTab(this.index);
		})
	}

	function selectServiceTab(index) {
		var i;
		for (i = 0; i < servicesTabs.length; ++i) {
			servicesTabs[i].classList.remove('active');
		}
		servicesTabs[index].classList.add('active');

		for (i = 0; i < servicesLinks.length; ++i) {
			servicesLinks[i].classList.remove('active');
		}
		servicesLinks[index].classList.add('active');
	}

	selectServiceTab(0);


	function setServiceTabHeigth() {
		var serviceTab = document.querySelector('.services-menu__main');
		var headerHeight = header.clientHeight;
		var maxHeight = document.body.clientHeight - headerHeight - 20;
		serviceTab.style.maxHeight = maxHeight + 'px';
	}

	setServiceTabHeigth();

	window.addEventListener('resize', function(){
		setServiceTabHeigth();
	}, true);


	var servicesMenuLink = document.querySelector('.main-nav__services-root');
	var servicesMenu = document.querySelector('.services-menu');

	function openServiceMenu() {
		document.body.classList.add('overlayed');
		servicesMenu.classList.add('active');
		servicesMenuLink.classList.add('active');
		servicesMenu.opened = true;
	}

	function closeServiceMenu() {
		document.body.classList.remove('overlayed');
		servicesMenu.classList.remove('active');
		servicesMenuLink.classList.remove('active');
		servicesMenu.opened = false;
	}

	servicesMenuLink.addEventListener('click',function (e) {
		e.preventDefault();
		if (!servicesMenu.opened){
			openServiceMenu();
		} else {
			closeServiceMenu();
		}
	});

	header.addEventListener('click', function(evt) {
		evt.stopPropagation();
	});

	document.addEventListener("click", function () {
		closeServiceMenu();
	});

	document.querySelector('.services-menu__close').addEventListener("click", function () {
		closeServiceMenu();
	});


	var subMenuIcons = document.querySelectorAll('.mob-panel .has-sub .i-down');

	for (i = 0; i < subMenuIcons.length; ++i) {
		subMenuIcons[i].addEventListener("click", function () {
			var parent = this.parentElement;
			parent.classList.toggle('opened');
		});
	}
});
/***********************
Services menu END
***********************/


/***********************
Footer menu BEGIN
***********************/
(function() {
	var block, i, j, len, len1, ref, ref1, slideToggler, trigger,
		bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
		indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	slideToggler = (function() {
		function slideToggler(el1) {
			this.el = el1;
			this.toggle = bind(this.toggle, this);
			if (!this.el) {
				return;
			}
			this.height = this.getHeight();
		}

		slideToggler.prototype.getHeight = function() {
			var clone;
			if (this.el.clientHeight > 10) {
				return this.el.clientHeight;
			}
			clone = this.el.cloneNode(true);
			clone.style.cssText = 'position: absolute; visibility: hidden; display: block;';
			this.el.parentNode.appendChild(clone);
			this.height = clone.clientHeight;
			this.el.parentNode.removeChild(clone);
			return this.height;
		};

		slideToggler.prototype.toggle = function(time) {
			var currHeight, disp, el, end, init, ref, repeat, start;
			if (!(this.height > 0)) {
				this.height = this.getHeight();
			}
			if (time == null) {
				time = this.height;
			}
			currHeight = this.el.clientHeight * (getComputedStyle(this.el).display !== 'none');
			ref = currHeight > this.height / 2 ? [this.height, 0] : [0, this.height], start = ref[0], end = ref[1];
			disp = end - start;
			el = this.el;
			this.el.classList[end === 0 ? 'remove' : 'add']('open');
			this.el.style.cssText = "overflow: hidden; display: block; padding-top: 0; padding-bottom: 0";
			init = (new Date).getTime();
			repeat = function() {
				var i, instance, ref1, repeatLoop, results, step;
				instance = (new Date).getTime() - init;
				step = start + disp * instance / time;
				if (instance <= time) {
					el.style.height = step + 'px';
				} else {
					el.style.cssText = "display: " + (end === 0 ? 'none' : 'block');
				}
				repeatLoop = requestAnimationFrame(repeat);
				if (ref1 = Math.floor(step), indexOf.call((function() {
					results = [];
					for (var i = start; start <= end ? i <= end : i >= end; start <= end ? i++ : i--){ results.push(i); }
					return results;
				}).apply(this), ref1) < 0) {
					return cancelAnimationFrame(repeatLoop);
				}
			};
			return repeat();
		};

		return slideToggler;

	})();

	ref = document.querySelectorAll('.footer-services__list ul');
	for (i = 0, len = ref.length; i < len; i++) {
		block = ref[i];
		block.toggler = new slideToggler(block);
	}

	ref1 = document.querySelectorAll('.has-sub figure');
	for (j = 0, len1 = ref1.length; j < len1; j++) {
		trigger = ref1[j];
		trigger.addEventListener('click', function() {
			var ref2;
			return (ref2 = this.parentNode.querySelector('.footer-services__list ul').toggler) != null ? ref2.toggle() : void 0;
		});
	}

}).call(this);
/***********************
 Footer menu END
 ***********************/

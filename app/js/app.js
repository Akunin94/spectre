import $ from 'jquery';
import "slick-carousel";
import noUiSlider from 'nouislider'

// JQUERY FIX +++++
jQuery.event.special.touchstart = {
	setup: function (_, ns, handle) {
		this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
	},
};
jQuery.event.special.touchmove = {
	setup: function (_, ns, handle) {
		this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
	},
};
jQuery.event.special.wheel = {
	setup: function (_, ns, handle) {
		this.addEventListener("wheel", handle, { passive: true });
	},
};
jQuery.event.special.mousewheel = {
	setup: function (_, ns, handle) {
		this.addEventListener("mousewheel", handle, { passive: true });
	},
};
// JQUERY FIX -----

$(function(){
	// BURGER START
	$(document).on('click', '.spectre-header__burger', function(){
		$('.spectre-header__popup').addClass('active');
	});
	$(document).on('click', '.spectre-header__popup-close', function(){
		$('.spectre-header__popup').removeClass('active');
	});
	// BURGER END


	// SLIDERS START
	$('.spectre-slider__slider').each(function(){
		let $slider = $(this),
			$items = $slider.find('.spectre-slider__item'),
			itemsLength = $items.length;

		if ( itemsLength > 1 ) {
			$slider.on('init', function(slick){
				$slider.append(`<div class="spectre-slider__pager"><span class="spectre-slider__current">1</span> / <span class="spectre-slider__total">${itemsLength}</span></div>`);
			});
			$slider.slick({
				dots: false,
				autoplay: true,
				autoplaySpeed: 15000,
				arrows: true,
				infinite: true,
				pauseOnHover: false,
				rows: 0,
			});
			$slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
				$slider.find('.spectre-slider__current').text(currentSlide+1);
			});
		}
	});
	// SLIDERS END

	// CALC START
	$('.spectre-calc__block-left-slider').each(function(){
		let $this = $(this),
			slider = $this.get(0),
			min = $this.data('min'),
			max = $this.data('max'),
			step = $this.data('step');

		noUiSlider.create(slider, {
			start: [min],
			step,
			range: {
				'min': [min],
				'max': [max]
			}
		});

		slider.noUiSlider.on('update', function(values){
			spectreCalc();
		});
	});

	function spectreCalc() {

	}
	// CALC END


	// SLIDER SOLO START
		let $slider = $('.spectre-slider1__slider'),
		$items = $slider.find('.spectre-slider1__item'),
		itemsLength = $items.length;

	if ( itemsLength > 1 ) {
		$slider.on('init', function(slick){
			$slider.append(`<div class="spectre-slider1__pager"><span class="spectre-slider1__current">1</span> / <span class="spectre-slider1__total">${itemsLength}</span></div>`);
		});
		$slider.slick({
			dots: false,
			autoplay: true,
			autoplaySpeed: 15000,
			arrows: true,
			infinite: true,
			pauseOnHover: false,
			rows: 0,
		});
		$slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
			$slider.find('.spectre-slider1__current').text(currentSlide+1);
		});
	}
	// SLIDER SOLO END


	// VIDEO POPUP START
	$(document).on('click', '.spectre-video__button', function(){
		let $this = $(this),
			url = $this.data('url'),
			$popup = $this.parent().find('.spectre-video__popup');
		
		$popup.html(url).addClass('active');
	});
	$(document).on('click', function (event) {
		if ($(event.target).closest('.spectre-video__popup iframe').length || $(event.target).closest('.spectre-video__button').length) return;
		
		hideVideoPopup();
		event.stopPropagation();
	});
	$(document).on('keydown', function (event) {
		if (event.which == 27 ) {
			hideVideoPopup();
		}
	});

	function hideVideoPopup() {
		$('.spectre-video__popup').html('').removeClass('active');
	}
	// VIDEO POPUP END



	// MASK START
	$('input[name=phone]').mask("8(999) 999-9999");
	// MASK END


	// POPUP FORM START
	$(".spectre-popup").on("click", function (event) {
		showForm();

		event.preventDefault();
	});
	$(".spectre-popup-form__close").on("click", function (event) {
		hideForm();
		event.preventDefault();
	});
	$(document).keydown(function (event) {
		if (event.which == 27) {
			hideForm();
		}
	});
	$(document).click(function (event) {
		if ($(event.target).closest(".spectre-popup-form__wrap").length || $(event.target).closest(".spectre-popup").length) return;
		hideForm();
		event.stopPropagation();
	});

	function hideForm() {
		$("body").removeClass("spectre-overflowhidden");
		$(".spectre-popup-form").removeClass("active");
	}
	function showForm() {
		$("body").addClass("spectre-overflowhidden");
		$(".spectre-popup-form").addClass("active");
	}
	// POPUP FORM END



	// FORM SEND START
	$('.spectre-popup-form__form, .spectre-form1-block__form').on('submit', function(){
		let $this = $(this),
			$success_block = $this.next(),
			url = $this.data('action'),
			formData = $this.serialize();

		formAjax(url, formData, $this, $success_block)

		return false;
	});
	$('.spectre-form-block__right-form').on('submit', function(){
		let $this = $(this),
			$success_block = $this.closest('.spectre-form-block').find('.spectre-form-block__left-title--success'),
			$hide_block = $this.closest('.spectre-form-block').find('>*'),
			url = $this.data('action'),
			formData = $this.serialize();

		formAjax(url, formData, $this, $success_block, $hide_block)

		return false;
	});

	function formAjax(url, formData, $form, $success_block, $hide_block) {
		$.ajax({
			type: 'post',
			url,
			data: formData,
			success: function(data) {
				$form.hide();

				if ($hide_block) {
					$hide_block.hide();
				}

				$success_block.show();
			},
			error: function(data) {
				console.error(data)
			}
		});
	}
	// FORM SEND END



	// LINKTOP START
	$(window).scroll(function(){
		if ($(this).scrollTop() >= 200 ) {
			$('.spectre-footer__linktop').addClass('active');
		} else {
			$('.spectre-footer__linktop').removeClass('active');
		}
	});
	// LINKTOP END


	// ANCHOR MENU START
	$(".spectre-header__popup-menu a, .spectre-main-block__downbutton, .spectre-info__buttonwrap-button, .spectre-footer__linktop").on(
		"click",
		function (event) {
			let position = $(this.hash).offset().top;

			if ($("body").width() < 1200) {
				position = position - 60;
			}

			$("html, body").animate({ scrollTop: position }, 800);

			$(".spectre-header__popup").removeClass("active");
			$("body").removeClass("spectre-overflowhidden");

			event.preventDefault();
		}
	);
	// ANCHOR MENU END



	// MAP START
	function init2Gis() {
		let map;

		DG.then(function () {
			map = DG.map('map', {
				center: [54.939079, 83.104059],
				zoom: 16,
				dragging : false,
				touchZoom: false,
				scrollWheelZoom: false,
				doubleClickZoom: false,
				boxZoom: false,
				geoclicker: false,
				zoomControl: false,
				fullscreenControl: false
			});

			// ЖК
			const gkMarkers = setMarkers(
				map,
				[[83.098488, 54.940199]],
				'../images/dist/logo_m.svg', true
			)

			// Супермаркеты
			const type1 = setMarkers(
				map,
				[[83.10036,54.936759], [83.101402, 54.93731], [83.102079, 54.937463], [83.102965, 54.936669], [83.103721, 54.937732], [83.10458, 54.937463], [83.10557, 54.938226], [83.106378, 54.937807], [83.106039, 54.938675], [83.105622, 54.939034], [83.106508, 54.939288]],
				'../images/dist/comp1.svg'
			)

			// Бассейн
			const type2 = setMarkers(
				map,
				[[83.100386, 54.936789], [83.10458, 54.937328], [83.105049, 54.938091], [83.107368, 54.939438]],
				'../images/dist/comp2.svg'
			)

			// Банкоматы
			const type3 = setMarkers(
				map,
				[[83.105466, 54.939288], [83.106378, 54.937163], [83.105049, 54.938091], [83.107368, 54.939438]],
				'../images/dist/comp3.svg'
			)

			// Фитнес
			const type4 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp4.svg'
			)

			// Зоотовары
			const type5 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp5.svg'
			)

			// Детские сады
			const type6 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp6.svg'
			)

			// Ледовый дворец
			const type7 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp7.svg'
			)

			// Аптеки
			const type8 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp8.svg'
			)

			// Кафе/рестораны
			const type9 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp9.svg'
			)

			// Транспорт
			const type10 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp10.svg'
			)

			// Школы/лицеи
			const type11 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp11.svg'
			)

			// Стадионы
			const type12 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp12.svg'
			)

			// Поликлиники
			const type13 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp13.svg'
			)

			// Салоны красоты
			const type14 = setMarkers(
				map,
				[[83.107629, 54.938091]],
				'../images/dist/comp14.svg'
			)

			map.fitBounds([
				[54.940732, 83.097986],
				gkMarkers.getBounds(),
				type1.getBounds(),
				type2.getBounds(),
				type3.getBounds(),
				type4.getBounds(),
				type5.getBounds(),
				type6.getBounds(),
				type7.getBounds(),
				type8.getBounds(),
				type9.getBounds(),
				type10.getBounds(),
				type11.getBounds(),
				type12.getBounds(),
				type13.getBounds(),
				type14.getBounds(),
			])

			function removeAllMarkers() {
				const groups = [
					type1, type2, type3, type4, type5, type6, type7, type8, type9, type10, type11, type12, type13, type14
				]

				groups.forEach(group => group.removeFrom(map))
			}

			$('.spectre-map__nav-item').click(function() {
				if ( $(this).hasClass('spectre-map__nav-item--all') ) {
					$('.spectre-map__nav-item').removeClass('active');
				} else {
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
				}
			})
			$('.spectre-map__nav-item--type1').click(function () {
				removeAllMarkers()
				type1.addTo(map);
			})
			$('.spectre-map__nav-item--type2').click(function () {
				removeAllMarkers()
				type2.addTo(map);
			})
			$('.spectre-map__nav-item--type3').click(function () {
				removeAllMarkers()
				type3.addTo(map);
			})
			$('.spectre-map__nav-item--type4').click(function () {
				removeAllMarkers()
				type4.addTo(map);
			})
			$('.spectre-map__nav-item--type5').click(function () {
				removeAllMarkers()
				type5.addTo(map);
			})
			$('.spectre-map__nav-item--type6').click(function () {
				removeAllMarkers()
				type6.addTo(map);
			})
			$('.spectre-map__nav-item--type7').click(function () {
				removeAllMarkers()
				type7.addTo(map);
			})
			$('.spectre-map__nav-item--type8').click(function () {
				removeAllMarkers()
				type8.addTo(map);
			})
			$('.spectre-map__nav-item--type9').click(function () {
				removeAllMarkers()
				type9.addTo(map);
			})
			$('.spectre-map__nav-item--type10').click(function () {
				removeAllMarkers()
				type10.addTo(map);
			})
			$('.spectre-map__nav-item--type11').click(function () {
				removeAllMarkers()
				type11.addTo(map);
			})
			$('.spectre-map__nav-item--type12').click(function () {
				removeAllMarkers()
				type12.addTo(map);
			})
			$('.spectre-map__nav-item--type13').click(function () {
				removeAllMarkers()
				type13.addTo(map);
			})
			$('.spectre-map__nav-item--type14').click(function () {
				removeAllMarkers()
				type14.addTo(map);
			})
			$('.spectre-map__nav-item--all').click(function () {
				removeAllMarkers()
				gkMarkers.addTo(map);
				type1.addTo(map);
				type2.addTo(map);
				type3.addTo(map);
				type4.addTo(map);
				type5.addTo(map);
				type6.addTo(map);
				type7.addTo(map);
				type8.addTo(map);
				type9.addTo(map);
				type10.addTo(map);
				type11.addTo(map);
				type12.addTo(map);
				type13.addTo(map);
				type14.addTo(map);
			})
		});
	}

	function setMarkers(map, coords, iconUrl, main = false) {
		var iconSize = [28, 28];
		if (main) {
			iconSize = [62, 62];
		}
		const markers = DG.featureGroup()
		coords.forEach(c => DG.marker([c[1], c[0]], {icon: DG.icon({iconUrl: iconUrl, iconSize: iconSize})}).addTo(markers))
		markers.addTo(map);

		return markers
	}
	
	init2Gis()
	// MAP END
});

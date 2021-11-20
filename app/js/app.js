import $ from 'jquery';
import "slick-carousel";

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


	// SKIP TO MAIN BUTTON START
	$(document).on('click', '.spectre-main-block__downbutton', function(){
		let position = $('#main').offset().top;

		if ($("body").width() < 1200) {
			position = position - 60;
		}

		$("html, body").animate({ scrollTop: position }, 800);

		return false;
	});
	// SKIP TO MAIN BUTTON END


	// SKIP TO NEXT BLOCK START
	$(document).on('click', '.spectre-info__buttonwrap-button', function(){
		let position = $(this).closest('.spectre-info').offset().top;

		if ($("body").width() < 1200) {
			position = position - 60;
		}

		$("html, body").animate({ scrollTop: position }, 800);

		return false;
	});
	// SKIP TO NEXT BLOCK END
});

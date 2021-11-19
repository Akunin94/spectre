import $ from 'jquery';

$(function(){
	// BURGER START
	$(document).on('click', '.spectre-header__burger', function(){
		$('.spectre-header__popup').addClass('active');
	});
	$(document).on('click', '.spectre-header__popup-close', function(){
		$('.spectre-header__popup').removeClass('active');
	});
	// BURGER END
});

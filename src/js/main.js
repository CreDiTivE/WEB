$(document).ready(function(){

	/* Animation of menu scroll */
	
	$("#menu, #mobile-menu").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).position().top;
		if(id !== "#About_me")
			$('body,html').animate({scrollTop: top}, 800);
	});

	/* Scroll animation of scroll to top button */
	$('#back-to-top').on('click', function(e) {
	  e.preventDefault();
	  $('html, body').animate({scrollTop:0}, '300');
	});

	/* Show and hide scroll to top button */
	window.onscroll = function scrollFunction() {
	    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	        document.getElementById("back-to-top").style.display = "block";
	    } else {
	        document.getElementById("back-to-top").style.display = "none";
	    }
	};

	/* Magnific-popup gallery zoom */

	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
   				return item.el.attr('title') + " <span style='color:#a6a6a6; margin-left: 2px;'>" + item.el.attr('alt') + "</span>";
   			}
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});


	
	// Sticky Header
	$(window).scroll(function() {

	    if ($(window).scrollTop() < 200) {
	        $('.mobile').addClass('sticky');
	    } else {
	        $('.mobile').removeClass('sticky');
	    }
	});

	// Mobile Navigation
	$('.mobile-toggle').click(function() {
	    if ($('.mobile').hasClass('open-nav')) {
	        $('.mobile').removeClass('open-nav');
	    } else {
	        $('.mobile').addClass('open-nav');
	    }
	});

	$('.mobile li a').click(function() {
	    if ($('.mobile').hasClass('open-nav')) {
	        $('.mobile').removeClass('open-nav');
	        $('.mobile').removeClass('open-nav');
	    }
	});
	
});

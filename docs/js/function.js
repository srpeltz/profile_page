/* ----------------------------------------------------------------------------------------
* Author        : Awaiken
* Template Name : Folder - Freelancer One Page Portfolio & Resume Html5 Template
* File          : Folder Custom JS
* Version       : 1.0
* ---------------------------------------------------------------------------------------- */
(function ($) {
    "use strict";

	var $window = $(window);

	/* Preloader Effect */
	$window.load(function() {
	    $(".preloader").fadeOut(500);
    });

	/* Parallax Effect */
	var $parallax=$('.parallax');
	if ($parallax.length){
		$parallax.parallax("50%", 0.5);
	}

	/* Top Menu */
	$('#navigation ul li a').on('click', function(){
		var id = $(this).attr('href');
		var h = parseFloat($(id).offset().top);
		$('body,html').stop().animate({
			scrollTop: h - 70
		}, 800);
		$(".navbar-collapse").collapse("hide");

		return false;
	});

	/* Typed subtitle */
	$('.typed-title').typed({
		stringsElement: $('.typing-title'),
		backDelay: 4000,
		typeSpeed: 0,
		loop: true
	});

	/* Animated skills Bars */
	$('#about').waypoint(function() {
		$('.skillbar').each(function() {
			$(this).find('.count-bar').animate({
			  width:$(this).attr('data-percent')
			},2000);
		});
	},{
		offset: '35%'
	});

	/* Init Counter */
    $('.counter').counterUp({ delay: 4, time: 1000 });

    /*OwlCarousels testimonial Start*/
	$('#testimonial-carousel').owlCarousel({
		loop: true,
		items: 1,
		margin: 10,
		responsiveClass: true,
	});

	/* Sticky header */
	$window.scroll(function(){
    	if ($window.scrollTop() > 200) {
			$('.navbar').addClass('sticky-header');
		} else {
			$('.navbar').removeClass('sticky-header');
		}
	});

	/*Portfolio (filtering) */
	/* Init Isotope */
	var $portfolio = $(".portfolio-boxes").isotope({
		itemSelector: ".portfolio-box",
		layoutMode: "masonry"
	});

	/* Set initial filtering */
	$window.load(function(){
		$portfolio.isotope({ filter: "*" });
	});

	/* Filter items on click */
	var $portfolionav=$(".portfolio-nav li a");
		$portfolionav.on('click', function (e) {

		var filterValue = $(this).attr('data-filter');
		$portfolio.isotope({
			filter: filterValue
		});

		$portfolionav.removeClass("active-portfolio");
		$(this).addClass("active-portfolio");
		e.preventDefault();
	});

	/* Portfolio magnific popup */
	$('.has-popup').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade'
	});


	/* Contact form validation */
	var $contactform=$("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		/* Initiate Variables With Form Content*/
		var name = $("#name").val();
		var email = $("#email").val();
		var message = $("#message").val();

		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: "name=" + name + "&email=" + email + "&message=" + message,
			success : function(text){
				if (text == "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-center text-success";
		} else {
			var msgClasses = "h3 text-center text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

})(jQuery);

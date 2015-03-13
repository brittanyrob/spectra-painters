/*
Theme Name: Eri
Description: Coming Soon
Author: Bluminethemes
Theme URI: http://bluminethemes.com/preview/themeforest/html/eri/
Author URI: http://themeforest.net/user/Bluminethemes
Version: 1.0
*/

(function($) {
	'use strict';

	/* ------------------------------------------------------------------------ */
	/*	BOOTSTRAP FIX FOR WINPHONE 8 AND IE10
	/* ------------------------------------------------------------------------ */
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style')
		msViewportStyle.appendChild(
			document.createTextNode(
				'@-ms-viewport{width:auto!important}'
			)
		)
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
	}
	
	$.browser.chrome = $.browser.webkit && !!window.chrome;
	$.browser.safari = $.browser.webkit && !window.chrome;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile');
	}
	
	if ($.browser.chrome) {
		$('body').addClass('chrome');
	}
	
	if ($.browser.safari) {
		$('body').addClass('safari');
	}

	function detectIE() {
		if ($.browser.msie && $.browser.version == 9) {
			return true;
		}
		if ($.browser.msie && $.browser.version == 8) {
			return true;
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}

	
	/* ------------------------------------------------------------------------ */
	/*	IOS
	/* ------------------------------------------------------------------------ */
	function iosdetect() {
		var deviceAgent = navigator.userAgent.toLowerCase();
		var $iOS = deviceAgent.match(/(iphone|ipod|ipad)/);
	 
		if ($iOS) {
			var vid = $('#video_background');
			var h = window.innerHeight;
			vid.css({ 'display': 'none'});
			$(window).resize(function() {
				var h = window.innerHeight;
			});
	 
			// use fancy CSS3 for hardware acceleration
		}
	};
	

	/* ------------------------------------------------------------------------ */
	/*	PRELOADER
	/* ------------------------------------------------------------------------ */
	function initPreloader() {
		var preloaderDelay = 350,
			preloaderFadeOutTime = 800;

		function hidePreloader() {
			var loadingAnimation = $('#loading-animation'),
				preloader = $('#preloader');

			loadingAnimation.fadeOut();
			preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		}

		hidePreloader();
	};

	
	/* ------------------------------------------------------------------------ */
	/*	ANIMATED ELEMENTS
	/* ------------------------------------------------------------------------ */	
	function initAnimations() {
		if( !$('body').hasClass('mobile') ) {

			$('.animated').appear();

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility': 'visible'
				});
			} else {
				$('.animated').on('appear', function() {
					var elem = $(this);
					var animation = elem.data('animation');
					if ( !elem.hasClass('visible') ) {
						var animationDelay = elem.data('animation-delay');
						if ( animationDelay ) {
							setTimeout(function(){
								elem.addClass( animation + ' visible' );
							}, animationDelay);
						} else {
							elem.addClass( animation + ' visible' );
						}
					}
				});
			};	
		};
	};
	
	function initOnLoadAnimations() {
		if( !$('body').hasClass('mobile') ) {

			$('.animated').appear();

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility': 'visible'
				});
			} else {			
				/* Starting Animation on Load */
				$('.onstart').each( function() {
					var elem = $(this);
					if ( !elem.hasClass('visible') ) {
						var animationDelay = elem.data('animation-delay');
						var animation = elem.data('animation');
						if ( animationDelay ) {
							setTimeout(function(){
								elem.addClass( animation + ' visible' );
							}, animationDelay);
						} else {
							elem.addClass( animation + ' visible' );
						}
					}
				});				
			};
		};
	};
		

	/* ------------------------------------------------------------------------ */
	/*	SECTION SCROLLBAR
	/* ------------------------------------------------------------------------ */	
	function initSectionScrollbar() {
		function setSectionScrollbar() {
			var windowWidth = getWindowWidth();
			
			if( !$('body').hasClass('mobile') || windowWidth > 1024 ) {
				$('.section').perfectScrollbar();
			};
		}
		
		setSectionScrollbar();
		
		$(window).on('resize', function () { 
			setSectionScrollbar();
		});
	};
		
		
	/* ------------------------------------------------------------------------ */
	/*	PAGE LAYOUT
	/* ------------------------------------------------------------------------ */	
	function initSectionDimensions() {
		function setSectionDimensions() {

			var section = $('section');
			var windowHeight = getWindowHeight();
			var windowWidth = getWindowWidth();
			var sections = $('section').length;
			var fullPage = $('.fullpage');
			
			fullPage.css( 'width', windowWidth * sections);
			
			section.each( function() {
				var elem = $(this);
				if ( elem.hasClass('fullscreen') ) {
					elem.css( 'height', windowHeight );
					elem.css( 'width', windowWidth );
				}
			});
		}
		
		if( !$('body').hasClass('mobile') ) {
			setSectionDimensions();
		};

		$(window).on('resize', function () { 
			setSectionDimensions();    
		});
	};
		

	/* ------------------------------------------------------------------------ */
	/*	PAGE NAVIGATION
	/* ------------------------------------------------------------------------ */	
	function initNavigation() {
		
		var windowWidth = getWindowWidth();
		
		// LOCAL SCROLL
		$.localScroll({
			hash: true,
			axis: 'xy',
			duration: 1000,
			easing: 'easeInQuart'
		});
		
		// NAVIGATION		
		$('#navigation ul li a').first().addClass('active');
		
		$('#navigation ul li a').on( 'click', function() {
			var elem = $(this);
			
			$('#navigation ul li a').removeClass('active');
			elem.addClass('active');
			
			if(windowWidth > 1024){
				$('.section').perfectScrollbar('update');
			};
		});

		// KEYBOARD SUPPORT
		$(document).keydown(function(e) {
			if(e.keyCode == 37 || e.keyCode == 40) { // left & up
				
				var currentSlide = $('#navigation ul li a.active').data('slide');
				var prevSlide = currentSlide -1;
				var allSlides = $('#navigation ul li a').length;
				
				if(prevSlide == 0) {
					$('#navigation a[data-slide='+ allSlides +']').trigger( 'click' );
				} else {
					$('#navigation a[data-slide='+ prevSlide +']').trigger( 'click' );
				}
				
			}
			else if(e.keyCode == 39 || e.keyCode == 38) { // right & down
				
				var currentSlide = $('#navigation a.active').data('slide');
				var nextSlide = currentSlide +1;
				var allSlides = $('#navigation a').length;
				var maxSlides = allSlides +1;

				if(nextSlide == maxSlides) {
					$('#navigation a[data-slide="1"]').trigger('click');
				} else {
					$('#navigation a[data-slide='+ nextSlide +']').trigger('click');
				}
				
			}
		});
		
		$('a.scroll-to').on( 'click', function() {
			var elem = $(this);
			var	href = elem.attr('href');
				
			$('#navigation ul li a').removeClass('active');
			$('#navigation ul li a[href$='+ href +']').addClass('active');
			
		});
		
		if( !$('body').hasClass('mobile') || windowWidth > 1024 ) {
			$(window).on('resize', function () {
				 $('#navigation a.active').trigger('click');
			});
		};
		
		$(window).on('resize', function () {
			if( !$('body').hasClass('mobile') || windowWidth > 1024 ) {
				$('.section').perfectScrollbar();
			};
		});

	};
	
	function initFirstNavElement() {
		$('#navigation a').first().trigger('click');
	};
	
		
	/* ------------------------------------------------------------------------ */
	/*	BACKGROUNDS
	/* ------------------------------------------------------------------------ */	
	function initPageBackground() {
		if($('body').hasClass('image-background')) { // IMAGE BACKGROUND
		
			$('body').backstretch([
				"http://placehold.it/1920x1080.jpg"
			]);
			
		} else if( $('body').hasClass('slideshow-background') ) { // SLIDESHOW BACKGROUND
		
			$('body').backstretch([
				"http://placehold.it/1920x1080.jpg",
				"http://placehold.it/1920x1080.jpg",
				"http://placehold.it/1920x1080.jpg"
			], {duration: 3000, fade: 1200});
		
		} else if($('body').hasClass('youtube-background')) { // YOUTUBE VIDEO BACKGROUND
			if($('body').hasClass('mobile')) {
				
				// Default background on mobile devices
				$('body').backstretch([
					"http://placehold.it/1920x1080.jpg"
				]);
				
			} else {
				$('.player').each(function() {
					$('.player').mb_YTPlayer();
				});
			}
		} else if($('body').hasClass('youtube-list-background')) { // YOUTUBE LIST VIDEOS BACKGROUND
			if($('body').hasClass('mobile')) {
				
				// Default background on mobile devices
				$('body').backstretch([
					"http://placehold.it/1920x1080.jpg"
				]);
				
			} else {
			
				var videos = [
					{videoURL: "0pXYp72dwl0",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true},
					{videoURL: "9d8wWcJLnFI",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:false},
					{videoURL: "nam90gorcPs",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true}
				];
				
				$('.player').YTPlaylist(videos, true);
				
			}
		} else if($('body').hasClass('mobile')) { // MOBILE BACKGROUND - Image background instead of video on mobile devices
			if($('body').hasClass('video-background')) {
				
				// Default background on mobile devices
				$('body').backstretch([
					"http://placehold.it/1920x1080.jpg"
				]);
				
			}	
		}
	};

		
	/* ------------------------------------------------------------------------ */
	/*	COUNTDOWN
	/* ------------------------------------------------------------------------ */
	function initCountdown() {
		$('#clock').countdown('2015/05/1 12:00:00').on('update.countdown', function(event) {
			var $this = $(this).html(event.strftime(''
				+ '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>'
				+ '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>'
				+ '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>'
				+ '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
			));
		});
	};
				
				
	/* ------------------------------------------------------------------------ */
	/*	MAILCHIMP
	/* ------------------------------------------------------------------------ */
	function initMailchimp() {
		$('.mailchimp').ajaxChimp({
			callback: mailchimpCallback,
			url: "mailchimp-post-url" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
		});

		function mailchimpCallback(resp) {
			 if (resp.result === 'success') {
				$('.success-message').html(resp.msg).fadeIn(1000);
				$('.error-message').fadeOut(500);
				
			} else if(resp.result === 'error') {
				$('.error-message').html(resp.msg).fadeIn(1000);
			}  
		}
					
		$('#email').focus(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});
		
		$('#email').keydown(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$('#email').on( 'click', function() {
			$('#email').val('');
		});
	};

	
	function initPlugins() {	
		/* ------------------------------------------------------------------------ */
		/*	PLACEHOLDER
		/* ------------------------------------------------------------------------ */
		$('input, textarea').placeholder();


		/* ------------------------------------------------------------------------ */
		/*	RESPONSIVE VIDEO - FITVIDS
		/* ------------------------------------------------------------------------ */
		$('.video-container').fitVids();
		
		
		/* ------------------------------------------------------------------------ */
		/*	FLEXSLIDER
		/* ------------------------------------------------------------------------ */
		$('.flexslider').flexslider({
			animation: 'fade',
			animationLoop: true,
			slideshowSpeed: 7000,
			animationSpeed: 600,
			
			controlNav: false,
			directionNav: false,
			
			keyboard: false,
			
			start: function(slider){
				$('body').removeClass('loading');
			}
		});
	};
				
	
	/* ------------------------------------------------------------------------ */
	/*	CONTACT FORM
	/* ------------------------------------------------------------------------ */
	function initContactForm() {

		var scrollElement = $('html,body');
		var	contactForm = $('.contact-form');
		var	form_msg_timeout;

		contactForm.on( 'submit', function() {

			var requiredFields = $(this).find('.required');
			var	formFields = $(this).find('input, textarea');
			var	formData = contactForm.serialize();
			var	formAction = $(this).attr('action');
			var	formSubmitMessage = $('.response-message');

			requiredFields.each(function() {

				if( $(this).val() == "" ) {

					$(this).addClass('input-error');

				} else {

					$(this).removeClass('input-error');
				}

			});

			function validateEmail(email) { 
				var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return exp.test(email);
			}

			var emailField = $('.contact-form-email');

			if( !validateEmail(emailField.val()) ) {

				emailField.addClass('input-error');

			}

			if ($('.contact-form :input').hasClass('input-error')) {
				return false;
			} else {
			
				clearTimeout(form_msg_timeout);
				
				$.post(formAction, formData, function(data) {
					formSubmitMessage.text(data);

					formFields.val('');

					form_msg_timeout = setTimeout(function() {
						formSubmitMessage.slideUp();
					}, 5000);
				});

			}

			return false;

		});

	};
	
	
	// WINDOW.LOAD FUNCTION
	$(window).on('load', function () { 
		initPreloader();
		initOnLoadAnimations();
		initFirstNavElement();
	});
	
	
	//BEGIN DOCUMENT.READY FUNCTION
	jQuery(function(){
		iosdetect();
		initAnimations();
		initSectionScrollbar();
		initSectionDimensions();
		initNavigation();
		initPageBackground();
		initCountdown();
		initMailchimp();
		initPlugins();
		initContactForm();
	});
	//END DOCUMENT.READY FUNCTION

})(jQuery);
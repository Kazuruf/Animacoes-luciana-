/**
 * theme.js
 * Scripts for the theme.
 * 
 */


jQuery(document).ready(function($){
	/*-------------------------
	Basic Theme Related Scripts	
	--------------------------*/

    $(window).load(function(){
	    // Remove the # from the hash, as different browsers may or may not include it
	    var hash = location.hash.replace('#','');

	    if(hash != ''){

	       // Clear the hash in the URL
	       // location.hash = '';   // delete front "//" if you want to change the address bar
	        $('html, body').animate({ scrollTop: $('#'+hash).offset().top-250}, 1000);

	     }else{
	     	$('html, body').animate({ scrollTop:0});
	     }
    });

	/* Menu Related*/
	$('#mobile_menu .menu-item-has-children').addClass('pushy-submenu');
	
	$('.pushy .menu-item-has-children > a').each(function(){
		$(this).after('<a href="javascript:void(0);" class="open-submeu"><i class="fa fa-plus"></i></a>');
	});
	
	$('.menu-toggle').click(function(){
		$('#close-menu').css('display','block');
	});
	
    $('.pushy ul li a.open-submeu').toggle(function(){
	  $(this).next().slideDown();
	  $(this).children('i').removeClass('fa-plus').addClass('fa-minus');
    },function(){
	  $(this).next().slideUp();
	  $(this).children('i').removeClass('fa-minus').addClass('fa-plus');
    });
	  

	//Sticky Top Bar
	var header = document.querySelector("#fx-topbar");

    if(window.location.hash) {
      header.classList.add("headroom--unpinned");
    }

    var headroom = new Headroom(header, {
        tolerance: {
          down : 10,
          up : 20
        },
        offset : 205
    });
    if($('#fx-topbar').length>0){
    	headroom.init();
	}


	
	/*Apply the post format to the comment content elements*/
	$('.comment-content').addClass('entry-content');
	
	/*Popup*/
    function fx_popup(button,obj,status){
	    $(button).on('click',function(){
	      if(status=='open'){
		   $('#fx_popup').add('.fx_popup_overlay').add(obj).fadeIn();
		   $('body').css('overflow','hidden');
		   $('#s').focus();
		  }else{
		   $('#fx_popup').add('.fx_popup_overlay').add('.popup_content').fadeOut();  
		   $('body').css('overflow','auto');
		  }
	    });
    }
    fx_popup('#product_search','#fx_search','open');
    fx_popup('#product_cart','#fx_cart','open');
    fx_popup('#fx_popup_close','#fx_popup','close');
	
	
	/*Accordion*/
    function close_accordion_section() {
        $('.fx-accordion .fx-accordion-section-title').removeClass('active');
        $('.fx-accordion .fx-accordion-section-title span').html('+');
        $('.fx-accordion .fx-accordion-section-content').slideUp(300).removeClass('open');
    }
 
    $('.fx-accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
 
        if($(e.target).is('.active')) {
            close_accordion_section();
        }else {
            close_accordion_section();
 
            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.fx-accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
            $(this).children('.fx-accordion-section-title span').html('&mdash;');
            $('html, body').animate({
	            scrollTop: $('body .fx-product-content').offset().top-100
	        }, 500);
        }
 
        e.preventDefault();
    });
    
    /*One Page Scroll*/
    $('.bullet_links,.site-header,.anchor_link').localScroll({
		target: 'body', // could be a selector or a jQuery object too.
		queue:true,
		duration:1000,
		hash:true,
		easing:'easeInOutExpo',
		offset: {left: 0, top: -50}
	});	
	
    $(window).scroll(function() {
	
			var currentNode = null;
			$('.vc_row').each(function(){
			  if($(this).attr('id')){
				var currentId = $(this).attr('id');	
				if($(window).scrollTop() >= $('#'+currentId).offset().top - 50)
				{
					currentNode = currentId;
				}
			  }
			});
			$('.bullet_links').children('a.anchor').removeClass('active');
			$('.bullet_links').find('a[href="#'+currentNode+'"]').addClass('active');
			
		});
	
     /*Masonry*/	
	 $('#grid').imagesLoaded(function() {
	      $('#grid').masonry({
	       itemSelector: '.post',
	       gutter: 10
	      });
	 });

	
	/*-------------------------
	WooCommerce Related Scripts	
	--------------------------*/
    /*When hover on the product thumbnail, display the cart button and the second image*/
	var thumbnail_width=$('.woocommerce ul.products li.product a img').width();
	var thumbnail_height=$('.woocommerce ul.products li.product a img').height();
	$('.woocommerce ul.products li.product span.product_hover_image').css({
		'width':thumbnail_width,
		'height':thumbnail_height
	});
	

    $('.fx-add-to-cart-button').on('click',function(){
          $('.added_to_cart').remove();
          $('.fx-add-to-cart-button.added').show();
    });
	
    $('.woocommerce ul.products li.product a').hover(
      function(){
        $(this).prev().show();
        $(this).children('span.product_hover_image').css('opacity',1);
      },
      function(){
        $(this).prev().hide();
        $('.fx-add-to-cart-button.added,.fx-add-to-cart-button.loading').show();
        $(this).children('span.product_hover_image').css('opacity',0);
      }
    );
    
    $('.woocommerce ul.products li.product .fx-add-to-cart-button').hover(
       function(){$(this).show();},
       function(){$(this).hide();}
    ); 
    
    var thumbnail_height=$('.woocommerce ul.products li.product a img').height();
    $('body').imagesLoaded(function(){
      $('.woocommerce ul.products li.product .fx-add-to-cart-button').css({
	    'position':'absolute',
	    'zIndex':'2',
	    'right':'10px',
	    'top':(thumbnail_height-66)+'px'
      });
    });
    
    if($('.woocommerce #content div.product div.images .thumbnails').length==0){
	    $('.woocommerce-main-image').css('width','100%');
    }
    
    if($('body').hasClass('single-product')){
	    var description_content=$('#fx-description').html();
	    if($('#fx-description').length>0 && description_content.indexOf('data-vc-full-width="true"')<0){
	      $('#fx-description').empty();
	      $('#fx-description').prepend('<div class="fx-grid-1000">'+description_content+'</div>');
	      $('#fx-description .fx-grid-1000 > .vc_row').css('margin-top','0');
	      $('#fx-description .fx-grid-1000 .vc_column-inner').css({paddingLeft:'0',paddingRight:'0'});
	    }
	    
	    $(window).imagesLoaded(function(){
	       $('#fx-description p').fadeIn();
	        $('#fx-additional_information,#fx-reviews').addClass('fx-grid-1000');	
	    });
    }

    $("a.woocommerce-review-link").on('click',function(e){
        e.preventDefault(); //Prevents hash to be appended at the end of the current URL.
        if($('#fx-reviews').css('display')=='none'){
        	$("#fx-reviews").show();
        	$("#fx-accordion-reviews").addClass('active');
        	$('#fx-accordion-reviews span').html('&mdash;');
	    }
        $('html, body').animate({
            scrollTop: $("#fx-accordion-reviews").offset().top
        }, 1000); //Change to whatever you want, this value is in milliseconds.
    });
    	
});
(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

$( document ).ready(function($) {	 
     
    /*=============================================
       onload top animated
    =============================================*/
    
    jQuery('html, body').animate({
        scrollTop: jQuery(".home").offset().top -40
    }, 1000);  
    
    
    /*=============================================
       infinity pagination start
    =============================================*/
    let nextHandler = function(pageIndex) {
        var totalItem = jQuery(".product_total_num").val(); 
        LoadAjax();//load content
        
        let frag = document.createDocumentFragment();
        let limit = 6;
        let offset = totalItem * limit;  
        
        return this.append(Array.from(frag.childNodes))
        // indicate that there is a next page to load
        .then(() => true);
    };
    
    window.ias = new InfiniteAjaxScroll('.product_list_item', {
        item: '.product_filter_post',
        next: nextHandler,
        spinner: '.loader',  
    }); 
    //infinity pagination close
    
     
    /*=============================================
       total post count
    =============================================*/
    
    function post_count(type_of_events_array, catering_location_array, catering_guests_array, min_price, max_price, per_page){ 
        jQuery.ajax({ 
            url: filter_ajax.ajax_url,   
            type: "POST", 
            data: {
                action:"post_count_ajax_action",
                selectTypeOfEvents: type_of_events_array,
		        selectCateringLocation: catering_location_array,
		        selectCateringGuests: catering_guests_array,
		        minPrice: min_price,
		        maxPrice: max_price,
            }, 
            success: function(response){ 
               //console.log(response);
               jQuery(".product_total_num").val(response);  
            },error: function(errorThrown){
                //console.log(errorThrown);
            } 
        }); 
    }  
    
	/*=============================================
        modal form submit
    =============================================*/
    $("#searchId").submit(function(event){
        event.preventDefault();  
        
        var type_of_events_array = new Array();
        var catering_location_array = new Array();
        var catering_guests_array = new Array(); 
        
        var type_of_events_array = $("input[name='search_by_location']").val();  
        var catering_location_array = $("input[name='search_by_location']").val();//same data  
        
        $(".search_list_inner input[name='catering_guests']:checked").each(function() {
            catering_guests_array.push($(this).val()); 
        }); 
        
        //guest range
        var min_price = $(".price-input input[name='min_price']").val(); 
        var max_price = $(".price-input input[name='max_price']").val(); 
       
        $(".search_list_inner input[name='catering_guests']").each(function() { 
            if((parseInt($(this).val()) >= parseInt(min_price)) && (parseInt($(this).val()) <= parseInt(max_price)) ){
                catering_guests_array.push($(this).val());
            }else{
               //catering_guests_array.push(1001);
            }
        }); 
        jQuery(".product_per_page").val( 1 ); 
        LoadAjax();
        var filter_type = 'search';
        jQuery.ajax({ 
            url: filter_ajax.ajax_url,   
            type: "POST", 
            data: {
                action:"post_count_ajax_action",
                selectTypeOfEvents: type_of_events_array,
		        selectCateringLocation: catering_location_array,
		        selectCateringGuests: catering_guests_array,
		        minPrice: min_price,
		        maxPrice: max_price,
		        filterType: filter_type,
            }, 
            success: function(response){ 
               //console.log(response);
               jQuery(".product_total_num").val(response);  
            },error: function(errorThrown){
                //console.log(errorThrown);
            } 
        }); 
        
        
    });  
	
	/*=============================================
        form submit ajax
    =============================================*/
    
    $("#FormId").submit(function(event){
        event.preventDefault(); 
        
        $("input[name='search_by_location']").val("");  
        
        var type_of_events_array = new Array();
        var catering_location_array = new Array();
        var catering_guests_array = new Array();
         
        $(".search_list_inner input[name='type_of_events']:checked").each(function() {
            type_of_events_array.push($(this).val());
        });
        
        $(".search_list_inner input[name='catering_location']:checked").each(function() {
            catering_location_array.push($(this).val());
        }); 
        
        $(".search_list_inner input[name='catering_guests']:checked").each(function() {
            catering_guests_array.push($(this).val()); 
        }); 
        
        //guest range
        var min_price = $(".price-input input[name='min_price']").val(); 
        var max_price = $(".price-input input[name='max_price']").val(); 
       
        $(".search_list_inner input[name='catering_guests']").each(function() { 
            if((parseInt($(this).val()) >= parseInt(min_price)) && (parseInt($(this).val()) <= parseInt(max_price)) ){
                catering_guests_array.push($(this).val());
            }else{
               //catering_guests_array.push(1001);
            }
        }); 
        jQuery(".product_per_page").val( 1 ); 
        LoadAjax(); 
        //post_count(type_of_events_array, catering_location_array, catering_guests_array, min_price, max_price);
         var filter_type = 'popup';
         jQuery.ajax({ 
            url: filter_ajax.ajax_url,   
            type: "POST", 
            data: {
                action:"post_count_ajax_action",
                selectTypeOfEvents: type_of_events_array,
		        selectCateringLocation: catering_location_array,
		        selectCateringGuests: catering_guests_array,
		        minPrice: min_price,
		        maxPrice: max_price,
		        filterType: filter_type
            }, 
            success: function(response){ 
               //console.log(response);
               jQuery(".product_total_num").val(response);  
            },error: function(errorThrown){
                //console.log(errorThrown);
            } 
        }); 
        
    }); 
    
    /*=============================================
        Load Ajax for pagination
    =============================================*/
    function LoadAjax(){
        var type_of_events_array    = new Array();
        var catering_location_array = new Array();
        var catering_guests_array   = new Array();
        var min_price               = '';
        var max_price               = '';
        
        //for seach
        var search_by_location = $("input[name='search_by_location']").val(); 
        if(search_by_location !=''){
            var filter_type = 'search';
            var type_of_events_array    = $("input[name='search_by_location']").val();  
            var catering_location_array = $("input[name='search_by_location']").val();//same dat
        }else{
            var filter_type = 'popup';
            $(".search_list_inner input[name='type_of_events']:checked").each(function() {
                type_of_events_array.push($(this).val());
            });
            $(".search_list_inner input[name='catering_location']:checked").each(function() {
                catering_location_array.push($(this).val());
            });
            $(".search_list_inner input[name='catering_guests']:checked").each(function() {
                catering_guests_array.push($(this).val()); 
            }); 
            
            //guest range
            var min_price = $(".price-input input[name='min_price']").val(); 
            var max_price = $(".price-input input[name='max_price']").val(); 
            
            $(".search_list_inner input[name='catering_guests']").each(function() { 
                if((parseInt($(this).val()) >= parseInt(min_price)) && (parseInt($(this).val()) <= parseInt(max_price)) ){
                    catering_guests_array.push($(this).val());
                }else{
                  // catering_guests_array.push(1001);
                }
            }); 
        } 
       
        
        var per_page = jQuery(".product_per_page").val(); 
         
        jQuery.ajax({ 
          url: filter_ajax.ajax_url, //did not same function wordpress such as ajax_url   
          type: "POST", 
          data: {
		        action:"nss_product_pagination_ajax_action",
		        selectTypeOfEvents: type_of_events_array,
		        selectCateringLocation: catering_location_array,
		        selectCateringGuests: catering_guests_array,
		        minPrice: min_price,
		        maxPrice: max_price,
		        page:     per_page,
		        filterType: filter_type,
		    },
            success: function(response){  
                
                jQuery(".no_more_data").css( "opacity", 0 );
                jQuery(".close_btn").trigger( "click" );  
                jQuery(".product_per_page").val( parseInt(per_page) + parseInt(1) ); 
                
                let no_more_response = response;
                let no_more_text = no_more_response.trim();
                 
                if(per_page == 1){ 
                    if(no_more_text != 'nodata'){  
                        jQuery("#results").html(response); 
                    }else{
                        jQuery("#results").html('No More Data'); 
                        jQuery(".no_more_data").css( "opacity", 1 ).html( "No More Data" );   
                    }
                }else{  
                    if(no_more_text != 'nodata'){  
                        jQuery("#results").append(response); 
                    }else{  
                        jQuery(".no_more_data").css( "opacity", 1 ).html( "No More Data" );   
                    }
                }
          
          },error: function(errorThrown){
            //alert(errorThrown);
          }
      
        });
    }
    
    /*====================================================
        when input min/max unched all guests checkbox
    ======================================================*/
    
    function Unchecked(){
        $(".search_list_inner input[name='catering_guests']").each(function(value, index) {
            $( ".search_list_inner input[name='catering_guests" ).prop( "checked", false );
        });
    } 
    
   
    /*=============================================
        if checked guests min/max blank input  
    =============================================*/

    $(".search_list_inner input[name='catering_guests']").click(function(value, index) {
        $( ".price-input input[name='min_price']" ).val( "" );
        $( ".price-input input[name='max_price']" ).val( "" );
    }); 
    
    /*=============================================
        enabled submit button    
    =============================================*/
    
   $('.submit_btn').prop("disabled",true);//initially submit button disabled 
    
    $('.filter_input_group input[type=checkbox]').change(function(){
        if($(this).prop('checked') === true){
           $('.submit_btn').prop("disabled",false); //enabled
        }else{
            if($(".filter_input_group input[type=checkbox]").is(':checked')){ 
                $('.submit_btn').prop("disabled",false); //enabled
            }else{ 
                $('.submit_btn').prop("disabled",true); //disabled button
            }
        }
    });
    
    function ButtonEnabled(){
        $('.submit_btn').prop("disabled",false); //disabled button
    }
    if( $(".price-input input").val() != '' ){
         ButtonEnabled();
    } 
    
    /*=============================================
        default popup click unchecked all list
    =============================================*/
    
    $('#filter_button_wrap a').click(function(){
        $('.svg-search-warp').css("display", "inherit");//search button wrapper
        $("input[name='search_by_location']").val("");//search input blank  
        //$(".filter_input_group input[type=checkbox]").prop( "checked", false );
        //$( ".price-input input[name='min_price']" ).val( "" );
        //$( ".price-input input[name='max_price']" ).val( "" );
        if($(".filter_input_group input[type=checkbox]").is(':checked')){ 
            $('.submit_btn').prop("disabled",false); //disabled button
        }else{
            $('.submit_btn').prop("disabled",true); //disabled button
        }
    });
    
    
    /*=============================================
        if max smeller then min price
    =============================================*/
   
    $(".price-input input[name=max_price]").keyup( function(){
        var min_price = $(".price-input input[name=min_price]").val();
        var max_price = $(".price-input input[name=max_price]").val();
        if(parseInt(max_price) <= parseInt(min_price) ){ 
            $('.submit_btn').prop("disabled",true); //disabled button
        }
    }); 
    
    /*=============================================
        toogle form
    =============================================*/
  
    $('.svg-search-warp').click(function(){  
        //$(".filter_submit").click(); 
        $("#search_by_location_id").focus();
        $(this).toggle("slow");
       // Get the input field 
    }); 
  
    

    //---------------modal form submit--------------- 



    
    /*=============================================
        modal progress bar -----price range open
    =============================================*/
    const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");
    let priceGap = 100;
    
    priceInput.forEach(input =>{
        input.addEventListener("input", e =>{
            Unchecked(); 
            ButtonEnabled();
            let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);
            
            if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
                if(e.target.className === "input-min"){
                    rangeInput[0].value = minPrice;
                    range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
                  
                }else{
                    rangeInput[1].value = maxPrice;
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                     
                }
               
            }
        });
    });
    
    rangeInput.forEach(input =>{
        input.addEventListener("input", e =>{
            Unchecked();
            ButtonEnabled();
            let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);
    
            if((maxVal - minVal) < priceGap){
                if(e.target.className === "range-min"){
                    rangeInput[0].value = maxVal - priceGap
                }else{
                    rangeInput[1].value = minVal + priceGap;
                } 
                  
            }else{
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;
                range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
                range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"; 
            }
        });
    });
    //price range close 
    
});//ready

})( jQuery );
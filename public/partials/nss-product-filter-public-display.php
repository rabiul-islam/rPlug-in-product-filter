<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://http://www.rabiulislam.info/
 * @since      1.0.0
 *
 * @package    Nss_Product_Filter
 * @subpackage Nss_Product_Filter/public/partials
 */
?>
    
    <!-- This file should primarily consist of HTML with a little bit of PHP. -->
    <div class="nss_product_filter_wrapper"> 
        <div class="nss_product_filter_input_filter row">
         <div class="col-md-10">
             <form method="post" id="searchId" autocomplete="off">
                <div class="svg-search-warp"><span>Search by location or outlet</span></div> 
                <input type="search" id="search_by_location_id" required="required" name="search_by_location" maxlength="50">
                <input type="submit" value="Search" class="filter_submit">
             </form>
         </div>
         <div class="col-md-2" id="filter_button_wrap">
             <a href="javascript:void(0);" data-toggle="modal" data-target="#product_filter_modal">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6667 9.33333C11.4 9.33333 12 9.93333 12 10.6667C12 11.4 11.4 12 10.6667 12H5.33333C4.6 12 4 11.4 4 10.6667C4 9.93333 4.6 9.33333 5.33333 9.33333H6.66667V5.33333C6.66667 4.6 7.26667 4 8 4C8.73333 4 9.33333 4.6 9.33333 5.33333L9.33333 9.33333H10.6667ZM9.33333 26.6667C9.33333 27.4 8.73333 28 8 28C7.26667 28 6.66667 27.4 6.66667 26.6667L6.66667 14.6667H9.33333V26.6667ZM25.3333 26.6667C25.3333 27.4 24.7333 28 24 28C23.2667 28 22.6667 27.4 22.6667 26.6667V20H25.3333V26.6667ZM26.6667 14.6667H25.3333V5.33333C25.3333 4.6 24.7333 4 24 4C23.2667 4 22.6667 4.6 22.6667 5.33333V14.6667H21.3333C20.6 14.6667 20 15.2667 20 16C20 16.7333 20.6 17.3333 21.3333 17.3333H26.6667C27.4 17.3333 28 16.7333 28 16C28 15.2667 27.4 14.6667 26.6667 14.6667ZM14.6667 22.6667H13.3333C12.6 22.6667 12 22.0667 12 21.3333C12 20.6 12.6 20 13.3333 20H18.6667C19.4 20 20 20.6 20 21.3333C20 22.0667 19.4 22.6667 18.6667 22.6667H17.3333V26.6667C17.3333 27.4 16.7333 28 16 28C15.2667 28 14.6667 27.4 14.6667 26.6667V22.6667ZM16 4C15.2667 4 14.6667 4.6 14.6667 5.33333L14.6667 17.3333H17.3333V5.33333C17.3333 4.6 16.7333 4 16 4Z" fill="#E9423F"/>
</svg>
 <span>Filter</span>
            </a>
         </div>
    </div> 
    
    <div class="spinner justify-content-center">
         <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden"></span>
        </div>
    </div>
     <?php 
        global $post;
        $args = array(
           'post_type' => 'post',
           'posts_per_page' => 300, 
        );
        $search_query = new \WP_Query( $args); 
        $total_num    =  $search_query->post_count; 
    ?>
    <input type="hidden" class="product_total_num" value="<?php echo $total_num;?>"/>
    <input type="hidden" class="product_per_page" value="1"/>
    <div class="row product_list_item" id="results"> 
    <?php 
    global $post;
    $args = array(
       'post_type' => 'post',
       'posts_per_page' => 6, 
       'orderby'         => 'id',
       'order'           => 'ASC', 
       'paged'  => 1,
    );
    $default_query = new \WP_Query( $args); 
    if( $default_query->have_posts() ) {
       while( $default_query->have_posts() ):
          $default_query->the_post(); 
          $image = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'large' );   
          ?>
    
         <div class="product_filter_post col-md-4 animated zoomIn" data-settings="{"_animation":"zoomIn","_animation_delay":9}">
            <div class="product_filter_post_inner">
                <a href="<?php the_permalink(); ?>">
                 <img src="<?php echo $image[0]; ?>" alt="<?php the_title();?>">
                </a>
                 <div class="nss_product_filter_wrapper_details"> 
                    <a href="<?php the_permalink(); ?>" title="<?php the_title();?>"><?php the_title(); ?></a>
                    <p class="location_details"><?php   
                    $excerpt = get_the_excerpt();
                    $excerpt = substr( $excerpt , 0, 80); 
                    echo $excerpt;
                    ?></p>  
                 </div>
            </div>
          </div> 
          <?php
      endwhile;
    } else {
        // no posts found
    }
    /* Restore original Post Data */
    wp_reset_postdata();
    ?> 
    </div>
    
    <div class="paginate_msg">
        <div class="no_more_data"> 
            <div class="no-more"></div> 
        </div>  
        <div class="loader"> 
            <div class="dot-pulse"></div> <span>LOADING</span>
        </div>  
    </div>
    
    </div><!--nss_product_filter_wrapper-->
     
    
    
    <!-- Modal Html-->
    <div class="modal" id="product_filter_modal">
      <div class="modal-dialog modal-lg">
        <form method="post" id="FormId"  name="filterform"  class="filterform"  >
          <div class="modal-content">
            <div class="row">
                <div class="col-lg-4">
                    <div class="search_list_inner list"> 
                      <h3>Type Of Events</h3> 
                      <div class="filter_input_group type_of_events"> 
                        <?php
                        $type_of_events_args =array( 
                          'taxonomy' => 'type_of_events',
                          'hierarchical' => 0, 
                          'orderby' => 'term_id',
                          'order'  => 'ASC'
                        );
                       
                        $type_of_events_query = get_categories($type_of_events_args);
                        foreach ($type_of_events_query as $key=>$type_of_event) { ?>                 
                          <li>
                            <input type="checkbox" name="type_of_events" id="<?php echo $type_of_event->slug; ?>" value="<?php echo $type_of_event->slug; ?>">
                            <label for="<?php echo $type_of_event->slug; ?>"><?php echo $type_of_event->name; ?></label>
                            <span class="sv_catering_types_total"><?php echo $type_of_event->category_count;?></span>
                          </li> 
                          <?php
                        }
                        ?>   
                      </div>  
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="search_list_inner last">
                      <h3>Location</h3>
                      <div class="filter_input_group catering_location"> 
                        <?php
                        $catering_location_args =array( 
                          'taxonomy' => 'catering_location',
                          'hierarchical' => 0, 
                          'orderby' => 'term_id',
                          'order'  => 'DESC'
                        );
                        $catering_location_query = get_categories($catering_location_args);
                        foreach ($catering_location_query as $key=>$location) {?> 
                         <li>                 
                          <input type="checkbox" name="catering_location" id="<?php echo $location->slug; ?>" value="<?php echo $location->slug; ?>">
                          <label for="<?php echo $location->slug; ?>"><?php echo $location->name; ?></label>
                          <span class="sv_catering_types_total"><?php echo $location->category_count;?></span>
                        </li> 
                        <?php } ?>
                      </div>
    
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="search_list_inner last">
                      <h3>Guests</h3>
                      <div class="filter_input_group catering_guests"> 
                        <?php
                        $catering_guests_args =array( 
                          'taxonomy' => 'catering_guests',
                          'hierarchical' => 0, 
                          'orderby' => 'term_id',
                          'order'  => 'ASC'
                        );
                        $catering_guests_query = get_categories($catering_guests_args);
                        foreach ($catering_guests_query as $key=>$guest) {?>
                        <li>                  
                          <input type="checkbox" name="catering_guests" id="<?php echo $guest->slug; ?>" value="<?php echo $guest->slug; ?>">
                          <label for="<?php echo $guest->slug; ?>"><?php echo $guest->name; ?></label> 
                          <span class="sv_catering_types_total"><?php echo $guest->category_count;?></span>
                        </li>
                        <?php } ?>
                      </div>
                    </div>
                    <div class="svcatering_price_range">
                        <div class="price_range_wrapper">
                          <div class="price-input">
                            <div class="field"> 
                              <input type="number" name="min_price" class="input-min keyup" placeholder="Min." value="" min="0" oninput="this.value = Math.abs(this.value)">
                            </div> 
                            <div class="field"> 
                              <input type="number" name="max_price" class="input-max keyup" placeholder="Max." value="" min="0" oninput="this.value = Math.abs(this.value)">
                            </div>
                          </div>
                          <div class="slider">
                            <div class="progress"></div>
                          </div>
                          <div class="range-input"> 
                                <input type="range" class="range-min" min="0" max="3000" value="100" step="10">
                                <input type="range" class="range-max" min="0" max="3000" value="2000" step="10"> 
                          </div>
                        </div> 
                    </div>
                    
                </div>
            </div><!--row-->
    
            <div class="btn_area text-right modal_button"> 
              <button type="button" class="btn close_btn" data-dismiss="modal" aria-hidden="true">CANCEL</button>
              <button type="submit" name="submit_btn" class="btn submit_btn"> APPLY </button>
            </div>
    
          </div>
        </form>
      </div>
    </div>
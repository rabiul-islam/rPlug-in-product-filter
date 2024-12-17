<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://http://www.rabiulislam.info/
 * @since      1.0.0
 *
 * @package    Nss_Product_Filter
 * @subpackage Nss_Product_Filter/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Nss_Product_Filter
 * @subpackage Nss_Product_Filter/includes
 * @author     Md Rabiul Islam <rabiul.islam@selise.ch>
 */
class Nss_Product_Filter_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'nss-product-filter',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
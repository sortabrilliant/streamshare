<?php
/**
 * Plugin Name:       StreamShare
 * Plugin URI:        https://sortabrilliant.com/streamshare/
 * Description:       StreamShare for Twitch is the best way to share your Twitch content on your WordPress site
 * Version:           1.1.1
 * Requires at least: 5.0
 * Requires PHP:      5.6
 * Author:            sorta brilliant
 * Author URI:        https://sortabrilliant.com/
 * License:           GPL-2.0-or-later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package StreamShare
 */

namespace SortaBrilliant\StreamShare;

/**
 * Registers the block and required assets.
 *
 * @return void
 */
function register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$asset_file = include __DIR__ . '/build/index.asset.php';

	wp_register_script(
		'stream-share',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_localize_script( 'stream-share', 'StreamShare', [
		'homeUrl' => esc_url_raw( home_url() ),
	] );

	register_block_type( 'sortabrilliant/stream-share', [
		'editor_script' => 'stream-share',
	] );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );

<?php
/**
 * Plugin Name: StreamShare
 * Plugin URI:  https://sortabrilliant.com/streamshare/
 * Description: StreamShare for Twitch is the best way to share your Twitch content on your WordPress site
 * Author:      sorta brilliant
 * Author URI:  https://sortabrilliant.com/
 * Version:     1.0.1
 * License:     GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
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

	register_block_type( 'sortabrilliant/stream-share', [
		'editor_script' => 'stream-share',
	] );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );

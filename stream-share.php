<?php
/**
 * Plugin Name: StreamShare
 * Plugin URI:  https://sortabrilliant.com/streamshare/
 * Description: StreamShare for Twitch is the best way to share your Twitch content on your WordPress site
 * Author:      sorta brilliant
 * Author URI:  https://sortabrilliant.com/
 * Version:     1.0.0
 * License:     GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package StreamShare
 */

namespace SortaBrilliant\StreamShare;

/**
 * Get the script data.
 *
 * @param string $path     File path.
 * @param string $dir      Directory.
 * @return array $data
 */
function get_script_data( $path, $dir ) {
	$pathinfo  = pathinfo( trailingslashit( $dir ) . $path );
	$file_path = "{$pathinfo['dirname']}/{$pathinfo['filename']}.asset.php";

	if ( ! file_exists( $file_path ) ) {
		return [ 'dependencies' => [], 'version' => false ];
	}

	$data = require $file_path;

	return $data;
}

/**
 * Registers the block and required assets.
 *
 * @return void
 */
function register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$script_path = 'build/index.js';
	$script_data = get_script_data( $script_path, __DIR__ );

	wp_register_script(
		'stream-share',
		plugins_url( $script_path, __FILE__ ),
		$script_data['dependencies'],
		$script_data['version'],
	);

	register_block_type( 'sortabrilliant/stream-share', [
		'editor_script' => 'stream-share',
	] );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );

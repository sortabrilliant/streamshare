/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

const { name, category, attributes } = metadata;

registerBlockType( name, {
	title: 'Twitch',
	description: 'Embed a Twitch video.',
	icon,
	keywords: [ 'stream', 'video' ],
	category,
	attributes,
	edit,
	save,
	transforms: {
		from: [
			{
				type: 'raw',
				isMatch: ( node ) => node.nodeName === 'P' && /^\s*(https?:\/\/www\.twitch.tv\/\S+)\s*$/i.test( node.textContent ),
				transform: ( node ) => {
					return createBlock( name, {
						url: node.textContent.trim(),
					} );
				},
			},
		],
	},
} );

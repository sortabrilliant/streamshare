/**
 * Internal dependencies
 */
import { findVideoType, getIframeHtml } from './util';

const save = ( { attributes } ) => {
	const type = findVideoType( attributes.url );

	if ( ! type.src ) {
		return null;
	}

	const html = getIframeHtml( type.src );

	return (
		<figure className="wp-block-embed-twitch wp-block-embed is-type-video">
			<div className="wp-block-embed__wrapper">{ html }</div>
		</figure>
	);
};

export default save;

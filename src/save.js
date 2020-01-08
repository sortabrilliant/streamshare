/**
 * Internal dependencies
 */
import { getIframeHtml } from './util';

const save = ( { attributes } ) => {
	const { src } = attributes;

	if ( ! src ) {
		return null;
	}

	const html = getIframeHtml( src );

	return (
		<figure className="wp-block-embed-twitch wp-block-embed is-type-video">
			<div className="wp-block-embed__wrapper">
				{ html }
			</div>
		</figure>
	);
};

export default save;

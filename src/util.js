const providers = [
	{
		type: 'channel',
		regex: /^https?:\/\/www\.twitch.tv\/([^\/?]+)/i,
		src: 'https://player.twitch.tv/?channel=',
	},
	{
		type: 'videos',
		regex: /^https?:\/\/www\.twitch.tv\/videos\/(\d+)/i,
		src: 'https://player.twitch.tv/?video=v',
	},
	{
		type: 'collection',
		regex: /^https?:\/\/www\.twitch.tv\/collections\/([^\/?]+)/i,
		src: 'https://player.twitch.tv/?collection=',
	},
	{
		type: 'clip',
		regex: /^https?:\/\/www\.twitch.tv\/[^\/?]+\/clip\/([^\/?]+)/i,
		src: 'https://clips.twitch.tv/embed?clip=',
	},
];

/**
 * Find video type and corresponding iframe source.
 *
 * @param {string} url Embed URL.
 * @return {Object|undefined} Embeded video information.
 */
export const findVideoType = ( url ) => {
	let type = { type: null, src: null };

	for ( const provider of providers ) {
		const [ , id ] = url.match( provider.regex ) || [];

		if ( id ) {
			type = {
				type: provider.type,
				src: `${ provider.src }${ id }&autoplay=false`,
			};
		}
	}

	// Handle case when video URL is part of the collection.
	if ( type.type === 'videos' && url.includes( '?' ) ) {
		const parts = url.split( '?' );
		const params = new URLSearchParams( parts[ 1 ] );

		if ( params.has( 'collection' ) ) {
			type = {
				type: 'collection',
				src: `https://player.twitch.tv/?collection=${ params.get(
					'collection'
				) }&autoplay=false`,
			};
		}
	}

	return type;
};

export const getIframeHtml = ( src ) => {
	return (
		<iframe
			src={ src }
			title="Embedded content from twitch.tv"
			width="640"
			height="360"
			frameBorder="0"
			scrolling="no"
			allowFullScreen={ true }
		></iframe>
	);
};

/**
 * Internal dependencies
 */
import { findVideoType } from '../util';

describe( 'sortabrilliant/stream-share', () => {
	test( 'findVideoType matches URL to video type', () => {
		const url = 'https://www.twitch.tv/videos/510127216';
		const expected = {
			type: 'videos',
			src: 'https://player.twitch.tv/?video=v510127216',
		};

		expect( findVideoType( url ) ).toEqual( expected );
	} );

	test( 'findVideoType matches URL to channel type', () => {
		const url = 'https://www.twitch.tv/backlogathon/';
		const expected = {
			type: 'channel',
			src: 'https://player.twitch.tv/?channel=backlogathon',
		};

		expect( findVideoType( url ) ).toEqual( expected );
	} );

	test( 'findVideoType matches URL to clip type', () => {
		const url =
			'https://www.twitch.tv/backlogathon/clip/BenevolentWimpyRabbitPhilosoraptor';
		const expected = {
			type: 'clip',
			src:
				'https://clips.twitch.tv/embed?clip=BenevolentWimpyRabbitPhilosoraptor',
		};

		expect( findVideoType( url ) ).toEqual( expected );
	} );

	test( 'findVideoType matches URL to collection type', () => {
		const url = 'https://www.twitch.tv/collections/VNsQ6mVT2BWRPg';
		const expected = {
			type: 'collection',
			src: 'https://player.twitch.tv/?collection=VNsQ6mVT2BWRPg',
		};

		expect( findVideoType( url ) ).toEqual( expected );
	} );

	test( 'findVideoType matches URL to video type from collection', () => {
		const url =
			'https://www.twitch.tv/videos/510127216?collection=VNsQ6mVT2BWRPg';
		const expected = {
			type: 'collection',
			src: 'https://player.twitch.tv/?collection=VNsQ6mVT2BWRPg',
		};

		expect( findVideoType( url ) ).toEqual( expected );
	} );
} );

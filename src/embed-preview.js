/**
 * Internal dependencies
 */
import { findVideoType, getIframeHtml } from './util';

/**
 * WordPress dependencies
 */
import { SandBox } from '@wordpress/components';
import { Component, renderToString } from '@wordpress/element';

class EmbedPreview extends Component {
	constructor() {
		super( ...arguments );
		this.hideOverlay = this.hideOverlay.bind( this );
		this.state = {
			interactive: false,
		};
	}

	static getDerivedStateFromProps( nextProps, state ) {
		if ( ! nextProps.isSelected && state.interactive ) {
			return { interactive: false };
		}

		return null;
	}

	hideOverlay() {
		this.setState( { interactive: true } );
	}

	render() {
		const { interactive } = this.state;

		const type = findVideoType( this.props.url );
		const html = getIframeHtml( type.src );

		/* eslint-disable jsx-a11y/no-static-element-interactions */
		const embedWrapper = (
			<div className="wp-block-embed__wrapper">
				<SandBox
					html={ renderToString( html ) }
					title="Embedded content from twitch.tv"
					onFocus={ this.hideOverlay }
				/>
				{ ! interactive && (
					<div
						className="block-library-embed__interactive-overlay"
						onMouseUp={ this.hideOverlay }
					/>
				) }
			</div>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions */

		return (
			<figure className="wp-block-embed-twitch wp-block-embed is-type-video">
				{ embedWrapper }
			</figure>
		);
	}
}

export default EmbedPreview;

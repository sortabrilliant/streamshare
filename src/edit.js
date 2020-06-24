/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { findVideoType } from './util';
import icon from './icon';
import EmbedPreview from './embed-preview';
import EmbedControls from './embed-controls';
import EmbedPlaceholder from './embed-placeholder';

class TwitchEmbedEdit extends Component {
	constructor() {
		super( ...arguments );
		this.setUrl = this.setUrl.bind( this );
		this.switchBackToURLInput = this.switchBackToURLInput.bind( this );

		this.state = {
			editingURL: false,
			url: this.props.attributes.url,
		};
	}

	setUrl( event ) {
		if ( event ) {
			event.preventDefault();
		}

		const { url } = this.state;
		const { setAttributes } = this.props;
		const { src, type } = findVideoType( url );

		this.setState( { editingURL: false } );
		setAttributes( { url, src, type } );
	}

	switchBackToURLInput() {
		this.setState( { editingURL: true } );
	}

	render() {
		const { url, editingURL } = this.state;
		const { isSelected } = this.props;
		const { src } = this.props.attributes;

		const label = 'Twitch URL';

		if ( ! src || editingURL ) {
			return (
				<EmbedPlaceholder
					icon={ icon }
					label={ label }
					onSubmit={ this.setUrl }
					value={ url }
					onChange={ ( event ) =>
						this.setState( { url: event.target.value } )
					}
				/>
			);
		}

		return (
			<>
				<EmbedControls
					showEditButton={ src }
					switchBackToURLInput={ this.switchBackToURLInput }
				/>
				<EmbedPreview
					src={ src }
					url={ url }
					isSelected={ isSelected }
					icon={ icon }
					label={ label }
				/>
			</>
		);
	}
}

export default TwitchEmbedEdit;

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
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

		this.setState( { editingURL: false } );
		setAttributes( { url } );
	}

	switchBackToURLInput() {
		this.setState( { editingURL: true } );
	}

	render() {
		const { url, editingURL } = this.state;
		const { attributes, isSelected } = this.props;

		const label = 'Twitch URL';

		if ( ! attributes.url || editingURL ) {
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
					showEditButton={ attributes.url }
					switchBackToURLInput={ this.switchBackToURLInput }
				/>
				<EmbedPreview
					url={ attributes.url }
					isSelected={ isSelected }
					icon={ icon }
					label={ label }
				/>
			</>
		);
	}
}

export default TwitchEmbedEdit;

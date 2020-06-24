/**
 * WordPress dependencies
 */
import { Button, Placeholder, ExternalLink } from '@wordpress/components';
import { BlockIcon } from '@wordpress/block-editor';

const EmbedPlaceholder = ( props ) => {
	const { icon, label, value, onSubmit, onChange } = props;

	return (
		<Placeholder
			icon={ <BlockIcon icon={ icon } showColors /> }
			label={ label }
			className="wp-block-embed"
			instructions={
				'Paste a link to the content you want to display on your site.'
			}
		>
			<form onSubmit={ onSubmit }>
				<input
					type="url"
					value={ value || '' }
					className="components-placeholder__input"
					aria-label={ label }
					placeholder={ 'Enter URL to embed here…' }
					onChange={ onChange }
				/>
				<Button isLarge type="submit">
					{ 'Embed' }
				</Button>
			</form>
			<div className="components-placeholder__learn-more">
				<ExternalLink
					href={ 'https://wordpress.org/support/article/embeds/' }
				>
					{ 'Learn more about embeds' }
				</ExternalLink>
			</div>
		</Placeholder>
	);
};

export default EmbedPlaceholder;

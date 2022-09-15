import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

/**
 * Note that the context comes from `usesContext` in block.json,
 * this is needed so the context from the query loop is passed into
 * the block.
 */
export default function Edit( {
	attributes: {
		metaKey,
		tagName
	},
	context: {
		postType,
		postId
	},
	setAttributes
} ) {
	const [ meta ] = useEntityProp( 'postType', postType, 'meta', postId );

	/**
	 * Filter out anything that is not a string.
	 *
	 * We will want to consider the following scenarios:
	 * - What do we do if the meta provides array and we want to get hold of just
	 *   one string within that array?
	 * - Do we want to consider a table block for if we want to dump out an array
	 *   of objects?
	 * - Are there other block types that might be useful?
	 */
	const metaKeys = Object.entries( meta )
		.filter( ( entry ) => typeof entry[1] === 'string' )
		.map( ( entry ) => {
			const metaIndex = entry[0];
			return { label: metaIndex, value: metaIndex } ;
		} );

	metaKeys.unshift( { label: __( 'Please Select...', 'meta-block '), value: '' } );

	const metaValue = meta[ metaKey ] || '';
	const TagName = tagName || 'span';

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				className="meta-block-settings"
				title={ __( 'Settings', 'meta-block' ) }
			>
				{ /* Not an extensive list of tags, but placed here as an example */ }
				<SelectControl
					help={ __( 'Choose the tag that should wrap the meta value.', 'meta-block' ) }
					label={ __( 'Tag', 'meta-block' ) }
					options={ [
						{ label: 'div', value: 'div' },
						{ label: 'h1', value: 'h1' },
						{ label: 'h2', value: 'h2' },
						{ label: 'h3', value: 'h3' },
						{ label: 'h4', value: 'h4' },
						{ label: 'h5', value: 'h5' },
						{ label: 'h6', value: 'h6' },
						{ label: 'p', value: 'p' },
						{ label: 'span', value: 'span' },
					] }
					value={ tagName }
					onChange={ ( tagName ) => setAttributes( { tagName } ) }
				/>
				<SelectControl
					help={ __( 'Choose the meta key that you wish to output.', 'meta-block' ) }
					label={ __( 'Meta Key', 'meta-block' ) }
					options={ metaKeys }
					value={ tagName }
					onChange={ ( metaKey ) => setAttributes( { metaKey } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);

	// If no metaValue is present we should output a placeholder block.
	return (
		<TagName { ...useBlockProps() }>
			{ inspectorControls }
			{ metaValue !== '' ? metaValue : __( 'Please select a meta key.', 'meta-block' ) }
		</TagName>
	);
}

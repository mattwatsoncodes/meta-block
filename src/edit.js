import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

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

	const metaKeys = Object.entries( meta )
		.filter( ( entry ) => typeof entry[1] === 'string' )
		.map( ( entry ) => {
			const metaIndex = entry[0];
			return { label: metaIndex, value: metaIndex } ;
		} );

	if ( ! metaKey && metaKey !== 0 && metaKeys.length > 0 ) {
		setAttributes( { metaKey: metaKeys[0].value } )
	}

	const metaValue = meta[ metaKey ] || '';
	const TagName = tagName || 'span';

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				className="meta-block-settings"
				title={ __( 'Settings', 'meta-block' ) }
			>
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

	return (
		<TagName { ...useBlockProps() }>
			{ inspectorControls }
			{ metaValue !== '' ? metaValue : __( 'Please select a meta key.', 'meta-block' ) }
		</TagName>
	);
}

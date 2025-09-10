/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useInnerBlocksProps, useBlockProps, InspectorControls } from '@wordpress/block-editor';


import {  SelectControl, Panel, PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit(props) {
	const {attributes, setAttributes} = props

	let classNames = `scrapblok-composer`

	if(attributes.hideOverflow){
		classNames += ` scrapblok-composer--hide-overflow`
	}

	const blockProps = useBlockProps({className: classNames});
	const innerBlocksProps = useInnerBlocksProps( blockProps,  {});

	return (
		<>
			<div { ...innerBlocksProps }></div>

			<InspectorControls>
				<Panel>
					<PanelBody>
						<ToggleControl
							__nextHasNoMarginBottom
							label="Hide Overflow"
							checked={ attributes?.hideOverflow }
							onChange={(newValue) => {
									setAttributes( {hideOverflow: newValue} );
							}}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
		</>
	);
}

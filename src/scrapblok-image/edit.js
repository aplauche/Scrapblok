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
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	BaseControl,
	Button,
	__experimentalUnitControl as UnitControl,
	TextControl,
	ToggleControl,
	AnglePickerControl,
	SelectControl
} from '@wordpress/components';

import CanvasPositioner from './components/CanvasPositioner';

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
export default function Edit({attributes, setAttributes}) {


	const imageId = attributes.svg.id
	const imageUrl = attributes.svg.url

	const removeMedia = () => {
		const copy = {...attributes.svg}
		copy.id = 0
		copy.url = ''
		setAttributes({
			svg: copy
		});
	}
 
	 const onSelectMedia = (media) => {
		const copy = {...attributes.svg}
		copy.id = media.id
		copy.url = media.url
		setAttributes({
			svg: copy
		});
	}

	const units = [
		{ value: 'px', label: 'px', default: 0 },
		{ value: '%', label: '%', default: 10 },
	];

	// Calculate position based on mode
	const calculatePositionStyle = () => {
		if (attributes.positionMode === 'canvas') {
			return {
				position: "absolute",
				height: attributes.height,
				width: attributes.width,
				left: `${attributes.canvasPosition.x}%`,
				top: `${attributes.canvasPosition.y}%`,
				zIndex: attributes.zIndex,
				objectFit: "contain",
				translate: "-50% -50%"
			};
		} else {
			return {
				position: "absolute",
				height: attributes.height,
				width: attributes.width,
				top: attributes.top !=  "" ? attributes.top : "unset",
				bottom: attributes.bottom !=  "" ? attributes.bottom : "unset",
				left: attributes.left !=  "" ? attributes.left : "unset",
				right: attributes.right !=  "" ? attributes.right : "unset",
				zIndex: attributes.zIndex,
				objectFit: "contain",
			};
		}
	};

	return (
		<>
		{attributes?.hideFromWorkspace ? (
			<></>
		) : (
			<div { ...useBlockProps({
				style: calculatePositionStyle()
			}) }>
				{attributes?.svg?.url && (
					<img 
						style={{
							height: "auto",
							width: "100%",
							transformOrigin: "50% 50%",
							rotate: `${attributes.rotation}deg`,
							objectFit: "contain"
						}}
						src={attributes?.svg?.url}
						alt=""
					/>
				)}
			</div>
		)}
		
		<InspectorControls>
      <Panel>
        <PanelBody>

				<BaseControl
          label={`Image File`}
          __nextHasNoMarginBottom
        >
          <MediaUploadCheck>
            <MediaUpload
              value={imageId}
              allowedTypes={ ['image'] }
              onSelect={onSelectMedia}
              render={({open}) => (
                <Button 
                  className={imageId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                  onClick={open}
                >
                  {imageId == 0 && 'Choose an image'}
                    {(imageId != 0 && imageUrl != '') && 
                      <img src={imageUrl} />
                    }
                </Button>
              )}
            />
          </MediaUploadCheck>
          {imageId != 0 && 
            <MediaUploadCheck>
              <Button style={{marginTop: "8px"}} variant='secondary' onClick={removeMedia} isDestructive>Remove image</Button>
            </MediaUploadCheck>
          }
        </BaseControl>

				<TextControl
					__nextHasNoMarginBottom
					label="Width"
					value={ attributes.width }
					onChange={ ( value ) => setAttributes({width: value}) }
        />

				<SelectControl
					__nextHasNoMarginBottom
					label={__('Position Mode', 'scrapblok')}
					value={attributes.positionMode}
					options={[
						{ label: __('Canvas', 'scrapblok'), value: 'canvas' },
						{ label: __('Manual Units', 'scrapblok'), value: 'units' }
					]}
					onChange={(value) => setAttributes({ positionMode: value })}
				/>

				{attributes.positionMode === 'canvas' ? (
					<CanvasPositioner
						canvasPosition={attributes.canvasPosition}
						onPositionChange={(newPosition) => setAttributes({ canvasPosition: newPosition })}
						parentDimensions={{ width: 16, height: 9 }}
					/>
				) : (
					<BaseControl
						label={__('Manual Positioning', 'scrapblok')}
					>
						<div className='pd__position-controls'>
							<div className='position-controls__row'>
								<UnitControl onChange={ (val) => setAttributes({top: val}) } value={ attributes.top } units={ units } />
							</div>
							<div className='position-controls__row'>
								<UnitControl onChange={ (val) => setAttributes({left: val}) } value={ attributes.left } units={ units } />
								<UnitControl onChange={ (val) => setAttributes({right: val}) } value={ attributes.right } units={ units } />
							</div>
							<div className='position-controls__row'>
								<UnitControl onChange={ (val) => setAttributes({bottom: val}) } value={ attributes.bottom } units={ units } />
							</div>
						</div>
					</BaseControl>
				)}

				<AnglePickerControl
					label='Rotation'
					style={{marginBlockEnd: "16px"}}
					value={ attributes.rotation }
					onChange={ (val) => setAttributes({rotation: val}) }
				/>

				<BaseControl
          label={`Z Index`}
        >
					<input
						style={{width: "100%"}}
						type="number"
						min={-10}
						max={100}
						value={attributes.zIndex ?? ""}
						onChange={(e) => {
							const val = e.target.value;
							if (val === "") {
								setAttributes({ zIndex: "" });
							} else {
								setAttributes({ zIndex: Number(val) });
							}
						}}
					/>
				</BaseControl>

				<BaseControl
          label={`Parallax Amount (px)`}
        >
					<input
						type="number"
						value={attributes.parallax ?? 0}
						onChange={(e) =>
							setAttributes({ parallax: parseInt(e.target.value) || 0 })
						}
					/>

					</BaseControl>

								<ToggleControl
            __nextHasNoMarginBottom
            label="Hide SVG Block from Editor"
            checked={ attributes?.hideFromWorkspace }
            onChange={ (newValue) => {
                setAttributes( {hideFromWorkspace: newValue} );
            } }
        	/>

        </PanelBody>
      </Panel>
    </InspectorControls>
		</>
	);
}

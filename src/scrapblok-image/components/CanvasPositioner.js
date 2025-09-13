import { __ } from '@wordpress/i18n';
import { useCallback, useRef } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';

export default function CanvasPositioner({
	canvasPosition,
	onPositionChange,
	parentDimensions = { width: 16, height: 9 }
}) {
	const canvasRef = useRef(null);

	const aspectRatio = parentDimensions.width / parentDimensions.height;

	const handleCanvasClick = useCallback((event) => {
		if (!canvasRef.current) return;

		const rect = canvasRef.current.getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width) * 100;
		const y = ((event.clientY - rect.top) / rect.height) * 100;

		onPositionChange({
			...canvasPosition,
			x: Math.max(0, Math.min(100, x)),
			y: Math.max(0, Math.min(100, y))
		});
	}, [canvasPosition, onPositionChange]);

	return (
		<BaseControl
			label={__('Canvas Position', 'scrapblok')}
			className="canvas-positioner"
		>
			<div className="canvas-positioner__wrapper">
				<div
					ref={canvasRef}
					className="canvas-positioner__canvas"
					style={{
						aspectRatio: aspectRatio > 0 ? aspectRatio : '16/9',
						cursor: 'crosshair'
					}}
					onClick={handleCanvasClick}
					role="button"
					tabIndex={0}
					aria-label={__('Click to position image', 'scrapblok')}
				>
					<div className="canvas-positioner__grid">
						{Array.from({ length: 3 }, (_, i) => (
							<div key={`h-${i}`} className="canvas-positioner__grid-line canvas-positioner__grid-line--horizontal" />
						))}
						{Array.from({ length: 3 }, (_, i) => (
							<div key={`v-${i}`} className="canvas-positioner__grid-line canvas-positioner__grid-line--vertical" />
						))}
					</div>

					<div
						className="canvas-positioner__position-indicator"
						style={{
							left: `${canvasPosition.x}%`,
							top: `${canvasPosition.y}%`,
							transform: 'translate(-50%, -50%)'
						}}
						aria-hidden="true"
					/>
				</div>

				<div className="canvas-positioner__info">
					<div className="canvas-positioner__coordinates">
						<strong>{__('Position:', 'scrapblok')}</strong> {canvasPosition.x.toFixed(1)}% from left, {canvasPosition.y.toFixed(1)}% from top
					</div>
					<div className="canvas-positioner__help">
						{__('Click anywhere on the canvas to position your image', 'scrapblok')}
					</div>
				</div>
			</div>
		</BaseControl>
	);
}
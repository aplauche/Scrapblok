<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Handle position based on mode
$position_mode = isset($attributes["positionMode"]) ? $attributes["positionMode"] : "canvas";

if ($position_mode === 'canvas') {
	$canvas_position = $attributes["canvasPosition"] ?? ["x" => 50, "y" => 50];
	$top = $canvas_position["y"] . "%";
	$left = $canvas_position["x"] . "%";
	$right = "unset";
	$bottom = "unset";
} else {
	$top = $attributes["top"] != "" ? $attributes["top"] : "unset";
	$left = $attributes["left"] != "" ? $attributes["left"] : "unset";
	$right =  $attributes["right"] != "" ? $attributes["right"] : "unset";
	$bottom =  $attributes["bottom"] != "" ? $attributes["bottom"] : "unset";
}

$z =  $attributes["zIndex"] != "" ? $attributes["zIndex"] : 1;
$rotation =  $attributes["rotation"] != "" ? $attributes["rotation"] : 0;


?>
<div style="
			height: <?php echo $attributes["height"] ?>;
			width: <?php echo $attributes["width"] ?>;
			top: <?php echo $top ?>;
			left: <?php echo $left ?>;
			right: <?php echo $right ?>;
			bottom: <?php echo $bottom ?>;
			z-index: <?php echo $z ?>;
			<?php echo $position_mode === "canvas" ? "translate: -50% -50%" : "" ?>
		"
	data-plax="<?php echo $attributes['parallax'] ?>"
	<?php echo get_block_wrapper_attributes(); ?>>
	<div>
		<img
			style="transform-origin: 50% 50%; rotate: <?php echo $rotation ?>deg;"
			src="<?php echo $attributes["svg"]["url"] ?>"
			alt="">
	</div>
</div>
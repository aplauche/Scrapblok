<?php

/**
 * Layer Canvas Block Template.
 * 
 * @param array      $attributes The block attributes.
 * @param string     $content The block default content.
 * @param (WP_Block) $block The block instance.
 */


$hideOverflow = $attributes['hideOverflow'];

$className = "scrapblok-composer";

if ($hideOverflow) {
	$className .= " scrapblok-composer--hide-overflow";
}

?>

<div
	<?php echo get_block_wrapper_attributes(["class" => $className]); ?>>
	<?php if (!empty($content)) : ?>
		<?php echo do_blocks($content); ?>
	<?php endif; ?>
</div>
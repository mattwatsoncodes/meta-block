<?php
/**
 * Template.
 *
 * @package @meta-block
 */

global $post;

$tag_name = $attributes['tagName'];
$meta_key = $attributes['metaKey'];
?>

<<?php echo esc_attr( $tag_name ); ?> <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo esc_html( get_post_meta( $post->ID, $meta_key, true ) ); ?>
</<?php echo esc_attr( $tag_name ); ?>>

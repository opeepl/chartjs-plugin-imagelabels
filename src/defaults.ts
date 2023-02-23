import type { ImageLabelsOptions } from './image-labels-options';
// This is the standard image-off.svg, but with a couple extra attributes:
// - <svg width="24" height="24">, this fixes an issue with Firefox being unable to draw SVGs on a canvas
// - <path fill="#BDBDBD">, a slightly gray color for the image itself
import ImageOff from './image-off.svg';

export const DEFAULT_OPTIONS = {
    display: true,
    imageSize: 48,
    images: [],
    direction: 'horizontal',
} as Required<ImageLabelsOptions>;

export const DEFAULT_IMAGES_SCALE = 'imagesScale';

export const IMAGE_PLACEHOLDER = new Image();
IMAGE_PLACEHOLDER.src = ImageOff;

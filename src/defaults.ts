import type { ImageLabelsOptions } from './image-labels-options';
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

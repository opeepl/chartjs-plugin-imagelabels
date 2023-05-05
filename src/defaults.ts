import type { ImageLabelsOptions } from './image-labels-options';
import ImageOff from './image-off.svg';

export const DEFAULT_IMAGES_SCALE = 'imagesScale';

export const DEFAULT_OPTIONS = {
    display: true,
    imageSize: 48,
    paddingClose: 10,
    paddingFar: 0,
    images: [],
    direction: 'horizontal',
    imagesScaleName: DEFAULT_IMAGES_SCALE,
    categoryScaleName: 'xAxis',
} as Required<ImageLabelsOptions>;

export const IMAGE_PLACEHOLDER = new Image();
IMAGE_PLACEHOLDER.src = ImageOff;

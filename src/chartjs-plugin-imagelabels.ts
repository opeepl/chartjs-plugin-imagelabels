import type { Chart, Plugin, Scale } from 'chart.js';
import { DEFAULT_IMAGES_SCALE, DEFAULT_OPTIONS, IMAGE_PLACEHOLDER } from './defaults';

import type { ImageLabelsOptions } from './image-labels-options';
import Utils from './utils';
import { resolve } from 'chart.js/helpers';

/**
 * ChartJS plugin that displays images across a dedicated category scale.
 *
 * Plugin configuration:
 * display:             Whether or not to display images. Default true.
 * imageSize:           Maximum size of the image. Will get shrinked if space is not enough. Default 48.
 * images:              The list of images to display above each category axis label. Null values are skipped. Default empty array.
 * direction:           The direction of the images axis. Required, no default value.
 */
export const ImageLabels: Plugin<'bar', ImageLabelsOptions> = {
    id: 'imagelabels',
    afterDataLimits(chart: Chart<'bar'>, args: { scale: Scale }, options: ImageLabelsOptions): void {
        if (args.scale.id === DEFAULT_IMAGES_SCALE) {
            // we're only interested in the images axis
            const display = resolve([options.display, DEFAULT_OPTIONS.display]);
            if (display) {
                const imageSize = resolve([options.imageSize, DEFAULT_OPTIONS.imageSize]) as number;
                const images = resolve([options.images, DEFAULT_OPTIONS.images]) as Array<HTMLImageElement>;
                const newPadding = Utils.getXImagesPadding(chart, images.length, imageSize, options.direction);
                if (chart.config.options?.scales?.[DEFAULT_IMAGES_SCALE]?.ticks) {
                    const oldPadding = chart.config.options.scales[DEFAULT_IMAGES_SCALE].ticks.padding as number;
                    if (Math.floor(newPadding) !== Math.floor(oldPadding)) {
                        chart.config.options.scales[DEFAULT_IMAGES_SCALE].ticks.padding = newPadding;
                    }
                }
            }
        }
    },
    beforeDraw(chart: Chart<'bar'>, _args: { cancelable: true }, options: ImageLabelsOptions): void {
        const display = resolve([options.display, DEFAULT_OPTIONS.display]);
        if (display) {
            const imageSize = resolve([options.imageSize, DEFAULT_OPTIONS.imageSize]) as number;
            const images = resolve([options.images, DEFAULT_OPTIONS.images]) as Array<HTMLImageElement>;

            // Maximum width & length that the images should fit in
            const maxSize = Utils.findMaxImageSize(chart, images.length, imageSize, options.direction);
            IMAGE_PLACEHOLDER.width = (maxSize * 3) / 4;
            IMAGE_PLACEHOLDER.height = (maxSize * 3) / 4;

            const isHorizontal = options.direction === 'horizontal';
            const categoryScale = isHorizontal ? chart.scales.xAxis : chart.scales.yAxis;
            const valueScale = isHorizontal ? chart.scales.yAxis : chart.scales.xAxis;

            for (let index = 0; index < categoryScale.ticks.length; index++) {
                const image = images[index];
                const x = isHorizontal ? categoryScale.getPixelForTick(index) - maxSize / 2 : valueScale.left - maxSize - 10;
                const y = isHorizontal ? valueScale.bottom + 10 : categoryScale.getPixelForTick(index) - maxSize / 2;
                if (image) {
                    Utils.drawLabelImage(chart.ctx, image, x, y, maxSize);
                } else if (image === null) {
                    Utils.drawDisabledImage(chart.ctx, IMAGE_PLACEHOLDER, x, y, maxSize);
                }
            }
        }
    },
};

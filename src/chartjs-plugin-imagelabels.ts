import { Chart, Plugin, Scale } from 'chart.js';
import { DEFAULT_IMAGES_SCALE, DEFAULT_OPTIONS, IMAGE_PLACEHOLDER } from './defaults';

import type { ImageLabelsOptions } from './image-labels-options';
import Utils from './utils';
import { resolve } from 'chart.js/helpers';

/**
 * ChartJS plugin that displays images across a dedicated category scale.
 *
 * Default configuration:
 * ```typescript
 * {
 *   display: true,
 *   imageSize: 48,
 *   paddingInner: 10,
 *   paddingOuter: 0,
 *   images: [],
 *   direction: 'horizontal',
 *   imagesScaleName: 'imagesScale',
 *   categoryScaleName: 'xAxis',
 * }
 * ```
 */
export const ImageLabels: Plugin<'bar', ImageLabelsOptions> = {
    id: 'imagelabels',
    afterDataLimits(chart: Chart<'bar'>, args: { scale: Scale }, options: ImageLabelsOptions): void {
        const { display, direction, imageSize, images, paddingInner, paddingOuter, imagesScaleName } = Utils.resolveOptions(options);
        if (args.scale.id === imagesScaleName) {
            // we're only interested in the images axis
            if (display) {
                const isHorizontal = direction === 'horizontal';
                const maxSize = Utils.findMaxImageSize(chart.scales, images.length, imageSize, options.direction);
                // Get or create required scale and its properties
                const imagesScale = chart.config.options?.scales?.[imagesScaleName] ?? {};
                imagesScale.grid = imagesScale.grid ?? {};
                imagesScale.ticks = imagesScale.ticks ?? {};
                // Set relevant imagesScale properties
                imagesScale.ticks.padding = 0;
                imagesScale.ticks.callback = (): string => '';
                if (isHorizontal) {
                    imagesScale.grid.tickLength = 0;
                    imagesScale.afterFit = (scaleInstance): void => {
                        scaleInstance.height = maxSize + paddingInner + paddingOuter;
                    };
                } else {
                    imagesScale.afterFit = (scaleInstance): void => {
                        scaleInstance.width = maxSize + paddingInner + paddingOuter;
                    };
                }
            }
        }
    },
    beforeDraw(chart: Chart<'bar'>, _args: { cancelable: true }, options: ImageLabelsOptions): void {
        const { display, direction, imageSize, images, paddingInner, paddingOuter, imagesScaleName, categoryScaleName } = Utils.resolveOptions(options);
        if (display) {
            const isHorizontal = direction === 'horizontal';
            // Maximum width & length that the images should fit in
            const maxSize = Utils.findMaxImageSize(chart.scales, images.length, imageSize, options.direction);
            IMAGE_PLACEHOLDER.width = (maxSize * 3) / 4;
            IMAGE_PLACEHOLDER.height = (maxSize * 3) / 4;
            const categoryScale = chart.scales[categoryScaleName];
            const imagesScale = chart.scales[imagesScaleName];

            for (let index = 0; index < categoryScale.ticks.length; index++) {
                const image = images[index];
                const x = isHorizontal ? categoryScale.getPixelForTick(index) - maxSize / 2 : imagesScale.left + paddingOuter;
                const y = isHorizontal ? imagesScale.top + paddingInner : categoryScale.getPixelForTick(index) - maxSize / 2;
                if (image) {
                    Utils.drawLabelImage(chart.ctx, image, x, y, maxSize);
                } else if (image === null) {
                    Utils.drawDisabledImage(chart.ctx, IMAGE_PLACEHOLDER, x, y, maxSize);
                }
            }
        }
    },
};

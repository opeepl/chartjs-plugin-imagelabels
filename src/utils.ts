import type { Chart, CoreScaleOptions, Scale } from 'chart.js';
import { DEFAULT_IMAGES_SCALE, DEFAULT_OPTIONS } from './defaults';

import GeometryUtils from './geometry-utils';
import type { ImageLabelsOptions } from './image-labels-options';
import { resolve } from 'chart.js/helpers';

export default class Utils {
    private static readonly placeholderBackgroundColor = '#E9EAED';
    private static readonly imagesScaleOffset = 10;

    /**
     * Resolves all the options to defined or default values.
     */
    public static resolveOptions(options: ImageLabelsOptions): Required<ImageLabelsOptions> {
        return {
            display: resolve([options.display, DEFAULT_OPTIONS.display]) as boolean,
            imagesScaleName: resolve([options.imagesScaleName, DEFAULT_IMAGES_SCALE]) as string,
            categoryScaleName: resolve([options.categoryScaleName, DEFAULT_OPTIONS.categoryScaleName]) as string,
            imageSize: resolve([options.imageSize, DEFAULT_OPTIONS.imageSize]) as number,
            images: resolve([options.images, DEFAULT_OPTIONS.images]) as Array<HTMLImageElement>,
            paddingInner: resolve([options.paddingInner, DEFAULT_OPTIONS.paddingInner]) as number,
            paddingOuter: resolve([options.paddingOuter, DEFAULT_OPTIONS.paddingOuter]) as number,
            direction: resolve([options.direction, DEFAULT_OPTIONS.direction]) as 'horizontal' | 'vertical',
        };
    }

    /**
     * Finds the maximum width or height of an image for the given chart, based on the number of images and a custom size limit.
     */
    public static findMaxImageSize(
        scales: Record<string, Scale<CoreScaleOptions>>,
        imageCount: number,
        configMax: number,
        direction: ImageLabelsOptions['direction'],
    ): number {
        const imagesScale = scales[DEFAULT_IMAGES_SCALE];
        const imagesScalePixelLength = direction === 'horizontal' ? imagesScale.width : imagesScale.height;

        return Math.min(configMax, imagesScalePixelLength / imageCount);
    }

    /**
     * Returns the padding to be applied to the xImages scale. This means half the estimated size of an image,
     * minus some offset to move the xAxis scale closer to this scale.
     */
    public static getXImagesPadding(chart: Chart<'bar'>, imageCount: number, configMax: number, direction: ImageLabelsOptions['direction']): number {
        const maxImageSize = Utils.findMaxImageSize(chart.scales, imageCount, configMax, direction);
        const chartAreaOffset = direction === 'horizontal' ? -Utils.imagesScaleOffset : 0;
        return maxImageSize / 2 + chartAreaOffset;
    }

    /**
     * Draws an image at the given coordinates, padded by a background if any of the image's dimensions is smaller than containerSize.
     */
    public static drawLabelImage(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, containerSize: number): void {
        this.drawBackground(context, x, y, containerSize);
        this.drawImage(context, image, x, y, containerSize);
    }

    /**
     * Draws an image at the given coordinates, padded by a grey background that has no shadows.
     */
    public static drawDisabledImage(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, containerSize: number): void {
        this.drawBackground(context, x, y, containerSize, Utils.placeholderBackgroundColor, false);
        this.drawImage(context, image, x, y, containerSize);
    }

    /**
     * Draws a white square container, optionally with shadows.
     */
    private static drawBackground(context: CanvasRenderingContext2D, x: number, y: number, size: number, color = 'white', useShadows = true): void {
        context.save();
        if (useShadows) {
            context.shadowColor = 'rgba(0, 0, 0, 6%)';
            context.shadowBlur = 2;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 1;
        }
        context.fillStyle = color;
        context.fillRect(x, y, size, size);
        context.restore();
    }

    /**
     * Draws an image at the given coordinates, centers it within the given containerSize if the image is not square, and shrinks the image if it
     * would not fit the container.
     */
    private static drawImage(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, containerSize: number): void {
        let imageWidth = image.width;
        let imageHeight = image.height;
        if (containerSize < image.width || containerSize < image.height) {
            ({ width: imageWidth, height: imageHeight } = GeometryUtils.resizeRect({ width: image.width, height: image.height }, containerSize));
        }
        const horizontalGap = Math.abs(containerSize - imageWidth);
        const verticalGap = Math.abs(containerSize - imageHeight);
        const imageX = horizontalGap / 2;
        const imageY = verticalGap / 2;

        context.drawImage(image, x + imageX, y + imageY, imageWidth, imageHeight);
    }
}

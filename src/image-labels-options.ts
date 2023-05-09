/**
 * Options for the image labels plugin.
 */
export interface ImageLabelsOptions {
    /**
     * Whether or not to display images.
     * @default true
     */
    display?: boolean;
    /**
     * Maximum size of the image. Will get shrinked if space is not enough.
     * @default 48
     */
    imageSize?: number;
    /**
     * The padding closer to the chart.
     *
     * Top padding for horizontal direction.
     * Right padding for vertical direction.
     * @default 10
     */
    paddingInner?: number;
    /**
     * The padding further from the chart.
     *
     * Bottom padding for horizontal direction.
     * Left padding for vertical direction.
     * @default 0
     */
    paddingOuter?: number;
    /**
     * The list of images to display above each category axis label. Placeholder image is used for null values.
     * @default []
     */
    images: Array<HTMLImageElement | null>;
    /**
     * The direction of the images axis.
     * @default 'horizontal'
     */
    direction: 'horizontal' | 'vertical';
    /**
     * The name of the images scale.
     * @default 'imagesScale'
     */
    imagesScaleName?: string;
    /**
     * The name of the category scale.
     * @default 'xAxis'
     */
    categoryScaleName?: string;
}

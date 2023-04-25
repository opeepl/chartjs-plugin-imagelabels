export interface ImageLabelsOptions {
    display?: boolean;
    imageSize?: number;
    /**
     * The padding closer to the chart.
     *
     * Top padding for horizontal direction.
     * Right padding for vertical direction.
     * @default 10
     */
    paddingClose?: number;
    /**
     * The padding further from the chart.
     *
     * Bottom padding for horizontal direction.
     * Left padding for vertical direction.
     * @default 0
     */
    paddingFar?: number;
    images: Array<HTMLImageElement | null>;
    direction: 'horizontal' | 'vertical';
    imagesScaleName?: string;
}

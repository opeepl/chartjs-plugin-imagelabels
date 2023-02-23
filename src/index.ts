import { ChartType } from 'chart.js';
import { ImageLabelsOptions } from './image-labels-options';

// This module augmentation allows typehinting of options in Vue files
declare module 'chart.js' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface PluginOptionsByType<TType extends ChartType> {
        imagelabels?: ImageLabelsOptions;
    }
}

export * from './chartjs-plugin-imagelabels';
export * from './image-labels-options';

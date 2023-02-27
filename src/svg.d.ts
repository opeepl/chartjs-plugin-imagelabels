/**
 * Allows us to import svg files as strings in typescript.
 *
 * Intended syntax is
 * import SvgImage from './path/to/svg-image.svg'
 */
declare module '*.svg' {
    const content: string;
    export default content;
}
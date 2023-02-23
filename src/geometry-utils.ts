type Rect = { width: number; height: number };

/**
 * Miscellaneous utilities related to geometry.
 */
export default class GeometryUtils {
    /**
     * Resizes a rectangle to fit inside a square with side length `sideMax` while preserving original aspect ratio.
     * If possible, the rectangle will be resized to the maximum possible size.
     */
    public static resizeRect(oldRect: Rect, sideMax: number): Rect {
        const aspectRatio = oldRect.width / oldRect.height;

        // Default values, a square
        let newWidth = sideMax;
        let newHeight = sideMax;
        if (aspectRatio > 1) {
            // Width is higher, so squeeze the height
            newHeight = sideMax / aspectRatio + 0.5;
        } else if (aspectRatio < 1) {
            // Height is higher, so squeeze the width
            newWidth = sideMax * aspectRatio + 0.5;
        }

        return {
            width: newWidth,
            height: newHeight,
        };
    }
}

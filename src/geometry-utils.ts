type Rect = { width: number; height: number };

/**
 * Miscellaneous utilities related to geometry.
 */
export default class GeometryUtils {
    /**
     * Resizes a rectangle while preserving its aspect ratio.
     */
    public static resizeRect(oldRect: Rect, newSize: number): Rect {
        const aspectRatio = oldRect.width / oldRect.height;

        // Default values, a square
        let newWidth = newSize;
        let newHeight = newSize;
        if (aspectRatio > 1) {
            // Width is higher, so squeeze the height
            newHeight = newSize / aspectRatio + 0.5;
        } else if (aspectRatio < 1) {
            // Height is higher, so squeeze the width
            newWidth = newSize * aspectRatio + 0.5;
        }

        return {
            width: newWidth,
            height: newHeight,
        };
    }
}

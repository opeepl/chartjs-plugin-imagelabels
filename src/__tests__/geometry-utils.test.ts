import GeometryUtils from '../geometry-utils';

describe('GeometryUtils.resizeRect', () => {
    it('should resize a square', () => {
        const oldRect = { width: 10, height: 10 };
        const newSize = 20;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(newRect.width).toBe(20);
        expect(newRect.height).toBe(20);
    });

    it('should resize a rectangle', () => {
        const oldRect = { width: 10, height: 20 };
        const newSize = 20;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(Math.floor(newRect.width)).toBe(10);
        expect(Math.floor(newRect.height)).toBe(20);
    });
});
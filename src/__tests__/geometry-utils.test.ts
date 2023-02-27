import GeometryUtils from '../geometry-utils';

describe('GeometryUtils.resizeRect', () => {
    it('should keep the size of a square', () => {
        const oldRect = { width: 10, height: 10 };
        const newSize = 10;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(newRect.width).toBe(10);
        expect(newRect.height).toBe(10);
    });

    it('should enlarge a square', () => {
        const oldRect = { width: 10, height: 10 };
        const newSize = 20;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(newRect.width).toBe(20);
        expect(newRect.height).toBe(20);
    });

    it('should shrink a square', () => {
        const oldRect = { width: 10, height: 10 };
        const newSize = 5;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(newRect.width).toBe(5);
        expect(newRect.height).toBe(5);
    });

    it('should keep the size of a rectangle (portrait)', () => {
        const oldRect = { width: 10, height: 20 };
        const newSize = 20;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(Math.floor(newRect.width)).toBe(10);
        expect(Math.floor(newRect.height)).toBe(20);
    });

    it('should enlarge a rectangle (portrait)', () => {
        const oldRect = { width: 10, height: 20 };
        const newSize = 40;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(Math.floor(newRect.width)).toBe(20);
        expect(Math.floor(newRect.height)).toBe(40);
    });

    it('should shrink a rectangle (portrait)', () => {
        const oldRect = { width: 10, height: 20 };
        const newSize = 5;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(Math.floor(newRect.width)).toBe(3);
        expect(Math.floor(newRect.height)).toBe(5);
    });

    it('should keep the size of a rectangle (landscape)', () => {
        const oldRect = { width: 20, height: 10 };
        const newSize = 20;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(Math.floor(newRect.width)).toBe(20);
        expect(Math.floor(newRect.height)).toBe(10);
    });

    it('should enlarge a rectangle (landscape)', () => {
        const oldRect = { width: 20, height: 10 };
        const newSize = 40;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(Math.floor(newRect.width)).toBe(40);
        expect(Math.floor(newRect.height)).toBe(20);
    });

    it('should shrink a rectangle (landscape)', () => {
        const oldRect = { width: 20, height: 10 };
        const newSize = 5;
        const newRect = GeometryUtils.resizeRect(oldRect, newSize);
        expect(Math.floor(newRect.width)).toBe(5);
        expect(Math.floor(newRect.height)).toBe(3);
    });
});
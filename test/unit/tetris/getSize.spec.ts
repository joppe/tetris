import { getSize } from '@tetris/tetromino/getSize';

describe('getCenter', (): void => {
    it('calculate the center of an array of vectors', (): void => {
        expect(getSize([
            { x: -10, y: -10 },
            { x: 10, y: 10 },
        ])).toEqual(21);

        expect(getSize([
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 3, y: 2 },
        ])).toEqual(4);
    });
});

import { getCenter } from '@tetris/tetromino/getCenter';

describe('getCenter', (): void => {
    it('calculate the center of an array of vectors', (): void => {
        expect(getCenter([
            { x: -10, y: -10 },
            { x: 10, y: 10 },
        ])).toEqual({x: 0, y: 0});
    });
});

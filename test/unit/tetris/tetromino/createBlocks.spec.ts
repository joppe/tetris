import { createBlocks } from '@tetris/tetromino/factory/createBlocks';

describe('createBlocks', (): void => {
    it('return an array of vectors', (): void => {
        expect(createBlocks(0x00F0)).toEqual([
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 3, y: 2 },
        ]);
    });
});

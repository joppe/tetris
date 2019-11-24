import { Tetromino } from '@tetris/tetromino/Tetromino';
import { Type } from '@tetris/tetromino/Type';

describe('Tetromino', (): void => {
    describe('center', (): void => {
        it('contains the center of the Tetromino', (): void => {
            const a: Tetromino = new Tetromino(Type.I, [
                { x: 0, y: 2 },
                { x: 1, y: 2 },
                { x: 2, y: 2 },
                { x: 3, y: 2 },
            ]);

            expect(a.center).toEqual({
                x: 2,
                y: 2,
            });
        });
    });

    describe('rotate', (): void => {
        it('rotate and return new Tetromino', (): void => {
            const a: Tetromino = new Tetromino(Type.I, [
                { x: 0, y: 2 },
                { x: 1, y: 2 },
                { x: 2, y: 2 },
                { x: 3, y: 2 },
            ]);

            const b: Tetromino = a.rotate(90);

            expect(a).not.toBe(b);
            expect(b.data.blocks).toEqual([
                { x: 1, y: 0 },
                { x: 1, y: 1 },
                { x: 1, y: 2 },
                { x: 1, y: 3 },
            ]);
        });
    })
});

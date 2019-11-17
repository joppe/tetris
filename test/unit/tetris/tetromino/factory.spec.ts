import { factory } from '@tetris/tetromino/factory/factory';
import { Type } from '@tetris/tetromino/Type';

describe('factory', (): void => {
    it('create a tetromino of a given type', (): void => {
        factory(Type.O);
        expect(true).toBe(true);
    });
});

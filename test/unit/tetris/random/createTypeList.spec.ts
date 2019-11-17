import { Type } from '@tetris/tetromino/Type';
import { createTypeList } from '@tetris/tetromino/random/createTypeList';

describe('createTypesList', (): void => {
    it('create a list of shape types', (): void => {
        expect(createTypeList(1)).toEqual([
            Type.I,
            Type.O,
            Type.T,
            Type.L,
            Type.S,
            Type.J,
            Type.Z,
        ]);

        expect(createTypeList(2)).toEqual([
            Type.I,
            Type.I,
            Type.O,
            Type.O,
            Type.T,
            Type.T,
            Type.L,
            Type.L,
            Type.S,
            Type.S,
            Type.J,
            Type.J,
            Type.Z,
            Type.Z,
        ]);
    });
});

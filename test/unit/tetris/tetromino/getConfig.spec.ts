import { getConfig } from '@tetris/tetromino/factory/getConfig';
import { Type } from '@tetris/tetromino/Type';

describe('getConfig', (): void => {
    it('return the config of the blocks in the form of a multi line string', (): void => {
        expect(getConfig(Type.I)).toBe(0x00F0);
    });
});

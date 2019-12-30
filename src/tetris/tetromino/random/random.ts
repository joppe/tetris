import { random as randomNumber } from '@apestaartje/number/dist/random';

import { createTypeList } from '@tetris/tetromino/random/createTypeList';
import { factory } from '@tetris/tetromino/factory/factory';
import { Tetromino } from '@tetris/tetromino/Tetromino';
import { Type } from '@tetris/tetromino/Type';

export const random: () => Tetromino = ((): () => Tetromino => {
    let shapes: Type[] = createTypeList(4);

    return (): Tetromino => {
        const index: number = randomNumber(0, shapes.length - 1);
        const tetromino: Tetromino = factory(shapes[index]);

        shapes.splice(index, 1);

        if (shapes.length === 0) {
            shapes = createTypeList(4);
        }

        return tetromino;
    };
})();

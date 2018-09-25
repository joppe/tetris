import * as number from '@apestaartje/number';

import { factory } from 'app/tetris/tetromino/factory';
import { Tetromino } from 'app/tetris/tetromino/Tetromino';
import { Type } from 'app/tetris/tetromino/Type';

const types: string = 'IOTLSJZ';

export function random(): Tetromino {
    const type: Type = <Type>types[number.random(0, types.length - 1)];

    return factory(type);
}

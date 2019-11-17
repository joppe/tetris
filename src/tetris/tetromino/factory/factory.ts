import { Vector } from '@apestaartje/geometry/dist/vector';

import { createBlocks } from '@tetris/tetromino/factory/createBlocks';
import { getConfig } from '@tetris/tetromino/factory/getConfig';
import { Tetromino } from '@tetris/tetromino/Tetromino';
import { Type } from '@tetris/tetromino/Type';

export function factory(type: Type): Tetromino {
    const blocks: Vector[] = createBlocks(getConfig(type));

    return new Tetromino(type, blocks);
}

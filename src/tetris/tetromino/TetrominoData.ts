import { Vector } from '@apestaartje/geometry/dist/vector';

import { Type } from '@tetris/tetromino/Type';

export interface TetrominoData {
    type: Type;
    blocks: Vector[];
}

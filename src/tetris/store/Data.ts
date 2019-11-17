import { Vector } from '@apestaartje/geometry/dist/vector';

import { Tetromino } from '@tetris/tetromino/Tetromino';

export interface Data {
    current: Tetromino;
    position: Vector;
    preview: Tetromino;
    score: number;
}

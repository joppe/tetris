import { Size } from '@apestaartje/geometry/dist/size/Size';

import { BlockConfig } from '@tetris/store/BlockConfig';
import { Cell } from '@tetris/grid/Cell';
import { TetrominoData } from '@tetris/tetromino/TetrominoData';
import { Type } from '@tetris/tetromino/Type';

export interface Data {
    current: TetrominoData | undefined;
    next: TetrominoData | undefined;
    cells: Cell<Type | undefined>[];
    score: number | undefined;
    size: Size;
    block: BlockConfig;
}

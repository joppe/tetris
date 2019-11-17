import { Data } from '@tetris/store/Data';
import { random } from '@tetris/tetromino/random/random';

export const initial: Data = {
    current: random(),
    position: { x: 0, y: 0 },
    preview: random(),
    score: 0,
};

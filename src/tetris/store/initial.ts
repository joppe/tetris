import { Data } from '@tetris/store/Data';

export const initial: Data = {
    current: undefined,
    next: undefined,
    score: undefined,
    size: { width: 10, height: 24 },
    cells: [],
    block: {
        size: 20,
        line: 3,
    },
};

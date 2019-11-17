import { range } from '@apestaartje/array/dist/iterator';

import { Type } from '@tetris/tetromino/Type';

export function createTypeList(repeat: number): Type[] {
    const list: Type[] = [];

    Object.keys(Type)
        .forEach((type: Type): void => {
            for (const index of range(1, repeat, 1)) {
                list.push(Type[type]);
            }
        });

    return list;
}

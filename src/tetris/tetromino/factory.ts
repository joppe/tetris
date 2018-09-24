import { Tetromino } from 'app/tetris/tetromino/Tetromino';
import { Type } from 'app/tetris/tetromino/Type';

export function factory(type: Type): Tetromino {
    let shape: Array<Array<boolean>>;

    switch (type) {
        case 'I':
            shape = [
                [false, false, false, false],
                [false, false, false, false],
                [true, true, true, true],
                [false, false, false, false]
            ];
            break;
        case 'O':
            shape = [
                [true, true],
                [true, true]
            ];
            break;
        case 'T':
            shape = [
                [false, false, false],
                [true, true, true],
                [false, true, false]
            ];
            break;
        case 'L':
            shape = [
                [false, false, false],
                [true, true, true],
                [true, false, false]
            ];
            break;
        case 'S':
            shape = [
                [false, false, false],
                [false, true, true],
                [true, true, false]
            ];
            break;
        case 'J':
            shape = [
                [false, false, false],
                [true, true, true],
                [false, false, true]
            ];
            break;
        case 'Z':
            shape = [
                [false, false, false],
                [true, true, false],
                [false, true, true]
            ];
            break;
        default:
            throw new Error(`Unknown type "${type}"`);
    }

    return new Tetromino(type, shape);
}

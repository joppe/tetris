import * as geometry from '@apestaartje/geometry';

import { Tetromino } from 'app/tetris/tetromino/Tetromino';
import { Type } from 'app/tetris/tetromino/Type';

const BLUE: string = '#00ffff';
const DARK_BLUE: string = '#0000ff';
const ORANGE: string = '#ffa500';
const YELLOW: string = '#ffff00';
const GREEN: string = '#00ff00';
const PINK: string = '#ff00ff';
const RED: string = '#ff0000';

export function factory(type: Type, position: geometry.point.Point): Tetromino {
    let color: string;
    let shape: Array<Array<boolean>>;

    switch (type) {
        case 'I':
            shape = [
                [false, false, false, false],
                [false, false, false, false],
                [true, true, true, true],
                [false, false, false, false]
            ];
            color = BLUE;
            break;
        case 'O':
            shape = [
                [true, true],
                [true, true]
            ];
            color = YELLOW;
            break;
        case 'T':
            shape = [
                [false, false, false],
                [true, true, true],
                [false, true, false]
            ];
            color = PINK;
            break;
        case 'L':
            shape = [
                [false, false, false],
                [true, true, true],
                [true, false, false]
            ];
            color = ORANGE;
            break;
        case 'S':
            shape = [
                [false, false, false],
                [false, true, true],
                [true, true, false]
            ];
            color = GREEN;
            break;
        case 'J':
            shape = [
                [false, false, false],
                [true, true, true],
                [false, false, true]
            ];
            color = DARK_BLUE;
            break;
        case 'Z':
            shape = [
                [false, false, false],
                [true, true, false],
                [false, true, true]
            ];
            color = RED;
            break;
        default:
            throw new Error(`Unknown type "${type}"`);
    }

    return new Tetromino(
        position,
        {
            color,
            shape
        }
    );
}

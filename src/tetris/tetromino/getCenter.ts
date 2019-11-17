import { Square } from '@apestaartje/geometry/dist/square';
import { Vector } from '@apestaartje/geometry/dist/vector';

export function getCenter(blocks: Vector[]): Vector {
    const square: Square = blocks.reduce(
        (acc: Square, point: Vector): Square => {
            return {
                topLeft: { x: Math.min(acc.topLeft.x, point.x), y: Math.min(acc.topLeft.x, point.x) },
                bottomRight: { x: Math.max(acc.topLeft.x, point.x), y: Math.max(acc.topLeft.x, point.x) },
            };
        },
        {
            topLeft: { x: 0, y: 0 },
            bottomRight: { x: 0, y: 0 },
        },
    );

    const xDistance: number = square.bottomRight.x - square.topLeft.x;
    const yDistance: number = square.bottomRight.y - square.topLeft.y;

    return {
        x: square.topLeft.x + (xDistance / 2),
        y: square.topLeft.y + (yDistance / 2),
    };
}

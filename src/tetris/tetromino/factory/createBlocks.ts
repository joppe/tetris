import { Vector } from '@apestaartje/geometry/dist/vector';

export function createBlocks(config: number): Vector[] {
    const blocks: Vector[] = [];
    let col: number = 0;
    let row: number = 0;

    for (let mask: number = 0x8000; mask > 0; mask = mask >> 1) {
        const bit: number = mask & config;

        if (bit > 0) {
            blocks.push({
                x: col,
                y: row,
            });
        }

        col += 1;

        if (col > 3) {
            col = 0;
            row += 1;
        }
    }

    return blocks;
}

import { Point } from '@apestaartje/geometry/dist/point';
import { Size } from '@apestaartje/geometry/dist/size';

import { Cell } from '@tetris/grid/Cell';
import { range } from '@apestaartje/array/dist/iterator';
import { Vector } from '@apestaartje/geometry/dist/vector';

export class Grid<T> {
    private readonly _size: Size;
    private _values: (T | undefined)[] = [];

    get width(): number {
       return this._size.width;
    }

    get height(): number {
        return this._size.height;
    }

    public constructor(size: Size) {
        this._size = size;

        this.reset();
    }

    public * getLine(y: number): IterableIterator<Cell<T | undefined>> {
        for (const x of range(0, this.width - 1, 1)) {
            yield <Cell<T | undefined>>this.getCell({
                x,
                y,
            });
        }
    }

    public getCells(): Cell<T | undefined>[] {
        return this._values.map((value: T | undefined, index: number): Cell<T | undefined> => {
            return {
                position: this.getPosition(index),
                value,
            };
        });
    }

    public getCell(position: Point): Cell<T | undefined> | undefined {
        const index: number | undefined = this.getIndex(position);

        if (index === undefined) {
            return;
        }

        return {
            position,
            value: this._values[index],
        };
    }

    public removeLines(lines: number[]): boolean {
        return [...lines]
            .sort()
            .every((y: number) => {
                return this.removeLine(y);
            });
    }

    public removeLine(y: number): boolean {
        const gapStartIndex: number | undefined = this.getIndex({ x: 0, y });
        const gapEndIndex: number | undefined = this.getIndex({ x: this.width - 1, y });

        if (gapStartIndex === undefined || gapEndIndex === undefined) {
            return false;
        }

        this._values = [
            ...this._values.slice(0, gapStartIndex),
            ...this._values.slice(gapEndIndex),
        ];

        // When a line is removed a new empty one must be added at the top.
        this._values.unshift(...this.emptyLine());

        return true;
    }

    public setCell(position: Point, value: T | undefined): boolean {
        const index: number | undefined = this.getIndex(position);

        if (index === undefined) {
            return false;
        }

        this._values[index] = value;

        return true;
    }

    public reset(): void {
        this._values = [];

        for (const y of range(0, this.height - 1, 1)) {
            this._values.push(...this.emptyLine());
        }
    }

    private emptyLine(): (T | undefined)[] {
        return Array.from({ length: this.width });
    }

    private getIndex(position: Point): number | undefined {
        const index: number = position.x + (position.y * this.width);

        if (index < 0 || index >= this._values.length) {
            return;
        }

        return index;
    }

    private getPosition(index: number): Vector {
        return {
            x: index % this.width,
            y: Math.floor(index / this.width),
        };
    }
}

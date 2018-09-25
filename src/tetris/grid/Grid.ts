import * as geometry from '@apestaartje/geometry';
import { ICell } from 'app/tetris/grid/ICell';

export class Grid<T> {
    private _size: geometry.size.Size;

    private _cells: Array<Array<T | undefined>> = [];

    get width(): number {
       return this._size.width;
    }

    get height(): number {
        return this._size.height;
    }

    constructor(size: geometry.size.Size) {
        this._size = size;

        this.reset();
    }

    public * getCells(): IterableIterator<ICell<T | undefined>> {
        for (let y: number = 0; y < this.height; y += 1) {
            for (let x: number = 0; x < this.width; x += 1) {
                yield this.getCell({
                    x,
                    y
                });
            }
        }
    }

    public * getLine(y: number): IterableIterator<ICell<T | undefined>> {
        for (let x: number = 0; x < this.width; x += 1) {
            yield this.getCell({
                x,
                y
            });
        }
    }

    public removeLines(lines: Array<number>): void {
        [...lines]
            .sort()
            .forEach((y: number) => {
                this.removeLine(y);
            });
    }

    public removeLine(y: number): void {
        this._cells = [...this._cells.slice(0, y), ...this._cells.slice(y + 1)];

        this._cells.unshift(this.emptyLine());
    }

    public getCell(position: geometry.point.Point): ICell<T | undefined> {
        return {
            position,
            value: this._cells[position.y][position.x]
        };
    }

    public setCell(position: geometry.point.Point, value: T | undefined): void {
        this._cells[position.y][position.x] = value;
    }

    public reset(): void {
        this._cells = [];

        for (let y: number = 0; y < this.height; y += 1) {
            this._cells.push(this.emptyLine());
        }
    }

    private emptyLine(): Array<T | undefined> {
        const line: Array<T | undefined> = [];

        for (let col: number = 0; col < this.width; col += 1) {
            line.push(undefined);
        }

        return line;
    }
}

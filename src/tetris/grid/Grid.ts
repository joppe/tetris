import * as geometry from '@apestaartje/geometry';

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

    public * getCells(): IterableIterator<T | undefined> {
        for (let y: number = 0; y < this.height; y += 1) {
            for (let x: number = 0; x < this.width; x += 1) {
                yield this.getCell({
                    x,
                    y
                });
            }
        }
    }

    public getCell(position: geometry.point.Point): T | undefined {
        return this._cells[position.y][position.x];
    }

    public setCell(position: geometry.point.Point, value: T | undefined): void {
        this._cells[position.y][position.x] = value;
    }

    public removeLine(amount: number = 1): void {
        for (let i: number = 0; i < amount; i += 1) {
            this._cells.pop();
            this._cells.unshift(this.emptyLine());
        }
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

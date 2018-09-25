import * as geometry from '@apestaartje/geometry';

import { Config } from 'app/tetris/Config';
import { keyboard } from 'app/tetris/control/keyboard';
import { LineCount } from 'app/tetris/element/LineCount';
import { Preview } from 'app/tetris/element/Preview';
import { Score } from 'app/tetris/element/Score';
import { Well } from 'app/tetris/element/Well';
import { Grid } from 'app/tetris/grid/Grid';
import { ICell } from 'app/tetris/grid/ICell';
import { HTMLRenderer } from 'app/tetris/render/HTMLRenderer';
import { IRenderable } from 'app/tetris/render/IRenderable';
import { random } from 'app/tetris/tetromino/random';
import { Tetromino } from 'app/tetris/tetromino/Tetromino';

export class Tetris {
    private _started: number;
    private _speed: number = 1;

    private _size: geometry.size.Size;
    private _unitSize: number;
    private _grid: Grid<IRenderable>;

    private _next: Tetromino;
    private _current: Tetromino;

    private _well: Well;
    private _preview: Preview;
    private _score: Score;
    private _lineCount: LineCount;

    constructor(config: Config) {
        this._size = config.size;
        this._unitSize = config.unitSize;

        this._grid = new Grid(this._size);

        this._well = new Well(
            new HTMLRenderer(this._unitSize, config.wellElement),
            this._size
        );
        this._score = new Score(config.scoreElement);
        this._lineCount = new LineCount(config.lineCountElement);
        this._preview = new Preview(
            new HTMLRenderer(this._unitSize, config.nextElement)
        );

        this.addControls();
    }

    public start(): void {
        if (this._started) {
            this.stop();
        } else {
            if (this._current === undefined) {
                this.place();
            }

            this._started = window.setInterval(this.tick.bind(this), 800);
        }
    }

    private stop(): void {
        window.clearInterval(this._started);

        this._started = undefined;
    }

    /**
     * A tick moves the tetromino one place down
     */
    private tick(): void {
        const offset: geometry.point.Point = {
            x: 0,
            y: 1
        };

        if (this.canMove(this._current, offset)) {
            this._current.move(offset);

            this.render();
        } else {
            this.seal(this._current);
            this.place();
        }
    }

    private seal(tetromino: Tetromino): void {
        const lines: Array<number> = [];

        tetromino.shape.forEach((s: IRenderable): void => {
            this._grid.setCell(s.position, s);

            const isLine: boolean = Array.from(this._grid.getLine(s.position.y)).every((cell: ICell<IRenderable | undefined>): boolean => {
                return cell.value !== undefined;
            });

            if (isLine) {
                lines.push(s.position.y);
            }
        });

        this._score.add(lines.length * 10);
        this._lineCount.add(lines.length);

        this._grid.removeLines(lines);

        this._current = undefined;
    }

    private render(): void {
        this._well.render(this._grid, this._current);
    }

    private place(): void {
        if (!this._next) {
            this._next = random();
        }

        this._current = this._next;
        this._current.set({
            x: Math.round((this._size.width / 2) - (this._current.size.width / 2)),
            y: 0
        });

        if (!this.canFit(this._current)) {
            this.stop();

            window.alert('Game over');

            return;
        }

        this._next = random();

        this._preview.render(this._next);

        this.render();
    }

    private move(offset: geometry.point.Point): void {
        if (this._current === undefined || this._started === undefined) {
            return;
        }

        if (this.canMove(this._current, offset)) {
            this._current.move(offset);

            this.render();
        }
    }

    private rotate(degrees: number): void {
        if (this._current === undefined || this._started === undefined) {
            return;
        }

        if (this.canRotate(this._current, degrees)) {
            this._current.rotate(degrees);

            this.render();

            return;
        }

        this._current.rotate(degrees);

        for (const offset of this.getOffsets(this._current)) {
            if (this.canMove(this._current, offset)) {
                this._current.move(offset);

                this.render();

                return;
            }
        }

        this._current.rotate(-degrees);
    }

    private getOffsets(tetromino: Tetromino): Array<geometry.point.Point> {
        const size: geometry.size.Size = tetromino.calculateSize();
        const offsets: Array<geometry.point.Point> = [];

        if (size.width > size.height) {
            const halfWidth: number = Math.floor(size.width / 2);

            for (let x: number = -1; x >= -halfWidth; x += -1) {
                offsets.push({ x, y: 0 });
            }

            for (let x: number = 1; x <= halfWidth; x += 1) {
                offsets.push({ x, y: 0 });
            }
        } else if (size.height > size.width) {
            const halfHeight: number = Math.floor(size.height / 2);

            for (let y: number = -1; y >= -halfHeight; y += -1) {
                offsets.push({ x: 0, y });
            }

            for (let y: number = 1; y <= halfHeight; y += 1) {
                offsets.push({ x: 0, y });
            }
        }

        return offsets;
    }

    private canRotate(tetromino: Tetromino, degrees: number): boolean {
        return this.shouldFit(
            this._current,
            () => this._current.rotate(degrees),
            () => this._current.rotate(-degrees)
        );
    }

    private canMove(tetromino: Tetromino, offset: geometry.point.Point): boolean {
        const oldPosition: geometry.point.Point = this._current.position;

        return this.shouldFit(
            this._current,
            () => this._current.move(offset),
            () => this._current.set(oldPosition)
        );
    }

    private shouldFit(tetromino: Tetromino, possibility: Function, rollback: Function): boolean {
        possibility();

        const isPossible: boolean = this.canFit(tetromino);

        rollback();

        return isPossible;
    }

    private canFit(tetromino: Tetromino): boolean {
        return tetromino.shape.every((v: IRenderable): boolean => {
            return (
                v.position.x >= 0 &&
                v.position.x < this._size.width &&
                v.position.y < this._size.height &&
                this._grid.getCell(v.position).value === undefined
            );
        });
    }

    private addControls(): void {
        keyboard({
            left: this.move.bind(this, {
                x: -1,
                y: 0
            }),
            right: this.move.bind(this, {
                x: 1,
                y: 0
            }),
            down: this.move.bind(this, {
                x: 0,
                y: 1
            }),
            start: this.start.bind(this),
            clockwise: this.rotate.bind(this, 90),
            counterClockwise: this.rotate.bind(this, -90)
        });
    }
}

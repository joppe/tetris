import * as geometry from '@apestaartje/geometry';

import { Config } from 'app/tetris/Config';
import { keyboard } from 'app/tetris/control/keyboard';
import { Preview } from 'app/tetris/element/Preview';
import { Score } from 'app/tetris/element/Score';
import { Well } from 'app/tetris/element/Well';
import { Grid } from 'app/tetris/grid/Grid';
import { HTMLRenderer } from 'app/tetris/render/HTMLRenderer';
import { IRenderable } from 'app/tetris/render/IRenderable';
import { random } from 'app/tetris/tetromino/random';
import { Tetromino } from 'app/tetris/tetromino/Tetromino';

export class Tetris {
    private _size: geometry.size.Size;
    private _unitSize: number;
    private _grid: Grid<IRenderable>;

    private _next: Tetromino;
    private _current: Tetromino;

    private _well: Well;
    private _preview: Preview;
    private _score: Score;

    constructor(config: Config) {
        this._size = config.size;
        this._unitSize = config.unitSize;

        this._grid = new Grid(this._size);

        this._well = new Well(
            new HTMLRenderer(this._unitSize, config.wellElement),
            this._size
        );
        this._score = new Score(config.scoreElement);
        this._preview = new Preview(
            new HTMLRenderer(this._unitSize, config.nextElement)
        );

        this.addControls();
    }

    public start(): void {
        this.place();
    }

    /**
     * A tick moves the tetromino one place down
     */
    private tick(): void {
        window.console.log('tick');
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
        this._next = random();

        this._preview.render(this._next);
        this._well.render(this._grid, this._current);
    }

    private move(offset: geometry.point.Point): void {
        if (this._current === undefined) {
            return;
        }

        const position: geometry.point.Point = {
            x: offset.x + this._current.position.x,
            y: offset.y + this._current.position.y
        };

        if (!this.canMove(this._current, position)) {
            return;
        }

        this._current.move(offset);
        this.render();
    }

    private rotate(degrees: number): void {
        if (this._current === undefined) {
            return;
        }

        this._current.rotate(degrees);
        this.render();
    }

    private canMove(tetromino: Tetromino, position: geometry.point.Point): boolean {
        const old: geometry.point.Point = tetromino.position;

        tetromino.set(position);

        if (position.x < 0 || tetromino.right >= this._size.width) {
            tetromino.set(old);

            return false;
        }

        if (tetromino.bottom > this._size.height) {
            tetromino.set(old);

            return false;
        }

        tetromino.set(old);

        return true;
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
            clockwise: this.rotate.bind(this, 90),
            counterClockwise: this.rotate.bind(this, -90)
        });
    }
}

import * as geometry from '@apestaartje/geometry';

import { Config } from 'app/tetris/Config';
import { HTMLRenderer } from 'app/tetris/render/HTMLRenderer';
import { random } from 'app/tetris/tetromino/random';
import { Tetromino } from 'app/tetris/tetromino/Tetromino';

export class Tetris {
    private _center: geometry.point.Point;
    private _size: geometry.size.Size;
    private _tetrominoSize: geometry.size.Size;
    private _wellElement: HTMLElement;
    private _nextElement: HTMLElement;
    private _scoreElement: HTMLElement;

    private _gameRenderer: HTMLRenderer;
    private _nextRenderer: HTMLRenderer;
    private _current: Tetromino;
    private _next: Tetromino;

    constructor(config: Config) {
        this._size = config.size;
        this._tetrominoSize = config.tetrominoSize;
        this._wellElement = config.wellElement;
        this._scoreElement = config.scoreElement;
        this._nextElement = config.nextElement;

        const width: number = this._size.width * this._tetrominoSize.width;
        const height: number = this._size.height * this._tetrominoSize.height;

        this._wellElement.style.width = `${width}px`;
        this._wellElement.style.height = `${height}px`;

        this._center = {
            x: Math.round((width / 2) - (this._tetrominoSize.width * 1.5)),
            y: 0
        };

        this._gameRenderer = new HTMLRenderer(
            {
                tetrominoSize: this._tetrominoSize
            },
            this._wellElement
        );

        this._nextRenderer = new HTMLRenderer(
            {
                tetrominoSize: this._tetrominoSize
            },
            this._nextElement
        );
    }

    public start(): void {
        this.place();
    }

    private place(): void {
        if (!this._next) {
            this._next = random({
                x: 0,
                y: 0
            });
        }

        this._current = this._next;
        this._next = random({
            x: 0,
            y: 0
        });

        this._current.place(this._center);
        this._gameRenderer.register(this._current);
        this._gameRenderer.render();

        this._nextRenderer.reset();
        this._nextRenderer.register(this._next);
        this._nextRenderer.render();
    }
}

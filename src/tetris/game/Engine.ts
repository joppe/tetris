import { Size } from '@apestaartje/geometry/dist/size';
import { Store } from '@apestaartje/store/dist/Store';
import { Subscription } from '@apestaartje/observable/dist/observable/Subscription';
import { Vector } from '@apestaartje/geometry/dist/vector';

import { Action } from '@tetris/control/Action';
import { Cell } from '@tetris/grid/Cell';
import { container } from '@tetris/dependency-injection/container';
import { Control } from '@tetris/control/Control';
import { Data } from '@tetris/store/Data';
import { Grid } from '@tetris/grid/Grid';
import { random } from '@tetris/tetromino/random/random';
import { Tetromino } from '@tetris/tetromino/Tetromino';
import { TetrominoData } from '@tetris/tetromino/TetrominoData';
import { Type } from '@tetris/tetromino/Type';
import { Observable } from '@apestaartje/observable/dist/observable';
import { Subject } from '@apestaartje/observable/dist/subject';

export class Engine {
    private _current: Tetromino;
    private _interval: number | undefined;
    private _next: Tetromino | undefined;
    private _subscription: Subscription;
    private readonly _control: Control;
    private readonly _grid: Grid<Type>;
    private readonly _size: Size;
    private readonly _speed: number = 1000;
    private readonly _store: Store<Data>;
    private readonly _gameOver: Subject<boolean> = new Subject();

    get gameOver(): Observable<boolean> {
        return this._gameOver.asObservable();
    }

    public constructor(size: Size, control: Control) {
        this._size = size;
        this._control = control;

        this._grid = new Grid<Type>(this._size);
        this._store = container.resolve('store');
    }

    public start(): void {
        if (this._interval !== undefined) {
            return;
        }

        this._grid.reset();
        this.generate();

        this._subscription = this._control.subscribe({
            next: (action: Action): void => {
                this.onAction(action);
            },
        });

        this._interval = window.setInterval(
            this.tick.bind(this),
            this._speed,
        );
    }

    public reset(): void {
        this._next = undefined;

        this._store.set('next', undefined);
        this._store.set('current', undefined);
        this._store.set('score', 0);
        this._store.set('cells', []);
    }

    public stop(): void {
        if (this._interval === undefined) {
            return;
        }

        this._subscription.unsubscribe();
        window.clearInterval(this._interval);
        this._interval = undefined;
    }

    private onAction(action: Action): void {
        switch (action) {
            case Action.Left:
                this.place(this._current.move({ x: -1, y: 0 }));
                break;
            case Action.Right:
                this.place(this._current.move({ x: 1, y: 0 }));
                break;
            case Action.Down:
                this.place(this._current.move({ x: 0, y: 1 }));
                break;
            case Action.ClockWise:
                this.place(this._current.rotate(90));
                break;
            case Action.CounterClockWise:
                this.place(this._current.rotate(-90));
                break;
        }
    }

    private tick(): void {
        if (this.place(this._current.move({ x: 0, y: 1 }))) {
            return;
        }

        this.seal();

        if (this.generate()) {
            return;
        }

        this.stop();
        this._gameOver.next(true);
    }

    private seal(): void {
        this._current.data.blocks.forEach((block: Vector): void => {
            this._grid.setCell(block, this._current.type);
        });

        this._store.set('cells', this._grid.getCells());
    }

    private place(tetromino: Tetromino): boolean {
        const data: TetrominoData = tetromino.data;

        if (this.fits(data)) {
            this._current = tetromino;
            this._store.set('current', data);

            return true;
        }

        return false;
    }

    private generate(): boolean {
        if (this._next === undefined) {
            this._current = random();
        } else {
            this._current = this._next;
        }

        this._next = random();
        this._current.position = { x: Math.round((this._size.width / 2) - this._current.center.x), y: 0 };

        if (this.fits(this._current.data)) {
            this._store.set('current', this._current.data);
            this._store.set('next', this._next.data);

            return true;
        }

        return false;
    }

    private fits(data: TetrominoData): boolean {
        return data.blocks.every((block: Vector) => {
            if (block.x < 0 || block.x >= this._size.width) {
                return false;
            }

            const cell: Cell<string | undefined> | undefined = this._grid.getCell(block);

            return cell !== undefined && cell.value === undefined;
        });
    }
}

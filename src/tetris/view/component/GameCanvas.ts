import { Canvas } from '@apestaartje/dom/dist/element/Canvas';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { EventEmitter } from '@apestaartje/dom/dist/custom-element/decorator/output/EventEmitter';
import { Input } from '@apestaartje/dom/dist/custom-element/decorator/input/Input';
import { InputType } from '@apestaartje/dom/dist/custom-element/decorator/input/InputType';
import { Output } from '@apestaartje/dom/dist/custom-element/decorator/output/Output';
import { Size } from '@apestaartje/geometry/dist/size';
import { Store } from '@apestaartje/store/dist/Store';
import { Vector } from '@apestaartje/geometry/dist/vector';

import { block as renderBlock } from '@tetris/view/canvas/block';
import { BlockConfig } from '@tetris/store/BlockConfig';
import { Cell } from '@tetris/grid/Cell';
import { container } from '@tetris/dependency-injection/container';
import { Data } from '@tetris/store/Data';
import { getColor } from '@tetris/view/tetromino/getColor';
import { TetrominoData } from '@tetris/tetromino/TetrominoData';
import { Type } from '@tetris/tetromino/Type';
import { Engine } from '@tetris/game/Engine';

@Component({
    selector: 'tetris-game-canvas',
    template: ``,
})
export class GameCanvas extends HTMLElement {
    @Input({
        attribute: 'active',
        watch: true,
        type: InputType.Bool,
    })
    public active: boolean;

    @Output('game-over')
    public finished: EventEmitter<boolean>;

    private _background: Canvas;
    private _foreground: Canvas;
    private readonly _blockSize: number;
    private readonly _engine: Engine;
    private readonly _lineSize: number;
    private readonly _store: Store<Data>;
    private readonly _wellSize: Size;

    public constructor() {
        super();

        this._store = container.resolve<Store<Data>>('store');
        this._engine = container.resolve('engine');
        this._engine.gameOver.subscribe({
            next: (): void => {
                this.finished.emit(true);
            },
        });

        const blockConfig: BlockConfig = this._store.get('block');

        this._wellSize = this._store.get('size');
        this._blockSize = blockConfig.size;
        this._lineSize = blockConfig.line;
    }

    public connectedCallback(): void {
        this.addCanvas();
        this.subscribe();
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'active') {
            this.toggle();
        }
    }

    private toggle(): void {
        if (this.active === true) {
            this._engine.start();
        } else {
            this._engine.stop();
            this._engine.reset();
        }
    }

    private addCanvas(): void {
        this._foreground = new Canvas({
            width: this._wellSize.width * this._blockSize,
            height: this._wellSize.height * this._blockSize,
        });
        this._foreground.classList.add('foreground');
        this._foreground.appendTo(this);

        this._background = new Canvas({
            width: this._wellSize.width * this._blockSize,
            height: this._wellSize.height * this._blockSize,
        });
        this._background.classList.add('background');
        this._background.appendTo(this);
    }

    private subscribe(): void {
        this._store.subscribe('current', this.renderForeground.bind(this));
        this._store.subscribe('cells', this.renderBackground.bind(this));
    }

    private renderForeground(current: TetrominoData | undefined): void {
        this._foreground.clear();

        if (current === undefined) {
            return;
        }

        const color: string = getColor(current.type);

        current.blocks.forEach((block: Vector): void => {
            renderBlock(
                this._foreground.context,
                { x: block.x * this._blockSize, y: block.y * this._blockSize },
                { width: this._blockSize, height: this._blockSize },
                color,
                this._lineSize,
            );
        });
    }

    private renderBackground(cells: Cell<Type | undefined>[]): void {
        this._background.clear();

        cells.forEach((cell: Cell<Type | undefined>): void => {
            if (cell.value === undefined) {
                return;
            }

            const color: string = getColor(cell.value);

            renderBlock(
                this._background.context,
                { x: cell.position.x * this._blockSize, y: cell.position.y * this._blockSize },
                { width: this._blockSize, height: this._blockSize },
                color,
                this._lineSize,
            );
        });
    }
}

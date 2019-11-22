import { Canvas } from '@apestaartje/dom/dist/element';
import { ChildElement } from '@apestaartje/dom/dist/custom-element/decorator/child-element';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { Store } from '@apestaartje/store/dist/Store';
import { Vector } from '@apestaartje/geometry/dist/vector';

import { block as renderBlock } from '@tetris/view/canvas/block';
import { container } from '@tetris/dependency-injection/container';
import { Data } from '@tetris/store/Data';
import { getColor } from '@tetris/view/tetromino/getColor';
import { TetrominoData } from '@tetris/tetromino/TetrominoData';
import { BlockConfig } from '@tetris/store/BlockConfig';

@Component({
    selector: 'tetris-preview',
    template: `
        <h2>Next</h2>
    `,
})
export class Preview extends HTMLElement {
    private _canvas: Canvas;
    private readonly _store: Store<Data>;

    public constructor() {
        super();

        this._store = container.resolve<Store<Data>>('store');
    }

    public connectedCallback(): void {
        this.addCanvas();
        this.subscribe();
    }

    private renderTetromino(preview: TetrominoData | undefined): void {
        this._canvas.clear();

        if (preview === undefined) {
            return;
        }

        const color: string = getColor(preview.type);
        const blockConfig: BlockConfig = this._store.get('block');
        const size: number = blockConfig.size;

        preview.blocks.forEach((block: Vector): void => {
            renderBlock(
                this._canvas.context,
                { x: block.x * size, y: block.y * size },
                { width: size, height: size },
                color,
                blockConfig.line,
            );
        });
    }

    private addCanvas(): void {
        const blockConfig: BlockConfig = this._store.get('block');

        this._canvas = new Canvas({
            width: blockConfig.size * 5,
            height: blockConfig.size * 5,
        });
        this._canvas.appendTo(<HTMLElement>this);
    }

    private subscribe(): void {
        this._store.subscribe('next', this.renderTetromino.bind(this));
    }
}

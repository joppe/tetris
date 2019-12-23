import { Canvas } from '@apestaartje/dom/dist/element/Canvas';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { Store } from '@apestaartje/store/dist/Store';
import { Vector } from '@apestaartje/geometry/dist/vector/Vector';

import { block as renderBlock } from '@tetris/view/canvas/block';
import { BlockConfig } from '@tetris/store/BlockConfig';
import { container } from '@tetris/dependency-injection/container';
import { crop } from '@tetris/tetromino/crop';
import { Data } from '@tetris/store/Data';
import { getColor } from '@tetris/view/tetromino/getColor';
import { TetrominoData } from '@tetris/tetromino/TetrominoData';

@Component({
    selector: 'tetris-preview',
    template: `
        <h2>Next</h2>
    `,
})
export class Preview extends HTMLElement {
    private _canvas: Canvas;
    private _store: Store<Data>;

    public connectedCallback(): void {
        this._store = container.resolve<Store<Data>>('store');

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

        crop(preview.blocks)
            .forEach((block: Vector): void => {
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

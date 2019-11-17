import { Canvas } from '@apestaartje/dom/dist/element';
import { ChildElement } from '@apestaartje/dom/dist/custom-element/decorator/child-element';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { Store } from '@apestaartje/store/dist/Store';
import { Vector } from '@apestaartje/geometry/dist/vector';

import { block as renderBlock } from '@tetris/view/canvas/block';
import { container } from '@tetris/dependency-injection/container';
import { Data } from '@tetris/store/Data';
import { getColor } from '@tetris/view/tetromino/getColor';
import { Tetromino } from '@tetris/tetromino/Tetromino';

@Component({
    selector: 'tetris-preview',
    template: `
        <div class="tetris-preview">
            <h2>Next tetromino</h2>
        </div>
    `,
})
export class Preview extends HTMLElement {
    @ChildElement('div')
    public container: HTMLElement | null;

    private _canvas: Canvas;
    private _store: Store<Data>;

    public connectedCallback(): void {
        this._canvas = new Canvas({
            width: 300,
            height: 300,
        });

        this._canvas.appendTo(<HTMLElement>this.container);

        this._store = container.resolve<Store<Data>>('store');
        this._store.subscribe('preview', this.renderTetromino.bind(this));
    }

    private renderTetromino(preview: Tetromino): void {
        const color: string = getColor(preview.type);
        const size: number = 20;

        this._canvas.clear();

        preview.blocks.forEach((block: Vector): void => {
            renderBlock(
                this._canvas.context,
                { x: size + (block.x * size), y: size + (block.y * size) },
                { width: size, height: size },
                color,
                3,
            );
        });
    }
}

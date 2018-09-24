import { IRenderable } from 'app/tetris/render/IRenderable';
import { IRenderer } from 'app/tetris/render/IRenderer';
import { Tetromino } from 'app/tetris/tetromino/Tetromino';

export class Preview {
    private _renderer: IRenderer;

    constructor(renderer: IRenderer) {
        this._renderer = renderer;
        this._renderer.setSize({
            width: 4,
            height: 3
        });
    }

    public render(tetromino: Tetromino): void {
        this._renderer.clear();

        tetromino.shape.forEach((renderable: IRenderable): void => {
            this._renderer.renderCell(renderable);
        });
    }
}

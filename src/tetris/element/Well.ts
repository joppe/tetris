import * as geometry from '@apestaartje/geometry';

import { Grid } from 'app/tetris/grid/Grid';
import { IRenderable } from 'app/tetris/render/IRenderable';
import { IRenderer } from 'app/tetris/render/IRenderer';
import { Tetromino } from 'app/tetris/tetromino/Tetromino';

export class Well {
    private _renderer: IRenderer;

    constructor(renderer: IRenderer, size: geometry.size.Size) {
        this._renderer = renderer;
        this._renderer.setSize(size);
    }

    public render(grid: Grid<IRenderable>, tetromino: Tetromino): void {
        this._renderer.renderGrid(
            grid
        );

        tetromino.shape.forEach((renderable: IRenderable): void => {
            this._renderer.renderCell(renderable);
        });
    }
}

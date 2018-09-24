import * as geometry from '@apestaartje/geometry';

import { Grid } from 'app/tetris/grid/Grid';
import { IRenderable } from 'app/tetris/render/IRenderable';

export interface IRenderer {
    setSize(size: geometry.size.Size): void;

    renderGrid(grid: Grid<IRenderable>): void;

    renderCell(shape: IRenderable): void;

    clear(): void;
}

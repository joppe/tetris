import * as geometry from '@apestaartje/geometry';

import { Grid } from 'app/tetris/grid/Grid';
import { ICell } from 'app/tetris/grid/ICell';
import { IRenderable } from 'app/tetris/render/IRenderable';

export interface IRenderer {
    setSize(size: geometry.size.Size): void;

    renderGrid(grid: Grid<IRenderable>): void;

    renderCell(cell: ICell<IRenderable>): void;

    clear(): void;
}

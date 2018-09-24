import * as geometry from '@apestaartje/geometry';

import { Grid } from 'app/tetris/grid/Grid';
import { IRenderable } from 'app/tetris/render/IRenderable';
import { IRenderer } from 'app/tetris/render/IRenderer';

export class HTMLRenderer implements IRenderer {
    private _unitSize: number;

    private _container: HTMLElement;

    constructor(unitSize: number, container: HTMLElement) {
        this._unitSize = unitSize;
        this._container = container;
    }

    public setSize(size: geometry.size.Size): void {
        this._container.style.width = `${size.width * this._unitSize}px`;
        this._container.style.height = `${size.height * this._unitSize}px`;
    }

    public renderGrid(grid: Grid<IRenderable | undefined>): void {
        this.clear();

        for (const cell of grid.getCells()) {
            if (cell === undefined) {
                continue;
            }

            this.renderCell(cell);
        }
    }

    public renderCell(shape: IRenderable): void {
        const el: HTMLDivElement = document.createElement('div');

        el.classList.add('box', shape.name);
        el.style.left = `${shape.position.x * this._unitSize}px`;
        el.style.top = `${shape.position.y * this._unitSize}px`;
        el.style.width = `${this._unitSize}px`;
        el.style.height = `${this._unitSize}px`;

        this._container.appendChild(el);
    }

    public clear(): void {
        while (this._container.firstChild) {
            this._container.removeChild(
                this._container.firstChild
            );
        }
    }
}

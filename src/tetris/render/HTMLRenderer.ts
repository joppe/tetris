import * as geometry from '@apestaartje/geometry';

import { Config } from 'app/tetris/render/Config';
import { IRenderable } from 'app/tetris/render/IRenderable';
import { IRenderer } from 'app/tetris/render/IRenderer';

export class HTMLRenderer implements IRenderer {
    private _config: Config;

    private _container: HTMLElement;

    private _shapes: Array<IRenderable> = [];

    constructor(config: Config, container: HTMLElement) {
        this._config = config;
        this._container = container;
    }

    public reset(): void {
        this._shapes = [];
    }

    public register(renderable: IRenderable): void {
        this._shapes.push(renderable);
    }

    public render(): void {
        this.clear();

        this._shapes.forEach((shape: IRenderable): void => {
            this._container.appendChild(
                this.renderShape(shape)
            );
        });
    }

    private clear(): void {
        while (this._container.firstChild) {
            this._container.removeChild(this._container.firstChild);
        }
    }

    private renderShape(shape: IRenderable): HTMLDivElement {
        const el: HTMLDivElement = document.createElement('div');

        el.classList.add('tetromino');

        console.log(shape.position);
        el.style.left = `${shape.position.x}px`;
        el.style.top = `${shape.position.y}px`;
        el.style.width = `${shape.size.width * this._config.tetrominoSize.width}px`;
        el.style.height = `${shape.size.height * this._config.tetrominoSize.height}px`;

        shape.shape.forEach((v: geometry.vector.Vector): void => {
            el.appendChild(
                this.createBox(
                    v,
                    this._config.tetrominoSize,
                    shape.color
                )
            );
        });

        return el;
    }

    private createBox(vector: geometry.vector.Vector, size: geometry.size.Size, color: string): HTMLDivElement {
        const el: HTMLDivElement = document.createElement('div');

        /**
         * The vector is always pointing to the center of the box, therefore it must be subtracted with 0.5
         */
        const x: number = (vector.x - 0.5) * size.width;
        const y: number = (vector.y - 0.5) * size.height;

        el.classList.add('tetromino__part');

        el.style.backgroundColor = color;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${size.width}px`;
        el.style.height = `${size.height}px`;

        return el;
    }
}

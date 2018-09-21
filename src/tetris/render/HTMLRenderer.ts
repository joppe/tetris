import { Point } from 'app/tetris/geometry/Point';
import { Size } from 'app/tetris/geometry/Size';
import { Vector } from 'app/tetris/geometry/Vector';
import { Config } from 'app/tetris/render/Config';
import { IRenderable } from 'app/tetris/render/IRenderable';
import { IRenderer } from 'app/tetris/render/IRenderer';

export class HTMLRenderer implements IRenderer {
    private config: Config;

    private container: HTMLElement;

    constructor(config: Config, container: HTMLElement) {
        this.config = config;
        this.container = container;
    }

    public render(renderable: IRenderable): void {
        const el: HTMLDivElement = document.createElement('div');

        el.style.position = 'absolute';
        el.style.left = `${renderable.position.x}px`;
        el.style.top = `${renderable.position.y}px`;

        renderable.shape.forEach((v: Vector): void => {
            el.appendChild(
                this.box(
                    {
                        x: v.x * this.config.tetrominoSize.width,
                        y: v.y * this.config.tetrominoSize.height
                    },
                    this.config.tetrominoSize,
                    renderable.color
                )
            );
        });

        this.container.appendChild(el);
    }

    private box(point: Point, size: Size, color: string): HTMLDivElement {
        const el: HTMLDivElement = document.createElement('div');

        el.style.position = 'absolute';
        el.style.backgroundColor = color;
        el.style.left = `${point.x}px`;
        el.style.top = `${point.y}px`;
        el.style.width = `${size.width}px`;
        el.style.height = `${size.height}px`;

        return el;
    }
}

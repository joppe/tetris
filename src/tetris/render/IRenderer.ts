import { IRenderable } from 'app/tetris/render/IRenderable';

export interface IRenderer {
    register(shape: IRenderable): void;

    render(): void;
}

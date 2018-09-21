import { IRenderable } from 'app/tetris/render/IRenderable';

export interface IRenderer {
    render(shape: IRenderable): void;
}

import * as geometry from '@apestaartje/geometry';

export type Config = {
    size: geometry.size.Size;
    tetrominoSize: geometry.size.Size;
    wellElement: HTMLElement;
    nextElement: HTMLElement;
    scoreElement: HTMLElement;
};

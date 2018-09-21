import * as geometry from '@apestaartje/geometry';

export interface IRenderable {
    color: string;

    position: geometry.point.Point;

    size: geometry.size.Size;

    shape: Array<geometry.vector.Vector>;
}

import { Point } from 'app/tetris/geometry/Point';
import { Vector } from 'app/tetris/geometry/Vector';

export interface IRenderable {
    color: string;

    position: Point;

    shape: Array<Vector>;
}

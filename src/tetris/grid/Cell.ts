import { Point } from '@apestaartje/geometry/dist/point';

export interface Cell<T> {
    position: Point;
    value: T;
}

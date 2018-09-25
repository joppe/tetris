import * as geometry from '@apestaartje/geometry';

export interface ICell<T> {
    position: geometry.point.Point;

    value: T;
}

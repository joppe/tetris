import * as geometry from '@apestaartje/geometry';

import { IRenderable } from 'app/tetris/render/IRenderable';
import { Config } from 'app/tetris/tetromino/Config';

export class Tetromino implements IRenderable {
    private _color: string;
    private _position: geometry.point.Point;
    private _size: geometry.size.Size;
    private _shape: Array<geometry.vector.Vector>;

    get color(): string {
        return this._color;
    }

    get position(): geometry.point.Point {
        return this._position;
    }

    get size(): geometry.size.Size {
        return this._size;
    }

    get shape(): Array<geometry.vector.Vector> {
        return this._shape;
    }

    constructor(position: geometry.point.Point, config: Config) {
        this._position = position;
        this._color = config.color;

        this._shape = config.shape.reduce(
            (acc: Array<geometry.vector.Vector>, line: Array<boolean>, row: number): Array<geometry.vector.Vector> => {
                return acc.concat(
                    line.map((part: boolean, col: number): geometry.vector.Vector | undefined => {
                        if (part === false) {
                            return;
                        }

                        // The vector must point to the center of the box, therefore 0.5 is added to x and y.
                        return { x: col + 0.5, y: row + 0.5 };
                    }).filter((v: geometry.vector.Vector | undefined): boolean => v !== undefined)
                );
            },
            []
        );

        this._size = {
            height: config.shape[0].length,
            width: config.shape.length
        };
    }

    public move(offset: geometry.point.Point): void {
        this._position.x += offset.x;
        this._position.y += offset.y;
    }

    public rotate(degrees: number): void {
        const transform: geometry.transform.Transform = new geometry.transform.Transform();

        transform.translate(
            this._size.width / 2,
            this._size.height / 2
        );
        transform.rotate(geometry.angle.radians(degrees));
        transform.translate(
            -this._size.width / 2,
            -this._size.height / 2
        );

        this._shape = this._shape.map((v: geometry.vector.Vector): geometry.vector.Vector => {
            return transform.transformPoint(v);
        });
    }
}

import { Point } from 'app/tetris/geometry/Point';
import { Vector } from 'app/tetris/geometry/Vector';
import { IRenderable } from 'app/tetris/render/IRenderable';
import { Config } from 'app/tetris/tetromino/Config';

export class Tetromino implements IRenderable {
    private _color: string;
    private _position: Point;
    private _shape: Array<Vector>;

    get color(): string {
        return this._color;
    }

    get position(): Point {
        return this._position;
    }

    get shape(): Array<Vector> {
        return this._shape;
    }

    constructor(position: Point, config: Config) {
        this._position = position;
        this._color = config.color;

        this._shape = config.shape.reduce(
            (acc: Array<Vector>, line: Array<boolean>, row: number): Array<Vector> => {
                return acc.concat(
                    line.map((part: boolean, col: number): Vector | undefined => {
                        if (part === false) {
                            return;
                        }

                        return new Vector(col, row);
                    }).filter((v: Vector | undefined): boolean => v !== undefined)
                );
            },
            []
        );
    }

    public move(offset: Point): void {
        this._position.x += offset.x;
        this._position.y += offset.y;
    }
}

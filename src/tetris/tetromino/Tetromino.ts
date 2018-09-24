import * as geometry from '@apestaartje/geometry';

import { IRenderable } from 'app/tetris/render/IRenderable';

const CENTER_OFFSET: number = 0.5;

export class Tetromino {
    private _name: string;
    private _position: geometry.point.Point = { x: 0, y: 0 };
    private _size: geometry.size.Size;
    private _vectors: Array<geometry.vector.Vector>;

    get name(): string {
        return this._name;
    }

    get shape(): Array<IRenderable> {
        return this._vectors.map((v: geometry.vector.Vector): IRenderable => {
            return {
                name: this._name,
                position: {
                    x: Math.round(this._position.x + (v.x - CENTER_OFFSET)),
                    y: Math.round(this._position.y + (v.y - CENTER_OFFSET))
                }
            };
        });
    }

    get right(): number {
        return this.shape.reduce(
            (width: number, s: IRenderable): number => {
                return Math.max(width, s.position.x);
            },
            0
        );
    }

    get bottom(): number {
        return this.shape.reduce(
            (height: number, s: IRenderable): number => {
                return Math.max(height, s.position.y);
            },
            0
        );
    }

    get size(): geometry.size.Size {
        return this._size;
    }

    get position(): geometry.point.Point {
        return {
            x: this._position.x,
            y: this._position.y
        };
    }

    constructor(name: string, shape: Array<Array<boolean>>) {
        this._name = name;

        this._vectors = shape.reduce(
            (acc: Array<geometry.vector.Vector>, line: Array<boolean>, row: number): Array<geometry.vector.Vector> => {
                return acc.concat(
                    line.map((part: boolean, col: number): geometry.vector.Vector | undefined => {
                        if (part === false) {
                            return;
                        }

                        // The vector must point to the center of the box, therefore 0.5 is added to x and y.
                        return { x: col + CENTER_OFFSET, y: row + CENTER_OFFSET };
                    }).filter((v: geometry.vector.Vector | undefined): boolean => v !== undefined)
                );
            },
            []
        );

        this._size = {
            height: shape[0].length,
            width: shape.length
        };
    }

    public move(offset: geometry.point.Point): void {
        this._position = {
            x: this._position.x + offset.x,
            y: this._position.y + offset.y
        };
    }

    public set(position: geometry.point.Point): void {
        this._position = {
            x: position.x,
            y: position.y
        };
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

        this._vectors = this._vectors.map((v: geometry.vector.Vector): geometry.vector.Vector => {
            return transform.transformPoint(v);
        });
    }
}

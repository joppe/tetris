import { add } from '@apestaartje/geometry/dist/vector/add';
import { radians } from '@apestaartje/geometry/dist/angle';
import { Transform } from '@apestaartje/geometry/dist/transform';
import { Vector } from '@apestaartje/geometry/dist/vector/Vector';

import { getCenter } from '@tetris/tetromino/getCenter';
import { TetrominoData } from '@tetris/tetromino/TetrominoData';
import { Type } from '@tetris/tetromino/Type';

const CENTER_OFFSET: number = 0.5;

export class Tetromino {
    private _position: Vector = { x: 0, y: 0 };
    private readonly _blocks: Vector[];
    private readonly _center: Vector;
    private readonly _type: Type;

    public get center(): Vector {
        return this._center;
    }

    public get data(): TetrominoData {
        return {
            type: this._type,
            blocks: this._blocks.map((block: Vector): Vector => {
                return add(this._position, block);
            }),
        };
    }

    public get position(): Vector {
        return this._position;
    }

    public set position(position: Vector) {
        this._position = position;
    }

    public get type(): Type {
        return this._type;
    }

    public constructor(type: Type, blocks: Vector[], position?: Vector, center?: Vector) {
        this._type = type;
        this._blocks = blocks;

        if (position !== undefined) {
            this._position = position;
        }

        if (center === undefined) {
            this._center = getCenter(blocks);
        } else {
            this._center = center;
        }
    }

    public rotate(degrees: number): Tetromino {
        const transform: Transform = new Transform();

        transform.translate(
            this._center.x,
            this._center.y,
        );
        transform.rotate(radians(degrees));
        transform.translate(
            -this._center.x,
            -this._center.y,
        );

        const blocks: Vector[] = this._blocks.map((block: Vector): Vector => {
            block.x += CENTER_OFFSET;
            block.y += CENTER_OFFSET;

            const transformed: Vector = transform.transformPoint(block);

            transformed.x -= CENTER_OFFSET;
            transformed.y -= CENTER_OFFSET;

            return transformed;
        });

        return new Tetromino(this._type, blocks, this._position, this._center);
    }

    public move(offset: Vector): Tetromino {
        const position: Vector = add(this._position, offset);

        return new Tetromino(this._type, this._blocks, position, this._center);
    }
}

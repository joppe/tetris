import { Type } from '@tetris/tetromino/Type';

const CONFIG: {[type: string]: string} = {
    [Type.I]: '#00ffff',
    [Type.O]: '#ffff00',
    [Type.T]: '#ff00ff',
    [Type.L]: '#ffa500',
    [Type.S]: '#00ff00',
    [Type.J]: '#0000ff',
    [Type.Z]: '#ff0000',
};

export function getColor(type: Type): string {
    const color: string | undefined = CONFIG[type];

    if (color === undefined) {
        throw new Error(`Type not supported "${type}`);
    }

    return color;
}

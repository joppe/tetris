import { Type } from '@tetris/tetromino/Type';

const CONFIG: {[type: string]: number} = {
    [Type.I]: 0x00F0,
    [Type.O]: 0xCC00,
    [Type.T]: 0x0E40,
    [Type.L]: 0x0E80,
    [Type.S]: 0x06C0,
    [Type.J]: 0x0E20,
    [Type.Z]: 0x0C60,
};

export function getConfig(type: Type): number {
    const config: number | undefined = CONFIG[type];

    if (config === undefined) {
        throw new Error(`Type not supported "${type}`);
    }

    return config;
}

import { RGB } from './RGB';

export function isValid(rgb: RGB): boolean {
    const properties: string[] = ['r', 'g', 'b'];

    return properties.every((property: string): boolean => {
        const part: number = rgb[property];

        return part >= 0 && part <= 255;
    });
}

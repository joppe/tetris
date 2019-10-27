import { HSL } from '../hsl/HSL';
import { isValid } from './isValid';
import { RGB } from './RGB';

/**
 * @see https://nl.wikipedia.org/wiki/HSL_(kleurruimte)
 */
export function toHSL(rgb: RGB): HSL {
    if (!isValid(rgb)) {
        throw new Error(`Invalid RGB color r: ${rgb.r}, g: ${rgb.r}, b: ${rgb.r}`);
    }

    const hsl: HSL = { h: 0, s: 0, l: 0};
    const r: number = rgb.r / 255;
    const g: number = rgb.g / 255;
    const b: number = rgb.b / 255;
    const max: number = Math.max(r, g, b);
    const min: number = Math.min(r, g, b);
    const delta: number = max - min;

    hsl.l = (max + min) / 2;

    if (max === min) {
        hsl.h = 0;
        hsl.s = 0;
    } else {
        if (r === max) {
            hsl.h = ((g - b) / delta) * 60;
        } else if (g === max) {
            hsl.h = (((b - r) / delta) + 2) * 60;
        } else if (b === max) {
            hsl.h = (((r - g) / delta) + 4) * 60;
        }

        if (hsl.l < 0.5) {
            hsl.s = delta / (max + min);
        } else {
            hsl.s = delta / (2 - (max + min));
        }
    }

    hsl.h = (hsl.h + 360) % 360;

    return hsl;
}

import { HSL } from './HSL';
import { isValid } from './isValid';
import { RGB } from '../rgb/RGB';

/**
 * @see https://nl.wikipedia.org/wiki/HSL_(kleurruimte)
 */
export function toRGB(hsl: HSL): RGB {
    if (!isValid(hsl)) {
        throw new Error(`Invalid HSL color h: ${hsl.h}, s: ${hsl.s}, l: ${hsl.l}`);
    }

    const rgb: RGB = {
        r: 0,
        g: 0,
        b: 0,
    };

    const H: number = Math.floor(hsl.h / 60);
    const f: number = (((hsl.h / 60) - H) * 2) - 1;
    const span: number = hsl.l < 0.5 ? hsl.s * hsl.l : hsl.s * (1 - hsl.l);
    const p: number = hsl.l + span;
    const q: number = hsl.l + (f * span);
    const t: number = hsl.l - span;
    const u: number = hsl.l - (f * span);

    switch (H) {
        case 0:
            rgb.r = p;
            rgb.g = q;
            rgb.b = t;
            break;
        case 1:
            rgb.r = u;
            rgb.g = p;
            rgb.b = t;
            break;
        case 2:
            rgb.r = t;
            rgb.g = p;
            rgb.b = q;
            break;
        case 3:
            rgb.r = t;
            rgb.g = u;
            rgb.b = p;
            break;
        case 4:
            rgb.r = q;
            rgb.g = t;
            rgb.b = p;
            break;
        case 5:
            rgb.r = p;
            rgb.g = t;
            rgb.b = u;
            break;
        default:
            throw new Error(`Unexpected value for H ${H}`);
    }

    rgb.r = Math.round(rgb.r * 255);
    rgb.g = Math.round(rgb.g * 255);
    rgb.b = Math.round(rgb.b * 255);

    return rgb;
}

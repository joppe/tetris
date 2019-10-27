import { HSL } from './HSL';

export function isValid(hsl: HSL): boolean {
    // check hue
    if (hsl.h < 0 || hsl.h >= 360) {
        return false;
    }

    // check saturation
    if (hsl.s < 0 || hsl.s > 1) {
        return false;
    }

    // check lightness
    if (hsl.l < 0 || hsl.l > 1) {
        return false;
    }

    return true;
}

import { toRGB, HSL} from '@apestaartje/color/hsl';
import { RGB } from '@apestaartje/color/rgb';
import { toHSL } from '@apestaartje/color/rgb/toHSL';

export function adjust(color: RGB, percentage: number): RGB {
    const hsl: HSL = toHSL(color);

    if (percentage < -100 || percentage > 100) {
        throw new Error(`Please use a percentage between -100 and 100, instead of "${percentage}"`);
    }

    hsl.l = Math.max(0, Math.min(1, hsl.l + (percentage / 100)));

    return toRGB(hsl);
}

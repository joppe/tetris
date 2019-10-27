import { HSL } from '@apestaartje/color/hsl';
import { toHSL } from '@apestaartje/color/rgb/toHSL';

/**
 * I use http://colorizer.org/ to check if the conversion is correct.
 */

describe('toHSL', (): void => {
    it('Should return the HSL value', (): void => {
        const hsl1: HSL = toHSL({
            r: 229,
            g: 118,
            b: 118,
        });

        expect(hsl1.h).toBeCloseTo(0);
        expect(hsl1.l).toBeCloseTo(0.68);
        expect(hsl1.l).toBeCloseTo(0.68);

        const hsl2: HSL = toHSL({
            r: 6,
            g: 111,
            b: 22,
        });

        expect(hsl2.h).toBeCloseTo(129.14);
        expect(hsl2.s).toBeCloseTo(0.8974);
        expect(hsl2.l).toBeCloseTo(0.2294);
    });
});

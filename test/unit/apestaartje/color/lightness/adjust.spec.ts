import { adjust } from '@apestaartje/color/lightness/adjust';
import { RGB } from '@apestaartje/color/rgb';

describe('adjust', (): void => {
    it('lighten the color when percentage is positive', (): void => {
        const l: RGB = adjust({ r: 255, g: 0, b: 0 }, 25);

        expect(l).toEqual({
            r: 255,
            g: 128,
            b: 128,
        });
    });

    it('change to white when percentage is 100', (): void => {
        const l: RGB = adjust({ r: 255, g: 0, b: 0 }, 100);

        expect(l).toEqual({
            r: 255,
            g: 255,
            b: 255,
        });
    });

    it('change to black when percentage is -100', (): void => {
        const l: RGB = adjust({ r: 255, g: 0, b: 0 }, -100);

        expect(l).toEqual({
            r: 0,
            g: 0,
            b: 0,
        });
    });

    it('throw an error when percentage is out of scope', (): void => {
        expect((): void => {
            adjust({ r: 255, g: 0, b: 0 }, -101);
        }).toThrow();
    });
});

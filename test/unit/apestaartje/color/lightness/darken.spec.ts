import { darken } from '@apestaartje/color/lightness/darken';
import { RGB } from '@apestaartje/color/rgb';

describe('darken', (): void => {
    it('darken the color', (): void => {
        const l: RGB = darken({ r: 208, g: 58, b: 48 });

        expect(l).toEqual({
            r: 167,
            g: 46,
            b: 38,
        });
    });

    it('throw an error when percentage is out of scope', (): void => {
        expect((): void => {
            darken({ r: 255, g: 0, b: 0 }, 110);
        }).toThrow();
    });
});

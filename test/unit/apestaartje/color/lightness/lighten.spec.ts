import { lighten } from '@apestaartje/color/lightness/lighten';
import { RGB } from '@apestaartje/color/rgb';

describe('lighten', (): void => {
    it('lighten the color', (): void => {
        const l: RGB = lighten({ r: 60, g: 188, b: 2 });

        expect(l).toEqual({
            r: 76,
            g: 238,
            b: 3,
        });
    });

    it('throw an error when percentage is out of scope', (): void => {
        expect((): void => {
            lighten({ r: 255, g: 0, b: 0 }, -10);
        }).toThrow();
    });
});

import { toRGB } from '@apestaartje/color/hsl/toRGB';

describe('toRGB', (): void => {
    it('Should return the RGB value', (): void => {
        expect(toRGB({
            h: 0,
            s: 1,
            l: 0.5,
        })).toEqual({
            r: 255,
            g: 0,
            b: 0,
        });

        expect(toRGB({
            h: 129,
            s: 0.89,
            l: 0.23,
        })).toEqual({
            r: 6,
            g: 111,
            b: 22,
        });
    });
});

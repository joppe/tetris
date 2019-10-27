import { isValid } from '@apestaartje/color/rgb/isValid';

describe('isValid', (): void => {
    it('Should return true when valid rgb color is provided', (): void => {
        expect(isValid({
           r: 120,
           g: 12,
           b: 1,
        })).toBe(true);

        expect(isValid({
           r: 0,
           g: 0,
           b: 0,
        })).toBe(true);
    });

    it('Should return false when invalid rgb color is provided', (): void => {
        expect(isValid({
            r: 1200,
            g: 12,
            b: 1,
        })).toBe(false);

        expect(isValid({
            r: 0,
            g: 1,
            b: -10,
        })).toBe(false);
    });
});

import { isValid } from '@apestaartje/color/hsl/isValid';

describe('isValid', (): void => {
    it('Should return true when valid hsl color is provided', (): void => {
        expect(isValid({
            h: 120,
            s: 0.12,
            l: 1,
        })).toBe(true);
        expect(isValid({
            h: 0,
            s: 0,
            l: 0,
        })).toBe(true);
    });

    it('Should return false when invalid hsl color is provided', (): void => {
        expect(isValid({
            h: 1200,
            s: 0.12,
            l: 1,
        })).toBe(false);
        expect(isValid({
            h: 0,
            s: 1.1,
            l: 0,
        })).toBe(false);
    });
});

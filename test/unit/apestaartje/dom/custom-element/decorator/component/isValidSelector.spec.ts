import { isValidSelector } from '@apestaartje/dom/custom-element/decorator/component/isValidSelector';

describe('isValidSelector', (): void => {
    it('validate the given selector', (): void => {
        expect(isValidSelector('a-a')).toBe(true);
        expect(isValidSelector('test-tag')).toBe(true);
        expect(isValidSelector('a-')).toBe(false);
        expect(isValidSelector('-a')).toBe(false);
        expect(isValidSelector('-')).toBe(false);
    });
});

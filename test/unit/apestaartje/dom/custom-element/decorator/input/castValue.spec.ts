import { castValue } from '@apestaartje/dom/custom-element/decorator/input/castValue';

describe('castValue', (): void => {
    it('cast to undefined when value is `null`', (): void => {
        // tslint:disable-next-line no-null-keyword
        expect(castValue(null, 'str')).toBe(undefined);
    });

    it('cast to boolean', (): void => {
        expect(castValue('false', 'bool')).toBe(false);
        expect(castValue('true', 'bool')).toBe(true);

        expect((): void => {
            castValue('foo', 'bool');
        }).toThrow();
    });

    it('cast to integer', (): void => {
        expect(castValue('1', 'int')).toBe(1);
        expect(castValue('3.14', 'int')).toBe(3);
        expect(castValue('-234908234', 'int')).toBe(-234908234);

        expect((): void => {
            castValue('true', 'int');
        }).toThrow();
    });

    it('cast to float', (): void => {
        expect(castValue('1', 'float')).toBe(1);
        expect(castValue('3.14', 'float')).toBe(3.14);
        expect(castValue('-2349.08234', 'float')).toBe(-2349.08234);

        expect((): void => {
            castValue('foo', 'float');
        }).toThrow();
    });

    it('cast to json', (): void => {
        expect(castValue('{"foo": "bar"}', 'json')).toEqual({foo: 'bar'});

        expect((): void => {
            castValue('foo', 'json');
        }).toThrow();
    });
});

import { args } from '@apestaartje/function/args';

describe('function args', (): void => {
    it('return an array with all argument names', (): void => {
        expect(
            args(
                // tslint:disable
                function foo(one, two) {
                    return one + two;
                }
                // tslint:enable
            ),
        ).toEqual(['one', 'two']);
    });

    it('return an empty array when there are no arguments', (): void => {
        expect(
            args(
                // tslint:disable
                () => {
                    return '?';
                }
                // tslint:enable
            ),
        ).toEqual([]);
    });

    describe('function definitions', (): void => {
        it('with name', (): void => {
            expect(
                args(
                    // tslint:disable
                    function foobar21(one, bar) {
                        return one + bar;
                    }
                    // tslint:enable
                ),
            ).toEqual(['one', 'bar']);
        });

        it('without name', (): void => {
            expect(
                args(
                    // tslint:disable
                    function (one, bar) {
                        return one + bar;
                    }
                    // tslint:enable
                ),
            ).toEqual(['one', 'bar']);
        });
    });

    describe('fat arrow definitions', (): void => {
        it('with parenthesis', (): void => {
            expect(
                args(
                    // tslint:disable
                    (one, bar) => {
                        return one + bar;
                    }
                    // tslint:enable
                ),
            ).toEqual(['one', 'bar']);
        });

        it('without parenthesis', (): void => {
            expect(
                args(
                    // tslint:disable
                    one => {
                        return one + 'foo';
                    }
                    // tslint:enable
                ),
            ).toEqual(['one']);
        });
    });

    describe('constructor', (): void => {
        it('return an array with all argument names', (): void => {
            expect(
                args(
                    // tslint:disable
                    class Foo {
                        constructor(a, b, c) {}
                    }
                    // tslint:enable
                ),
            ).toEqual(['a', 'b', 'c']);
        });

        it('return an empty array when there are no arguments', (): void => {
            expect(
                args(
                    // tslint:disable
                    class Foo {
                        constructor() {}
                    }
                    // tslint:enable
                ),
            ).toEqual([]);
        });

        it('return an empty array when there is no constructor', (): void => {
            expect(
                args(
                    // tslint:disable
                    class Foo {
                    }
                    // tslint:enable
                ),
            ).toEqual([]);
        });
    });
});

import { Container as DIContainer } from '@apestaartje/dependency-injection/container/Container';
import { factory } from '@apestaartje/dependency-injection/container/factory';
import { Inject } from '@apestaartje/dependency-injection/decorator/Inject';

describe('Inject', (): void => {
    it('resolve value from di container', (): void => {
        const di: DIContainer = factory();

        di.register<number>(
            'a',
            () => {
                return 16;
            },
        );

        @Inject()
        class Adder {
            private readonly _a: number;

            constructor(a: number) {
                this._a = a;
            }

            public add(b: number): number {
                return this._a + b;
            }
        }

        const adder: Adder = di.resolve<Adder>('Adder');

        expect(adder.add(3)).toBe(19);
    });
});

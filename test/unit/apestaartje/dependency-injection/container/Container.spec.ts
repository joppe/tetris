import { Container as DIContainer } from '@apestaartje/dependency-injection/container/Container';

describe('Container', (): void => {
    it('register a dependency', (): void => {
        const container: DIContainer = new DIContainer();

        container.register<number>(
            'a',
            () => {
                return 12;
            },
        );

        expect(container.has('a')).toEqual(true);
    });

    it('tell if a dependency exists', (): void => {
        const container: DIContainer = new DIContainer();

        container.register<number>(
            'a',
            () => {
                return 12;
            },
        );

        expect(container.has('a')).toEqual(true);
        expect(container.has('x')).toEqual(false);
    });

    it('resolve a dependency that has no other dependencies', (): void => {
        const container: DIContainer = new DIContainer();

        container.register<number>(
            'a',
            () => {
                return 12;
            },
        );

        expect(container.resolve('a')).toEqual(12);
    });

    it('resolve a dependency that has no other dependencies', (): void => {
        const container: DIContainer = new DIContainer();

        container.register<number>(
            'a',
            () => {
                return 12;
            },
        );
        container.register<number>(
            'b',
            () => {
                return 45;
            },
        );
        container.register<number>(
            'add',
            // tslint:disable-next-line typedef
            (a, b) => {
                return a + b;
            },
        );

        expect(container.resolve('add')).toEqual(57);
    });
});

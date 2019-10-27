import { Container } from '@apestaartje/dependency-injection/container/Container';
import { factory } from '@apestaartje/dependency-injection/container/factory';

describe('dependency injection factory', (): void => {
    it('create only once a container', (): void => {
        const a: Container = factory();
        const b: Container = factory();

        expect(a).toBeDefined();
        expect(b).toBeDefined();
        expect(a).toBe(b);
    });
});

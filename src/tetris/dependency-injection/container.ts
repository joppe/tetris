import { Container as DIContainer } from '@apestaartje/dependency-injection/dist/container/Container';
import { factory } from '@apestaartje/dependency-injection/dist/container/factory';

const container: DIContainer = factory();

export {
    container,
};

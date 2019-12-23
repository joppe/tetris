import { Container as DIContainer } from '@apestaartje/dependency-injection/dist/container/Container';

import { getContainer } from '@apestaartje/dependency-injection/dist/container/getContainer';

const container: DIContainer = getContainer();

export {
    container,
};

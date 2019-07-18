import { Container } from './Container';

/**
 * Factory function to create (and cache) dependencies.
 */

export const factory: () => Container = ((): () => Container => {
    let container: Container;
    let isInvoked: boolean = false;

    return (): Container => {
        if (!isInvoked) {
            container = new Container();
            isInvoked = true;
        }

        return container;
    };
})();

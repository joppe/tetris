import { args } from '@apestaartje/function/args';
import { Constructor } from '@apestaartje/types/Constructor';

import { Container } from '../container/Container';
import { factory } from '../container/factory';

const CONSTRUCTOR_NAME: string = 'name';

/**
 * Class decorator
 */

// tslint:disable-next-line function-name no-any
export function Inject<T extends Constructor<any>>(): (target: T) => T {
    return (target: T): T => {
        const di: Container = factory();
        const identifier: string = target[CONSTRUCTOR_NAME];
        const requiredDependencies: string[] = args(target);

        di.register(
            identifier,
            // tslint:disable-next-line no-any
            (dependencies: any[]): T => {
                return new (target.bind(target, dependencies))();
            },
            requiredDependencies,
        );

        return target;
    };
}

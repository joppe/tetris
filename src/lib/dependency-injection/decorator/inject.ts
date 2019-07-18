import { args } from '@apestaartje/function';

import { Container } from '../Container';
import { factory } from '../factory';
import { Constructor } from '../types/Constructor';

const CONSTRUCTOR_NAME: string = 'name';

/**
 * Class decorator
 */
export function inject<T>(constructor: Constructor<T>): Constructor<T> {
    const di: Container = factory();
    const identifier: string = constructor[CONSTRUCTOR_NAME];
    const requiredDependencies: Array<string> = args(constructor);

    di.register(
        identifier,
        // tslint:disable-next-line no-any
        (dependencies: Array<any>): T => {
            return new constructor(...dependencies);
        },
        requiredDependencies
    );

    return constructor;
}

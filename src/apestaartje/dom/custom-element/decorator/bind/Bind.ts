import { MethodDecorator } from '../MethodDecorator';

// tslint:disable-next-line function-name
export function Bind(): MethodDecorator {
    return <T extends Function>(
        target: HTMLElement,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<T>,
    ): TypedPropertyDescriptor<T> => {
        if (typeof descriptor.value !== 'function') {
            throw new Error(`Bind decorator can only be applied to methods, no "${typeof descriptor.value}"`);
        }

        let bound: T | undefined;

        return {
            get(): T {
                if (bound === undefined) {
                    // tslint:disable-next-line no-invalid-this
                    bound = <T>(<Function>descriptor.value).bind(this);
                }

                return bound;
            },
            set(value: T): void {
                throw new Error('Do not try to set the value of a decorated "@Bind" method');
            },
        };
    };
}

export type MethodDecorator = <T extends Function>(
    target: HTMLElement,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>,
) => TypedPropertyDescriptor<T>;

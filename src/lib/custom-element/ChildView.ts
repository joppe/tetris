import 'reflect-metadata';

export const CHILD_VIEW_KEY: Symbol = Symbol('child_view_key');

// tslint:disable-next-line function-name
export function ChildView(selector: string): PropertyDecorator {
    return (target: HTMLElement, name: string): void => {
        const data = Reflect.getMetadata(CHILD_VIEW_KEY, target) || {};

        data[name] = selector;

        Reflect.defineMetadata(CHILD_VIEW_KEY, data, target);

        console.log('ChildView', data);
    };
}

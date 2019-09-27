import { EventEmitter } from './EventEmitter';

// tslint:disable-next-line function-name
export function Output<T>(eventName: string): PropertyDecorator {
    return (target: HTMLElement, propertyName: string): void => {
        Object.defineProperty(
            target,
            propertyName,
            {
                enumerable: true,
                get: function (): EventEmitter<T> {
                    // tslint:disable-next-line no-invalid-this
                    const self: HTMLElement = <HTMLElement>this;

                    return {
                        emit(value: T): void {
                            const init: CustomEventInit<T> = {
                                detail: value,
                                bubbles: true,
                            };

                            self.dispatchEvent(new CustomEvent(eventName, init));
                        },
                    };
                },
                set: (): void => {
                    throw new Error('Do not try to set the value of a decorated "@Output" property');
                },
            },
        );
    };
}

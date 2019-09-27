// tslint:disable-next-line function-name
export function ChildElement(selector: string): PropertyDecorator {
    return (target: HTMLElement, propertyName: string): void => {
        Object.defineProperty(
            target,
            propertyName,
            {
                enumerable: true,
                // tslint:disable-next-line no-function-expression
                get: function (): HTMLElement | null {
                    // tslint:disable-next-line no-this-assignment no-invalid-this
                    const self: HTMLElement = <HTMLElement>this;

                    return (<ShadowRoot>self.shadowRoot).querySelector(selector);
                },
                set: (): void => {
                    throw new Error('Do not try to set the value of a decorated "@ChildElement" property');
                },
            },
        );
    };
}

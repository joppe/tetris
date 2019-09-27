import { castValue } from './castValue';
import { InputConfig } from './InputConfig';
import { InputType } from './InputType';

const OBSERVED_ATTRIBUTES: string = 'observedAttributes';

// tslint:disable-next-line function-name
export function Input(config: InputConfig = {}): PropertyDecorator {
    return (target: HTMLElement, propertyName: string): void => {
        const attribute: string = config.attribute === undefined ? propertyName : config.attribute;
        const type: InputType = config.type === undefined ? InputType.Str : config.type;

        if (config.watch === true) {
            let observedAttributes: string[] = [];

            if (Array.isArray(target[OBSERVED_ATTRIBUTES])) {
                observedAttributes = <string[]>target[OBSERVED_ATTRIBUTES];
            }

            Object.defineProperty(
                target.constructor,
                OBSERVED_ATTRIBUTES,
                {
                    configurable: true,
                    get: (): string[] => {
                        return observedAttributes.concat(attribute);
                    },
                    set: (): void => {
                        throw new Error('Do not try to set the value of "observedAttributes"');
                    },
                },
            );
        }

        Object.defineProperty(
            target,
            propertyName,
            {
                enumerable: true,
                get: function (): string | number | boolean | object | undefined {
                    // tslint:disable-next-line no-invalid-this
                    return castValue((<HTMLElement>this).getAttribute(attribute), type);
                },
                set: (): void => {
                    throw new Error('Do not try to set the value of a decorated "@Input" property');
                },
            },
        );
    };
}

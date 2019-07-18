// tslint:disable-next-line no-import-side-effect
import 'reflect-metadata';

import { InputMetadataData, INPUT_META_DATA_KEY, WATCH_ATTRIBUTES_PROPERTY } from './InputMetadata';
import { InputType } from './InputType';
import { InputConfig } from './InputConfig';

// tslint:disable-next-line function-name
export function Input(config: InputConfig = {}): PropertyDecorator {
    return (target: HTMLElement, propertyName: string): void => {
        const data: InputMetadataData = Reflect.hasMetadata(INPUT_META_DATA_KEY, target) ?
            <InputMetadataData>Reflect.getMetadata(INPUT_META_DATA_KEY, target) : {};

        const attribute: string = config.attribute === undefined ? propertyName : config.attribute;
        const inputType: InputType = config.type === undefined ? InputType.Str : config.type;

        data[propertyName] = {
            attribute,
            type: inputType,
        };

        if (config.watch === true) {
            if (target.constructor[WATCH_ATTRIBUTES_PROPERTY] === undefined) {
                target.constructor[WATCH_ATTRIBUTES_PROPERTY] = [];
            }

            (<string[]>target.constructor[WATCH_ATTRIBUTES_PROPERTY]).push(attribute);
        }

        Reflect.defineMetadata(INPUT_META_DATA_KEY, data, target);
    };
}

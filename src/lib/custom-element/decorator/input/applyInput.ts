// tslint:disable-next-line no-import-side-effect
import 'reflect-metadata';

import { InputMetadataData, InputMetadataDataEntry, INPUT_META_DATA_KEY } from './InputMetadata';

export function applyInput(target: HTMLElement): void {
    if (Reflect.hasMetadata(INPUT_META_DATA_KEY, target)) {
        const data: InputMetadataData = <InputMetadataData>Reflect.getMetadata(INPUT_META_DATA_KEY, target);

        Object.keys(data)
            .forEach((propertyName: string): void => {
                const entry: InputMetadataDataEntry = data[propertyName];

                Object.defineProperty(
                    target,
                    propertyName,
                    {
                        get: (): string | number | boolean | object | undefined => {
                            const value: string | null = target.getAttribute(entry.attribute);

                            if (value === null) {
                                return undefined;
                            }

                            switch (entry.type) {
                                case 'bool':
                                    return value === 'true';
                                case 'int':
                                    return parseInt(value, 10);
                                case 'float':
                                    return parseFloat(value);
                                case 'json':
                                    return <object>JSON.parse(value);
                                default:
                                    return value;
                            }
                        },
                        set: (): void => {
                            throw new Error('Do not try to set the value of a decorated "@Input" property');
                        },
                    },
                );
            });
    }
}

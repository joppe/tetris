// tslint:disable-next-line no-import-side-effect
import 'reflect-metadata';

import { ChildElementMetadataData, CHILD_ELEMENTS_META_DATA_KEY } from './ChildElementMetadata';

export function applyChildElements(target: HTMLElement): void {
    if (Reflect.hasMetadata(CHILD_ELEMENTS_META_DATA_KEY, target)) {
        const data: ChildElementMetadataData = <ChildElementMetadataData>Reflect.getMetadata(CHILD_ELEMENTS_META_DATA_KEY, target);

        Object.keys(data)
            .forEach((propertyName: string): void => {
                const selector: string = data[propertyName];

                Object.defineProperty(
                    target,
                    propertyName,
                    {
                        get: (): HTMLElement[] => {
                            return Array.from((<ShadowRoot>target.shadowRoot).querySelectorAll(selector));
                        },
                        set: (): void => {
                            throw new Error('Do not try to set the value of a decorated "@ChildElements" property');
                        },
                    },
                );
            });
    }
}

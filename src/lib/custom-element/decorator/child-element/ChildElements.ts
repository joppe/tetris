// tslint:disable-next-line no-import-side-effect
import 'reflect-metadata';

import { ChildElementMetadataData, CHILD_ELEMENTS_META_DATA_KEY } from './ChildElementMetadata';

// tslint:disable-next-line function-name
export function ChildElements(selector: string): PropertyDecorator {
    return (target: HTMLElement, propertyName: string): void => {
        const data: ChildElementMetadataData = Reflect.hasMetadata(CHILD_ELEMENTS_META_DATA_KEY, target) ?
            <ChildElementMetadataData>Reflect.getMetadata(CHILD_ELEMENTS_META_DATA_KEY, target) : {};

        data[propertyName] = selector;

        Reflect.defineMetadata(CHILD_ELEMENTS_META_DATA_KEY, data, target);
    };
}

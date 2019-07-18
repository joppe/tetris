// tslint:disable-next-line no-import-side-effect
import 'reflect-metadata';

import { ChildElementMetadataData, CHILD_ELEMENT_META_DATA_KEY } from './ChildElementMetadata';

// tslint:disable-next-line function-name
export function ChildElement(selector: string): PropertyDecorator {
    return (target: HTMLElement, propertyName: string): void => {
        const data: ChildElementMetadataData = Reflect.hasMetadata(CHILD_ELEMENT_META_DATA_KEY, target) ?
            <ChildElementMetadataData>Reflect.getMetadata(CHILD_ELEMENT_META_DATA_KEY, target) : {};

        data[propertyName] = selector;

        Reflect.defineMetadata(CHILD_ELEMENT_META_DATA_KEY, data, target);
    };
}

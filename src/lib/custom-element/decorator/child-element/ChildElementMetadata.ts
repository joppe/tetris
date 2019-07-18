export type Selector = string;

export interface ChildElementMetadataData {
    [propertyName: string]: Selector;
}

export const CHILD_ELEMENT_META_DATA_KEY: symbol = Symbol('child_element_meta_data_key');

export const CHILD_ELEMENTS_META_DATA_KEY: symbol = Symbol('child_elements_meta_data_key');

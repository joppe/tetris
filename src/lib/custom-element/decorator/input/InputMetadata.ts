import { InputType } from './InputType';

export interface InputMetadataDataEntry {
    attribute: string;
    type: InputType;
}

export interface InputMetadataData {
    [propertyName: string]: InputMetadataDataEntry;
}

export const INPUT_META_DATA_KEY: symbol = Symbol('input_meta_data_key');
export const WATCH_ATTRIBUTES_PROPERTY: unique symbol = Symbol('watch_attributes_property');

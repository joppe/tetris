import { Setter } from './Setter';

export function assoc<T>(property: keyof T): Setter<T, T[keyof T]> {
    return (value: T[keyof T], obj: T): T => {
        return {
            ...obj,
            [property]: value,
        };
    };
}

import { Getter } from './Getter';
import { Setter } from './Setter';

export interface Lens<T> {
    get(obj: T): T[keyof T];
    set(value: T[keyof T], obj: T): T;
}

export function lens<T>(getter: Getter<T>, setter: Setter<T>): Lens<T> {
    return {
        get(obj: T) {
            return getter(obj);
        },

        set(value: T[keyof T], obj: T) {
            return setter(value, obj);
        },
    };
}

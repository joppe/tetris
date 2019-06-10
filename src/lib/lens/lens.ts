import { Getter } from './Getter';
import { Setter } from './Setter';

// tslint:disable: no-reserved-keywords

export interface Lens<T, K> {
    get: Getter<T, K>;
    set: Setter<T, K>;
}

export function lens<T, K>(getter: Getter<T, K>, setter: Setter<T, K>): Lens<T, K> {
    return {
        get(obj: T): K {
            return getter(obj);
        },

        set(value: K, obj: T): T {
            return setter(value, obj);
        },
    };
}

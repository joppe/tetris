import { Lens } from './lens';

// tslint:disable: no-reserved-keywords

export function set<T, K>(lens: Lens<T, K>, value: K, obj: T): T {
    return lens.set(value, obj);
}

import { Lens } from './lens';

export function set<T, K>(lens: Lens<T, K>, value: K, obj: T): T {
    return lens.set(value, obj);
}

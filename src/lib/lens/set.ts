import { Lens } from './lens';

export function set<T>(lens: Lens<T>, value: T[keyof T], obj: T): T {
    return lens.set(value, obj);
}

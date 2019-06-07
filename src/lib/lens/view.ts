import { Lens } from './lens';

export function view<T>(lens: Lens<T>, obj: T): T[keyof T] {
    return lens.get(obj);
}

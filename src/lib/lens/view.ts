import { Lens } from './lens';

export function view<T, K>(lens: Lens<T, K>, obj: T): K {
    return lens.get(obj);
}

import { Observable } from '../observable/Observable';

// tslint:disable-next-line no-any
export interface Operator<T, K> {
    (observable: Observable<T>): Observable<K>;
}

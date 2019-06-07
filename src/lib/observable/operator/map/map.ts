import { CancelSubscription } from '../../observable/CancelSubscription';
import { MapFunction } from './MapFunction';
import { Observable } from '../../observable/Observable';
import { Operator } from '../Operator';
import { SafeObserver } from '../../observer/SafeObserver';

export function map<T, K>(transform: MapFunction<T, K>): Operator<T, K> {
    return (observable: Observable<T>): Observable<K> => {
        return new Observable<K>((observer: SafeObserver<K>): CancelSubscription => {
            return observable.subscribe({
                next: (value: T): void => observer.next(transform(value)),
                error: (err: Error): void => observer.error(err),
                complete: (): void => observer.complete(),
            });
        });
    };
}

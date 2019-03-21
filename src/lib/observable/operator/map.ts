import { CancelSubscription } from '../observable/CancelSubscription';
import { Observable } from '../observable/Observable';
import { SafeObserver } from '../observer/SafeObserver';
import { Operator } from './Operator';

export type MapFunction<T, K> = (input: T) => K;

export function map<T, K>(transform: MapFunction<T, K>): Operator {
    return (observable: Observable<T>): Observable<K> => {
        return new Observable<K>((observer: SafeObserver<K>): CancelSubscription => {
            return observable.subscribe({
                next: (value: T): void => observer.next(transform(value)),
                error: (err: Error): void => observer.error(err),
                complete: (): void => observer.complete()
            });
        });
    };
}

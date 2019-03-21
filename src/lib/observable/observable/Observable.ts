import { IObserver } from '../observer/IObserver';
import { SafeObserver } from '../observer/SafeObserver';
import { Operator } from '../operator/Operator';
import { CancelSubscription } from './CancelSubscription';
import { SubscriptionFactory } from './SubscriptionFactory';

/**
 * Observable implem
 */

export class Observable<T> {
    private _subscriber: SubscriptionFactory<T>;

    constructor(subscriber: SubscriptionFactory<T>) {
        this._subscriber = subscriber;
    }

    /**
     * Couple the subscriber with the observer, creating a subscription. The subscriber encapsulates a datasource. It will call the
     * `next`/`complete`/`error` methods on the provided observer.
     */
    public subscribe(observer: IObserver<T>): CancelSubscription {
        const safeObserver: SafeObserver<T> = new SafeObserver<T>(observer);

        safeObserver.registerUnsubscribeHandler(this._subscriber(safeObserver));

        return safeObserver.unsubscribe.bind(safeObserver);
    }

    public pipe<K>(...operators: Operator[]): Observable<K> {
        return operators.reduce(
            // tslint:disable-next-line no-any
            (observable: Observable<any>, operator: Operator): Observable<any> => operator(observable),
            this
        );
    }
}

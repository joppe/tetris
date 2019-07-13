import { CancelSubscription } from './CancelSubscription';
import { Observer } from '../observer/Observer';
import { Operator } from '../operator/Operator';
import { SafeObserver } from '../observer/SafeObserver';
import { SubscriptionFactory } from './SubscriptionFactory';

export class Observable<T> {
    private readonly _subscriber: SubscriptionFactory<T>;

    constructor(subscriber: SubscriptionFactory<T>) {
        this._subscriber = subscriber;
    }

    /**
     * Couple the subscriber with the observer, creating a subscription.
     * The subscriber encapsulates a datasource. It will call the
     * `next`/`complete`/`error` methods on the provided observer.
     */
    public subscribe(observer: Observer<T>): CancelSubscription {
        const safeObserver: SafeObserver<T> = new SafeObserver<T>(observer);

        safeObserver.registerUnsubscribeHandler(this._subscriber(safeObserver));

        return (): void => {
            safeObserver.unsubscribe();
        };
    }

    public pipe<K>(...operators: Operator<any, any>[]): Observable<K> {
        return operators.reduce(
            (observable: Observable<any>, operator: Operator<any, any>): Observable<any> =>
                operator(observable),
            this,
        );
    }
}

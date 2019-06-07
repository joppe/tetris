import { CancelSubscription } from './CancelSubscription';
import { Observer } from '../observer/Observer';

/**
 * This is a function that couples a data source to an observer. A so called "subscription".
 * The function returns a function that can cancel/destory the subscription.
 */

export interface SubscriptionFactory<T> {
    (observer: Observer<T>): CancelSubscription;
}

import { IObserver } from '../observer/IObserver';
import { CancelSubscription } from './CancelSubscription';

/**
 * This is a function that couples a data source to an observer. A so called "subscription".
 * The function returns a function that can cancel/destory the subscription.
 */

export type SubscriptionFactory<T> = (observer: IObserver<T>) => CancelSubscription;

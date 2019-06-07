import { Observer } from './Observer';

/**
 * Safe implementation of an Observer
 *
 * @source https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87
 */

export class SafeObserver<T> implements Observer<T> {
    private _isUnsubscribed: boolean = false;
    private readonly _observer: Observer<T>;
    private _unsubscribeHandler: Function | undefined;

    constructor(observer: Observer<T>) {
        this._observer = observer;
    }

    public next(value: T): void {
        // only try to next if you're subscribed have a handler
        if (!this._isUnsubscribed && this._observer.next) {
            try {
                this._observer.next(value);
            } catch (err) {
                // if the provided handler errors, teardown resources, then throw
                this.unsubscribe();

                throw err;
            }
        }
    }

    public error(err: Error): void {
        // only try to emit error if you're subscribed and have a handler
        if (!this._isUnsubscribed && this._observer.error) {
            try {
                this._observer.error(err);
            } catch (e2) {
                // if the provided handler errors, teardown resources, then throw
                this.unsubscribe();

                throw e2;
            }
            this.unsubscribe();
        }
    }

    public complete(): void {
        // only try to emit completion if you're subscribed and have a handler
        if (!this._isUnsubscribed && this._observer.complete) {
            try {
                this._observer.complete();
            } catch (err) {
                // if the provided handler errors, teardown resources, then throw
                this.unsubscribe();

                throw err;
            }

            this.unsubscribe();
        }
    }

    public registerUnsubscribeHandler(unsubscribeHandler: Function): void {
        this._unsubscribeHandler = unsubscribeHandler;
    }

    public unsubscribe(): void {
        this._isUnsubscribed = true;

        if (this._unsubscribeHandler) {
            this._unsubscribeHandler();
        }
    }
}

import { CancelSubscription } from '../observable';
import { Observer } from '../observer';
import { Subject } from './Subject';

export class CurrentValueSubject<T> extends Subject<T> {
    private _currentValue: T;

    constructor(initialValue: T) {
        super();

        this._currentValue = initialValue;
    }

    public next(value: T): void {
        this._currentValue = value;

        super.next(value);
    }

    public subscribe(observer: Observer<T>): CancelSubscription {
        const cancel: CancelSubscription = super.subscribe(observer);

        if (observer.next !== undefined) {
            observer.next(this._currentValue);
        }

        return cancel;
    }
}

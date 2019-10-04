import { Observable } from '@apestaartje/observable/observable/Observable';
import { Observer } from '@apestaartje/observable/observer/Observer';
import { Subscription } from '@apestaartje/observable/observable/Subscription';
import { Subscriber } from '@apestaartje/observable/observable/Subscriber';
import { SafeObserver } from '@apestaartje/observable/observer/SafeObserver';

describe('Observable', (): void => {
    let next: (v: boolean) => void;
    let complete: () => void;
    let error: (err: Error) => void;
    let observable: Observable<boolean>;
    let safeObserver: SafeObserver<boolean>;
    let subscriber: Subscriber<boolean>;
    let subscriberCalled: boolean;

    const observer: Observer<boolean> = {
        next(value: boolean): void {
            // nothing
        },
    };
    const subscription: Subscription = {
        unsubscribe(): void {
            // nothing
        },
    };

    beforeEach((): void => {
        subscriberCalled = false;

        subscriber = (o: SafeObserver<boolean>): Subscription => {
            safeObserver = o;
            subscriberCalled = true;

            next = (v: boolean): void => {
                o.next(v);
            };

            complete = (): void => {
                o.complete();
            };

            error = (err: Error): void => {
                o.error(err);
            };

            return subscription;
        };

        observable = new Observable<boolean>(subscriber);
    });

    describe('constructor', (): void => {
        it('the subscriber is stored but not executed', (): void => {
            expect(subscriberCalled).toBe(false);
        });
    });

    describe('subscribe', (): void => {
        it('the subscriber is called when the subscribe method is called', (): void => {
            observable.subscribe(observer);

            expect(subscriberCalled).toBe(true);
        });

        it('the data source subscription is unsubscribed when the observer unsubscribes', (): void => {
            const unsubscibeSpy: jasmine.Spy = spyOn(subscription, 'unsubscribe');
            const sub: Subscription = observable.subscribe(observer);

            sub.unsubscribe();

            expect(unsubscibeSpy).toHaveBeenCalled();
        });

        it('when the data source emits a value, that value is passed to the next method of the observer', (): void => {
            observable.subscribe(observer);

            // the safeobserver is set after subscribe call
            const observerSpy: jasmine.Spy = spyOn(safeObserver, 'next');
            next(true);

            expect(observerSpy).toHaveBeenCalledWith(true);
        });

        it('when finished doesn\'t receive new values via next', (): void => {
            observable.subscribe(observer);

            // the safeobserver is set after subscribe call
            const observerSpy: jasmine.Spy = spyOn(safeObserver, 'next');
            complete();
            next(false);

            expect(observerSpy).toHaveBeenCalled();
        });

        it('when unsubscribed doesn\'t receive new values via next', (): void => {
            observable.subscribe(observer);

            // the safeobserver is set after subscribe call
            const observerSpy: jasmine.Spy = spyOn(safeObserver, 'next');
            subscription.unsubscribe();
            next(false);

            expect(observerSpy).toHaveBeenCalled();
        });

        it('when an error occurs the error method is called', (): void => {
            observable.subscribe(observer);

            // the safeobserver is set after subscribe call
            const observerSpy: jasmine.Spy = spyOn(safeObserver, 'error');
            const e: Error = new Error('?');
            error(e);

            expect(observerSpy).toHaveBeenCalledWith(e);
        });
    });

    describe('pipe', (): void => {

    });
});

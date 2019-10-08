import { Observer } from '@apestaartje/observable/observer/Observer';
import { SafeObserver } from '@apestaartje/observable/observer/SafeObserver';
import { Subscription } from '@apestaartje/observable/observable/Subscription';

type NextableObserver<T> = { next(v: T): void };
type ErrorableObserver<T> = { error(e: Error): void };
type CompletableObserver<T> = { complete(): void };

describe('SafeObserver', (): void => {
    describe('next', (): void => {
        it('if the observer has no next method, do nothing', (): void => {
            const s: SafeObserver<number> = new SafeObserver<number>({});

            s.next(1);
        });

        it('if next method is defined, call it with the given argument', (): void => {
            const o: NextableObserver<number> = {
                next(v: number): void {
                    // nothing
                },
            };
            const s: SafeObserver<number> = new SafeObserver<number>(o);
            const nextSpy: jasmine.Spy = spyOn(o, 'next');

            s.next(16);

            expect(nextSpy).toHaveBeenCalledWith(16);
        });

        it('when an exception is thrown the observer will unsubscribe and throw an error', (): void => {
            const o: NextableObserver<number> = {
                next(v: number): void {
                    throw new Error('?');
                },
            };
            const u: Subscription = {
                unsubscribe(): void {
                    // nothing
                },
            };
            const s: SafeObserver<number> = new SafeObserver<number>(o);
            s.registerSubscription(u);

            const unsubscriptionSpy: jasmine.Spy = spyOn(u, 'unsubscribe');

            expect((): void => {
                s.next(16);
            }).toThrow();

            expect(unsubscriptionSpy).toHaveBeenCalled();
        });
    });

    describe('error', (): void => {
        it('if the observer has no error method, do nothing', (): void => {
            const s: SafeObserver<number> = new SafeObserver<number>({});

            s.error(new Error('!'));
        });

        it('if error method is defined, call it with the given error and unsubscribe', (): void => {
            const o: ErrorableObserver<number> = {
                error(e: Error): void {
                    // nothing
                },
            };
            const u: Subscription = {
                unsubscribe(): void {
                    // nothing
                },
            };
            const unsubscriptionSpy: jasmine.Spy = spyOn(u, 'unsubscribe');
            const s: SafeObserver<number> = new SafeObserver<number>(o);
            s.registerSubscription(u);

            const errorSpy: jasmine.Spy = spyOn(o, 'error');
            const e: Error = new Error('??');

            s.error(e);

            expect(errorSpy).toHaveBeenCalledWith(e);
            expect(unsubscriptionSpy).toHaveBeenCalled();
        });

        it('when an exception is thrown the observer will unsubscribe and throw an error', (): void => {
            const e: Error = new Error('??');
            const o: ErrorableObserver<number> = {
                error(err: Error): void {
                    throw e;
                },
            };
            const u: Subscription = {
                unsubscribe(): void {
                    // nothing
                },
            };
            const s: SafeObserver<number> = new SafeObserver<number>(o);
            s.registerSubscription(u);

            const unsubscriptionSpy: jasmine.Spy = spyOn(u, 'unsubscribe');

            expect((): void => {
                s.error(new Error('**'));
            }).toThrowError('??');

            expect(unsubscriptionSpy).toHaveBeenCalled();
        });
    });
});

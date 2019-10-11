import { Subject } from '@apestaartje/observable/subject/Subject';
import { Subscription } from '@apestaartje/observable/observable/Subscription';

type NextableObserver<T> = { next(v: T): void };
type ErrorableObserver<T> = { error(e: Error): void };
type CompletableObserver<T> = { complete(): void };
type CompleteObserver<T> = NextableObserver<T> & ErrorableObserver<T> & CompletableObserver<T>;

describe('Subject', (): void => {
    const observer1: CompleteObserver<number> = {
        next(v: number): void {
            // nothing
        },
        error(e: Error): void {
            // nothing
        },
        complete(): void {
            // nothing
        },
    };
    const observer2: CompleteObserver<number> = {
        next(v: number): void {
            // nothing
        },
        error(e: Error): void {
            // nothing
        },
        complete(): void {
            // nothing
        },
    };

    it('is an observable with multicast', (): void => {
        const nextSpy1: jasmine.Spy = spyOn(observer1, 'next');
        const nextSpy2: jasmine.Spy = spyOn(observer2, 'next');
        const subject: Subject<number> = new Subject();

        subject.subscribe(observer1);
        subject.subscribe(observer2);
        subject.next(33);

        expect(nextSpy1).toHaveBeenCalledWith(33);
        expect(nextSpy2).toHaveBeenCalledWith(33);
    });

    it('when all observers are unsubscribed it will complete', (): void => {
        const subject: Subject<number> = new Subject();
        const completeSpy: jasmine.Spy = spyOn(subject, 'complete');
        const subscription1: Subscription = subject.subscribe(observer1);
        const subscription2: Subscription = subject.subscribe(observer2);

        subject.next(33);
        subscription1.unsubscribe();
        subscription2.unsubscribe();

        expect(completeSpy).toHaveBeenCalled();
    });
});

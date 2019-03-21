import { Timer } from '../data-source/Timer';
import { SafeObserver } from '../observer/SafeObserver';
import { CancelSubscription } from './CancelSubscription';
import { Observable } from './Observable';

export function timer(duration: number): Observable<number> {
    return new Observable<number>((observer: SafeObserver<number>): CancelSubscription => {
        // Our data source coupled to our observer.
        const t: Timer = new Timer(
            {
                onComplete: (): void => {
                    observer.complete();
                },
                onData: (value: number): void => {
                    observer.next(value);
                }
            },
            duration
        );

        return (): void => {
            t.destroy();
        };
    });
}

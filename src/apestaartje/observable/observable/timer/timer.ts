import { Observable } from '../Observable';
import { SafeObserver } from '../../observer/SafeObserver';
import { Subscription } from '../Subscription';
import { Timer } from '../../data-source/timer/Timer';

export function timer(duration: number): Observable<number> {
    return new Observable<number>((observer: SafeObserver<number>): Subscription => {
        // Our data source coupled to our observer.
        const t: Timer = new Timer(
            {
                onComplete: (): void => {
                    observer.complete();
                },
                onData: (value: number): void => {
                    observer.next(value);
                },
            },
            duration,
        );

        return {
            unsubscribe(): void {
                t.destroy();
            },
        };
    });
}

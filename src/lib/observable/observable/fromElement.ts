import { SafeObserver } from '../observer/SafeObserver';
import { CancelSubscription } from './CancelSubscription';
import { Observable } from './Observable';

export function fromElement(element: HTMLElement, eventName: string): Observable<Event> {
    return new Observable<Event>((observer: SafeObserver<Event>): CancelSubscription => {
        function handle(event: Event): void {
            observer.next(event);
        }

        element.addEventListener(eventName, handle);

        return (): void => {
            element.removeEventListener(eventName, handle);
        };
    });
}

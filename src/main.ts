import { CancelSubscription } from '@apestaartje/observable/observable/CancelSubscription';
import { fromElement } from '@apestaartje/observable/observable/factory/fromElement';
import { map } from '@apestaartje/observable/operator/map/map';
import { timer } from '@apestaartje/observable/observable/factory/timer';

const subscription: CancelSubscription = timer(20)
    .pipe(
        map((x: number): number => x * 2),
    )
    .subscribe({
        next(value: number): void {
            window.console.log(value);
        },
        error(err: Error): void {
            window.console.log(err);
        },
        complete(): void {
            window.console.log('Complete');
        },
    });

const button: HTMLButtonElement = window.document.createElement('button');

button.setAttribute('type', 'button');
button.innerText = 'Click me';
window.document.body.appendChild(button);

fromElement(button, 'click')
    .subscribe({
        next: (event: Event): void => {
            window.console.log(event);
        },
    });

import { fromElement } from '@apestaartje/observable/observable/fromElement';
import { timer } from '@apestaartje/observable/observable/timer';
import { map } from '@apestaartje/observable/operator/map';

timer(20)
    .pipe(
        map((x: number): number => x * 2)
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
    }
    });

const button: HTMLButtonElement = window.document.createElement('button');

button.setAttribute('type', 'button');
button.innerText = 'Click me';
window.document.body.appendChild(button);

fromElement(button, 'click')
    .subscribe({
        next: (event: Event): void => {
            window.console.log(event);
        }
    });

import { CancelSubscription } from '@apestaartje/observable/observable/CancelSubscription';
import { fromElement } from '@apestaartje/observable/observable/factory/fromElement';
import { CurrentValueSubject } from '@apestaartje/observable/subject';

const subject: CurrentValueSubject<number> = new CurrentValueSubject<number>(-1);

const startButton: HTMLButtonElement = window.document.createElement('button');

startButton.setAttribute('type', 'button');
startButton.innerText = 'Start';
window.document.body.appendChild(startButton);

fromElement(startButton, 'click')
    .subscribe({
        next: (event: Event): void => {
            window.console.log('Start');
            window.setInterval(
                (): void => {
                    subject.next(Date.now());
                },
                500,
            );
        },
    });

const consoleObservable: CancelSubscription = subject.subscribe({
    next(value: number): void {
        window.console.log(`Observing subject, value = ${value}`);
    },
});

const completeButton: HTMLButtonElement = window.document.createElement('button');

completeButton.setAttribute('type', 'button');
completeButton.innerText = 'Complete subject';
window.document.body.appendChild(completeButton);

fromElement(completeButton, 'click')
    .subscribe({
        next: (event: Event): void => {
            window.console.log('Complete subject');
            subject.complete();
        },
    });

const unsubscribeConsoleObservableButton: HTMLButtonElement = window.document.createElement('button');

unsubscribeConsoleObservableButton.setAttribute('type', 'button');
unsubscribeConsoleObservableButton.innerText = 'Complete console observable';
window.document.body.appendChild(unsubscribeConsoleObservableButton);

fromElement(unsubscribeConsoleObservableButton, 'click')
    .subscribe({
        next: (event: Event): void => {
            window.console.log('Unsubscribe console observable');
            consoleObservable();
        },
    });

const textElement: HTMLDivElement = window.document.createElement('div');
window.document.body.appendChild(textElement);

const textObservable: CancelSubscription = subject.subscribe({
    next(value: number): void {
        textElement.innerText = String(value);
    },
});

const unsubscribeTextObservableButton: HTMLButtonElement = window.document.createElement('button');

unsubscribeTextObservableButton.setAttribute('type', 'button');
unsubscribeTextObservableButton.innerText = 'Complete text observable';
window.document.body.appendChild(unsubscribeTextObservableButton);

fromElement(unsubscribeTextObservableButton, 'click')
    .subscribe({
        next: (event: Event): void => {
            window.console.log('Unsubscribe text observable');
            textObservable();
        },
    });

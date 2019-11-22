import { Observable } from '@apestaartje/observable/dist/observable/Observable';
import { SafeObserver } from '@apestaartje/observable/dist/observer/SafeObserver';
import { Subscription } from '@apestaartje/observable/dist/observable/Subscription';

import { Action } from './Action';
import { Control } from './Control';

const CLOCKWISE: number = 65;
const COUNTER_CLOCKWISE: number = 83;
const DOWN: number = 40;
const LEFT: number = 37;
const RIGHT: number = 39;

export function keyboard(): Control {
    return new Observable<Action>((observer: SafeObserver<Action>): Subscription => {
        function handle(event: KeyboardEvent): void {
            switch (event.which) {
                case LEFT:
                    observer.next(Action.Left);
                    break;
                case RIGHT:
                    observer.next(Action.Right);
                    break;
                case CLOCKWISE:
                    observer.next(Action.ClockWise);
                    break;
                case COUNTER_CLOCKWISE:
                    observer.next(Action.CounterClockWise);
                    break;
                case DOWN:
                    observer.next(Action.Down);
                    break;
                default:
                    // nothing
            }
        }

        window.addEventListener('keydown', handle);

        return {
            unsubscribe(): void {
                window.removeEventListener('keydown', handle);
            },
        };
    });
}

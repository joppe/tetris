import { IActions } from 'app/tetris/control/IActions';

const DEFAULT_ACTONS: IActions = {
    left(): void {
        window.console.log('left action not configured');
    },
    right(): void {
        window.console.log('right action not configured');
    },
    clockwise(): void {
        window.console.log('clockwise action not configured');
    },
    counterClockwise(): void {
        window.console.log('counterClockwise action not configured');
    }
};

const LEFT: number = 37;
const RIGHT: number = 39;
const CLOCKWISE: number = 65;
const COUNTER_CLOCKWISE: number = 83;

export function keyboard(config: Partial<IActions> = {}): void {
    const actions: IActions = {...DEFAULT_ACTONS, ...config};

    window.addEventListener('keydown', (event: KeyboardEvent): void => {
        switch (event.which) {
            case LEFT:
                actions.left();
                break;
            case RIGHT:
                actions.right();
                break;
            case CLOCKWISE:
                actions.clockwise();
                break;
            case COUNTER_CLOCKWISE:
                actions.counterClockwise();
                break;
            default:
                window.console.log(`keydown ${event.which}`);
        }
    });
}

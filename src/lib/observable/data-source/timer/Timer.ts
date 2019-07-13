import { DataSource } from '../DataSource';
import { Options } from '../Options';

/**
 * Emit values over a period of time
 */

export class Timer extends DataSource<number> {
    private _counter: number = 0;
    private readonly _interval: number;
    private readonly _repeat: number;

    constructor(options: Options<number>, repeat: number, delay: number = 1000) {
        super(options);

        this._repeat = repeat;
        this._interval = window.setInterval(
            (): void => {
                this.emit(this._counter);

                this._counter += 1;
            },
            delay,
        );
    }

    public destroy(): void {
        window.clearInterval(this._interval);
    }

    protected emit(value: number): void {
        if (this._onData !== undefined) {
            this._onData(value);
        }

        if (this._repeat === value) {
            if (this._onComplete !== undefined) {
                this._onComplete();
            }

            this.destroy();
        }
    }
}

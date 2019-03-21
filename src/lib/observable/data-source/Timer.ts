import { DataSource } from './DataSource';
import { DataSourceOptions } from './DataSourceOptions';

/**
 * Emit values over a period of time
 */

export class Timer extends DataSource<number> {
    private _counter: number = 0;
    private _interval: number;
    private _repeat: number;

    constructor(handlers: DataSourceOptions<number>, repeat: number, delay: number = 1000) {
        super(handlers);

        this._repeat = repeat;
        this._interval = window.setInterval(
            (): void => {
                this.emit(this._counter);

                this._counter += 1;
            },
            delay
        );
    }

    public destroy(): void {
        window.clearInterval(this._interval);
    }

    protected emit(value: number): void {
        if (this._onData) {
            this._onData(value);
        }

        if (this._repeat === value) {
            if (this._onComplete) {
                this._onComplete();
            }

            this.destroy();
        }
    }
}

import { CompleteHandler } from './CompleteHandler';
import { DataHandler } from './DataHandler';
import { Options } from './Options';

/**
 * Abstract class for emitting data
 */

export abstract class DataSource<T> {
    protected _onComplete: CompleteHandler | undefined;
    protected _onData: DataHandler<T> | undefined;

    constructor({ onData, onComplete }: Partial<Options<T>>) {
        this._onComplete = onComplete;
        this._onData = onData;
    }

    public abstract destroy(): void;

    protected emit(value: T): void {
        if (this._onData !== undefined) {
            this._onData(value);
        }
    }
}

import { DataSourceOptions } from './DataSourceOptions';

/**
 * Abstract class for emitting data
 */

export abstract class DataSource<T> {
    protected _onComplete: () => void | undefined;
    protected _onData: (value: T) => void | undefined;

    constructor({ onData, onComplete}: Partial<DataSourceOptions<T>>) {
        this._onComplete = onComplete;
        this._onData = onData;
    }

    public abstract destroy(): void;

    protected emit(value: T): void {
        if (this._onData) {
            this._onData(value);
        }
    }
}

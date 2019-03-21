export type DataSourceOptions<T> = {
    onData(value: T): void;
    onComplete(): void;
};

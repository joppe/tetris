export interface Options<T> {
    onData(value: T): void;
    onComplete(): void;
}

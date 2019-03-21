export interface IObserver<T> {
    next?(value: T): void;
    error?(err: Error): void;
    complete?(): void;
}

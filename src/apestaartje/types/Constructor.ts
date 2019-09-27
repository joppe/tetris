export interface Constructor<T> {
    // tslint:disable-next-line no-any
    new(...args: any[]): T;
}

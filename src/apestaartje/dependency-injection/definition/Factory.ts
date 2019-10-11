/**
 * A function that can create a dependency.
 */

export interface Factory<T> {
    // tslint:disable-next-line no-any
    (...args: any[]): T;
}

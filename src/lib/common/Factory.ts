/**
 * A function that can create a dependency.
 */

// tslint:disable-next-line no-any
export type Factory<T> = (...args: any[]) => T;

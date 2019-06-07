export interface Setter<T> {
    (value: T[keyof T], obj: T): T;
}

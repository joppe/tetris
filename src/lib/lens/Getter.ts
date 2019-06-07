export interface Getter<T> {
    (obj: T): T[keyof T];
}

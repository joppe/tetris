export interface Updater<T> {
    (old: T): T;
}

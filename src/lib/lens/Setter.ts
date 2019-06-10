export interface Setter<T, K> {
    (value: K, obj: T): T;
}

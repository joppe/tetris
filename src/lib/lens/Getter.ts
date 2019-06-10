export interface Getter<T, K> {
    (prop: T): K;
}

export interface Storage {
    get<T>(key: string): T;

    set<T>(key: string, data: T): void;

    has(key: string): boolean;

    clear(key?: string): void;
}

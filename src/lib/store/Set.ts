import { Updater } from './Updater';

export interface Set<T> {
    (updater: Updater<T>): void;
}

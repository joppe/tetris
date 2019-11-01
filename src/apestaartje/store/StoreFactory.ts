import { Store } from '@apestaartje/store/Store';

export interface StoreFactory {
    <T extends object>(initial: T): Store<T>;
}

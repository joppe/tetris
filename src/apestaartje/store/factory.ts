import { Store } from '@apestaartje/store/Store';
import { StoreFactory } from '@apestaartje/store/StoreFactory';

export const factory: StoreFactory = ((): StoreFactory => {
    // tslint:disable-next-line no-any
    let store: Store<any>;

    return <T extends object>(initial: T): Store<T> => {
        if (store === undefined) {
            store = new Store<T>(initial);
        }

        return store;
    };
})();

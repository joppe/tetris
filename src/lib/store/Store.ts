import { Lens, view } from '@apestaartje/lens';

import { Set } from './Set';
import { Updater } from './Updater';

// tslint:disable:no-reserved-keywords

export class Store<T> {
    public data: T;
    public set: Set<T>;

    constructor(data: T, set?: Set<T>) {
        this.data = data;

        if (set !== undefined) {
            this.set = set;
        } else {
            this.set = (updater: Updater<T>): void => {
                console.log('super set');
                this.data = updater(this.data);
                console.log('super data', this.data);
            };
        }

        this.promap = this.promap.bind(this);
    }

    public promap<K>(lens: Lens<T, K>): Store<K> {
        const set = (updater: Updater<K>): void => {
            this.set((old: any): any => {
                console.log('old', old);
                return lens.set(updater(lens.get(old)), old);
            });
        };

        console.log('data', this.data, view<T, K>(lens, this.data));
        return new Store(view<T, K>(lens, this.data), set);
    }
}

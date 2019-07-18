import { view, Lens } from '@apestaartje/lens';

import { Set } from './Set';
import { Updater } from './Updater';

let counter: number = 0;

export class Store<T> {
    public data: T;
    public set: Set<T>;
    public counter: number;

    constructor(data: T, set?: Set<T>) {
        this.data = data;
        this.counter = counter++;

        console.log('NEW STOTE!', this.counter, this.data, set);
        if (set !== undefined) {
            this.set = set;
        } else {
            this.set = (updater: Updater<T>): void => {
                console.log('super set', this.counter);
                this.data = updater(this.data);
                console.log('super data', this.data);
            };
        }

        // this.promap = this.promap.bind(this);
    }

    public promap<K>(lens: Lens<T, K>): Store<K> {
        const set = (updater: Updater<K>): void => {
            this.set((old: any): any => {
                console.log('old', old, this.counter);
                console.log('new', lens.set(updater(lens.get(old)), old));
                return lens.set(updater(lens.get(old)), old);
            });
        };

        console.log('data', this.data, view<T, K>(lens, this.data), this.counter);
        return new Store(view<T, K>(lens, this.data), set);
    }
}

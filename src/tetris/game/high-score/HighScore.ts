import { last } from '@apestaartje/array/dist/last';

import { Entry } from '@tetris/game/high-score/Entry';
import {Storage} from '@tetris/storage/Storage';
import { container } from '@tetris/dependency-injection/container';

const LOCAL_STORAGE_KEY: string = 'tetris_high_score';

export class HighScore {
    private _entries: Entry[] = [];
    private readonly _maxEntries: number;
    private readonly _storage: Storage;

    constructor(maxEntries: number) {
        this._maxEntries = maxEntries;
        this._storage = container.resolve('storage');

        this._entries = this.fetch();
    }

    public getAll(): Entry[] {
        return this._entries;
    }

    public addScore(score: number, name: string): void {
        const entry: Entry = {
            score,
            name,
            date: Date.now(),
        };
        const entries: Entry[] = this._entries.concat(entry);

        entries.sort((a: Entry, b: Entry): number => a.score > b.score ? 1 : -1);

        this.store(entries);
    }

    public isTopScore(score: number | undefined): boolean {
        if (score === undefined || score === 0) {
            return false;
        }

        if (this._entries.length < this._maxEntries) {
            return true;
        }

        return last(this._entries).score < score;
    }

    private fetch(): Entry[] {
        if (this._storage.has(LOCAL_STORAGE_KEY)) {
            return this._storage.get<Entry[]>(LOCAL_STORAGE_KEY);
        }

        return [];
    }

    private store(entries: Entry[]): void {
        this._entries = entries;
        this._storage.set<Entry[]>(LOCAL_STORAGE_KEY, this._entries);
    }
}

import { last } from '@apestaartje/array/dist/last';

import { Entry } from '@tetris/game/high-score/Entry';

const LOCAL_STORAGE_KEY: string = 'tetris_high_score';

export class HighScore {
    private _entries: Entry[] = [];
    private _maxEntries: number;

    constructor(maxEntries: number) {
        this._maxEntries = maxEntries;
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

        this._entries = entries;
    }

    public isTopScore(score: number): boolean {
        if (this._entries.length < this._maxEntries) {
            return true;
        }

        return last(this._entries).score < score;
    }

    private fetch(): void {
        const raw: string | null = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        if (raw === null) {
            return;
        }

        this._entries = JSON.parse(raw);
    }

    private store(): void {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._entries));
    }
}

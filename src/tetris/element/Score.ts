export class Score {
    private _element: HTMLElement;

    private _score: number = 0;

    get score(): number {
        return this._score;
    }

    constructor(element: HTMLElement) {
        this._element = element;
    }

    public add(score: number): void {
        this._score += score;

        this.update();
    }

    public update(): void {
        this._element.innerText = String(this._score);
    }
}

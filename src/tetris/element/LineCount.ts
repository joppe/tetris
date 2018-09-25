export class LineCount {
    private _element: HTMLElement;

    private _count: number = 0;

    get count(): number {
        return this._count;
    }

    constructor(element: HTMLElement) {
        this._element = element;
    }

    public add(count: number): void {
        this._count += count;

        this.update();
    }

    public update(): void {
        this._element.innerText = String(this._count);
    }
}

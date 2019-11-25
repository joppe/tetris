import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component';
import { container } from '@tetris/dependency-injection/container';
import { Store } from '@apestaartje/store/dist/Store';
import { Data } from '@tetris/store/Data';
import { ChildElement } from '@apestaartje/dom/dist/custom-element/decorator/child-element';

@Component({
    selector: 'tetris-score',
    template: `<h3></h3>`,
})
export class Score extends HTMLElement {
    @ChildElement('h3')
    public _score: HTMLElement;

    private _store: Store<Data>;

    public connectedCallback(): void {
        this._store = container.resolve<Store<Data>>('store');
        this._store.subscribe('score', this.updateScore.bind(this));
    }

    private updateScore(score: number): void {
        this._score.innerText = String(score);
    }
}

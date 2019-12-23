import { ChildElement } from '@apestaartje/dom/dist/custom-element/decorator/child-element/ChildElement';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { Input } from '@apestaartje/dom/dist/custom-element/decorator/input/Input';
import { InputType } from '@apestaartje/dom/dist/custom-element/decorator/input/InputType';

// tslint:disable no-import-side-effect
import '@tetris/view/component/NavigationLink';
// tslint:enable no-import-side-effect

import { container } from '@tetris/dependency-injection/container';
import { Entry } from '@tetris/game/high-score/Entry';
import { Event } from '@tetris/finite-state-machine/global/Event';
import { HighScore } from '@tetris/game/high-score/HighScore';

@Component({
    selector: 'tetris-high-score-page',
    template: `
        <h1>High Score</h1>

        <table class="c-high-score-table"></table>

        <nav>
            <tetris-navigation-link event-name="${Event.Home}" title="Home"></tetris-navigation-link>
        </nav>
    `,
})
export class HighScorePage extends HTMLElement {
    @Input({
        attribute: 'active',
        watch: true,
        type: InputType.Bool,
    })
    public active: boolean;

    @ChildElement('table')
    public table: HTMLOListElement;

    private readonly _highScore: HighScore;
    private _isConnected: boolean = false;

    constructor() {
        super();

        this._highScore = container.resolve<HighScore>('high-score');
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (this._isConnected && name === 'active') {
            this.toggle();
        }
    }

    public connectedCallback(): void {
        this._isConnected = true;
        this.toggle();
    }

    private toggle(): void {
        if (!this.active) {
            return;
        }

        // tslint:disable-next-line no-inner-html
        this.table.innerHTML = '';

        this._highScore
            .getAll()
            .forEach((entry: Entry): void => {
                const tr: HTMLElement = document.createElement('tr');
                const day: Date = new Date(entry.date);

                // tslint:disable-next-line no-inner-html
                tr.innerHTML = `
                    <td>${String(entry.score)}</td>
                    <td>${String(entry.name)}</td>
                `;

                this.table.append(tr);
            });
    }
}

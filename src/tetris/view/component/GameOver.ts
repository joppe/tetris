import { ChildElement } from '@apestaartje/dom/dist/custom-element/decorator/child-element/ChildElement';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { EventEmitter } from '@apestaartje/dom/dist/custom-element/decorator/output/EventEmitter';
import { Input } from '@apestaartje/dom/dist/custom-element/decorator/input/Input';
import { InputType } from '@apestaartje/dom/dist/custom-element/decorator/input/InputType';
import { Output } from '@apestaartje/dom/dist/custom-element/decorator/output/Output';
import { Store } from '@apestaartje/store/dist/Store';

// tslint:disable no-import-side-effect
import '@tetris/view/component/EnterName';
// tslint:enable no-import-side-effect

import { container } from '@tetris/dependency-injection/container';
import { Data } from '@tetris/store/Data';
import { Event as GlobalEvent} from '@tetris/finite-state-machine/global/Event';
import { HighScore } from '@tetris/game/high-score/HighScore';

const ACTIVE_CLASS: string = 'active';

@Component({
    selector: 'tetris-game-over',
    template: `
        <h3 class="c-game-over__title">GAME OVER</h3>

        <tetris-enter-name active="true"></tetris-enter-name>

        <nav>
            <tetris-navigation-link event-name="${GlobalEvent.Home}" title="Home"></tetris-navigation-link>
            <tetris-navigation-link event-name="${GlobalEvent.HighScore}" title="High Score"></tetris-navigation-link>
        </nav>
    `,
})
export class GameOver extends HTMLElement {
    @Input({
        attribute: 'active',
        watch: true,
        type: InputType.Bool,
    })
    public active: boolean;

    @ChildElement('tetris-enter-name')
    public enterName: HTMLElement;

    @ChildElement('nav')
    public nav: HTMLElement;

    @Output('state-change')
    public stateChange: EventEmitter<string>;

    private readonly _highScore: HighScore;
    private readonly _store: Store<Data>;

    public constructor() {
        super();

        this._highScore = container.resolve('high-score');
        this._store = container.resolve('store');
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'active') {
            this.toggle();
        }
    }

    private toggle(): void {
        if (this.active) {
            const showEnterName: boolean = this._highScore.isTopScore(this._store.get('score'));

            this.nav.style.display = showEnterName ? 'none' : 'block';
            this.enterName.setAttribute('active', String(showEnterName));
            this.classList.add(ACTIVE_CLASS);
        } else {
            this.classList.remove(ACTIVE_CLASS);
        }
    }
}

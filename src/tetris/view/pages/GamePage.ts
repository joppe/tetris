import { ChildElement } from '@apestaartje/dom/dist/custom-element/decorator/child-element/ChildElement';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { factory as stateFactory } from '@apestaartje/finite-state-machine/dist/machine/factory';
import { Input } from '@apestaartje/dom/dist/custom-element/decorator/input/Input';
import { InputType } from '@apestaartje/dom/dist/custom-element/decorator/input/InputType';
import { Machine } from '@apestaartje/finite-state-machine/dist/machine/Machine';

// tslint:disable no-import-side-effect
import '@tetris/view/component/CountDown';
import '@tetris/view/component/GameCanvas';
import '@tetris/view/component/GameOver';
import '@tetris/view/component/NavigationLink';
import '@tetris/view/component/Score';
// tslint:enable no-import-side-effect

import { config } from '@tetris/finite-state-machine/game/config';
import { Event as GameEvent } from '@tetris/finite-state-machine/game/Event';
import { Event as GlobalEvent} from '@tetris/finite-state-machine/global/Event';
import { State as GameState } from '@tetris/finite-state-machine/game/State';

@Component({
    selector: 'tetris-game-page',
    template: `
        <h1>Game</h1>

        <main>
            <tetris-count-down active="false"></tetris-count-down>
            <tetris-game-canvas active="false"></tetris-game-canvas>
        </main>

        <tetris-game-over active="false"></tetris-game-over>

        <aside>
            <tetris-preview></tetris-preview>
            <tetris-score></tetris-score>
        </aside>

        <nav>
            <tetris-navigation-link event-name="${GlobalEvent.Home}" title="Home"></tetris-navigation-link>
            <tetris-navigation-link event-name="${GlobalEvent.HighScore}" title="High Score"></tetris-navigation-link>
        </nav>
    `,
})
export class GamePage extends HTMLElement {
    @Input({
        attribute: 'active',
        watch: true,
        type: InputType.Bool,
    })
    public active: boolean;

    @ChildElement('tetris-count-down')
    public countDown: HTMLElement;

    @ChildElement('tetris-game-over')
    public gameOver: HTMLElement;

    @ChildElement('tetris-game-canvas')
    public gameCanvas: HTMLElement;

    private _currentState: string = config.initial;
    private readonly _state: Machine;
    private _isConnected: boolean = false;

    public constructor() {
        super();

        this._state = stateFactory(config);

        window.addEventListener('count-down-finished', (): void => {
            this._currentState = this._state.transition(GameEvent.Play, this._currentState);
            this.handleState();
        });

        window.addEventListener('game-over', (): void => {
            this._currentState = this._state.transition(GameEvent.GameOver, this._currentState);
            this.handleState();
        });
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
        if (this.active === true) {
            this._currentState = this._state.transition(GameEvent.CountDown, this._state.initial());
        } else {
            this._currentState = this._state.initial();
        }

        this.handleState();
    }

    private handleState(): void {
        switch (this._currentState) {
            case GameState.CountDown:
                this.gameOver.setAttribute('active', 'false');
                this.gameCanvas.setAttribute('active', 'false');
                this.countDown.setAttribute('active', 'true');
                break;
            case GameState.Play:
                this.gameOver.setAttribute('active', 'false');
                this.countDown.setAttribute('active', 'false');
                this.gameCanvas.setAttribute('active', 'true');
                break;
            case GameState.GameOver:
                this.gameCanvas.setAttribute('active', 'false');
                this.countDown.setAttribute('active', 'false');
                this.gameOver.setAttribute('active', 'true');
                break;
            default:
                this.gameCanvas.setAttribute('active', 'false');
                this.countDown.setAttribute('active', 'false');
                this.gameOver.setAttribute('active', 'false');
        }
    }
}

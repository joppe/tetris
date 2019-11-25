import { ChildElement } from '@apestaartje/dom/dist/custom-element/decorator/child-element/ChildElement';
import { ChildElements } from '@apestaartje/dom/dist/custom-element/decorator/child-element/ChildElements';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { factory as stateFactory } from '@apestaartje/finite-state-machine/dist/machine/factory';
import { Machine } from '@apestaartje/finite-state-machine/dist/machine/Machine';
import { Store } from '@apestaartje/store/dist/Store';

// tslint:disable no-import-side-effect
import '@tetris/view/component/PageContainer';
import '@tetris/view/component/Preview';
import '@tetris/view/pages/GamePage';
import '@tetris/view/pages/HelpPage';
import '@tetris/view/pages/HighscorePage';
import '@tetris/view/pages/HomePage';
// tslint:enable no-import-side-effect

import { config } from '@tetris/finite-state-machine/global/config';
import { container } from '@tetris/dependency-injection/container';
import { Data } from '@tetris/store/Data';
import { State } from '@tetris/finite-state-machine/global/State';

@Component({
    selector: 'tetris-root',
    template: `
        <div class="container">
            <tetris-page-container data-page="${State.Home}" active="${State.Home === config.initial}">
                <tetris-home-page></tetris-home-page>
            </tetris-page-container>
            <tetris-page-container data-page="${State.Game}" active="${State.Game === config.initial}">
                <tetris-game-page active="${State.Game === config.initial}"></tetris-game-page>
            </tetris-page-container>
            <tetris-page-container data-page="${State.Help}" active="${State.Help === config.initial}">
                <tetris-help-page></tetris-help-page>
            </tetris-page-container>
            <tetris-page-container data-page="${State.HighScore}" active="${State.HighScore === config.initial}">
                <tetris-highscore-page></tetris-highscore-page>
            </tetris-page-container>
        </div>
    `,
})
export class Root extends HTMLElement {
    @ChildElements('[data-page]')
    public pages: HTMLElement[];

    @ChildElement('tetris-game-page')
    public gamePage: HTMLElement;

    private _currentState: string = config.initial;
    private readonly _state: Machine;
    private readonly _store: Store<Data>;

    public constructor() {
        super();

        this._state = stateFactory(config);
        this._store = container.resolve<Store<Data>>('store');
    }

    public connectedCallback(): void {
        window.addEventListener('state-change', (event: CustomEvent<string>): void => {
            this.handleStateChange(event.detail);
        });
    }

    private handleStateChange(event: string): void {
        const state: string = this._state.transition(event, this._currentState);

        if (state === this._currentState) {
            return;
        }

        this._currentState = state;

        this.pages.forEach((page: HTMLElement): void => {
            if (page.getAttribute('data-page') === this._currentState) {
                page.setAttribute('active', 'true');
            } else {
                page.setAttribute('active', 'false');
            }
        });

        if (this._currentState === State.Game) {
            this.gamePage.setAttribute('active', 'true');
        } else {
            this.gamePage.setAttribute('active', 'false');
        }
    }
}

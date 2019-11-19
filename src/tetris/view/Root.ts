import { ChildElements } from '@apestaartje/dom/dist/custom-element/decorator/child-element';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { factory as stateFactory } from '@apestaartje/finite-state-machine/dist/machine/factory';
import { Machine } from '@apestaartje/finite-state-machine/dist/machine/Machine';
import { Store } from '@apestaartje/store/dist/Store';

import { config } from '@tetris/finite-state-machine/config';
import { Data } from '@tetris/store/Data';
import { State } from '@tetris/finite-state-machine/State';
import { container } from '@tetris/dependency-injection/container';

// tslint:disable no-import-side-effect
import '@tetris/view/component/PageContainer';
import '@tetris/view/component/Preview';
import '@tetris/view/pages/GamePage';
import '@tetris/view/pages/HelpPage';
import '@tetris/view/pages/HighscorePage';
import '@tetris/view/pages/HomePage';
// tslint:enable no-import-side-effect

@Component({
    selector: 'tetris-root',
    template: `
        <div class="container">
            <tetris-page-container data-page="${State.Home}" active="true">
                <tetris-home></tetris-home>
            </tetris-page-container>
            <tetris-page-container data-page="${State.Game}" active="false">
                <tetris-game></tetris-game>
            </tetris-page-container>
            <tetris-page-container data-page="${State.Help}" active="false">
                <tetris-help></tetris-help>
            </tetris-page-container>
            <tetris-page-container data-page="${State.HighScore}" active="false">
                <tetris-highscore></tetris-highscore>
            </tetris-page-container>
        </div>
    `,
})
export class Root extends HTMLElement {
    @ChildElements('[data-page]')
    public pages: HTMLElement[];

    private _currentPage: string = config.initial;
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
        const active: string = this._state.transition(event, this._currentPage);

        if (active === this._currentPage) {
            return;
        }

        this._currentPage = active;

        this.pages.forEach((page: HTMLElement): void => {
            if (page.getAttribute('data-page') === this._currentPage) {
                page.setAttribute('active', 'true');
            } else {
                page.setAttribute('active', 'false');
            }
        });
    }
}

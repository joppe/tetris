import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { factory } from '@apestaartje/finite-state-machine/dist/machine/factory';
import { Machine } from '@apestaartje/finite-state-machine/dist/machine/Machine';

// tslint:disable-next-line no-import-side-effect
import '@tetris/view/component/PageContainer';
// tslint:disable-next-line no-import-side-effect
import '@tetris/view/pages/HomePage';
// tslint:disable-next-line no-import-side-effect
import '@tetris/view/pages/GamePage';
// tslint:disable-next-line no-import-side-effect
import '@tetris/view/pages/HelpPage';
// tslint:disable-next-line no-import-side-effect
import '@tetris/view/pages/HighscorePage';

import { config } from '@tetris/finite-state-machine/config';
import { State } from '@tetris/finite-state-machine/State';
import { ChildElements } from '@apestaartje/dom/dist/custom-element/decorator/child-element';

@Component({
    selector: 'tetris-root',
    template: `
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
    `,
})
export class Root extends HTMLElement {
    @ChildElements('[data-page]')
    public pages: HTMLElement[];

    private _currentPage: string = config.initial;
    private _state: Machine;

    constructor() {
        super();

        this._state = factory(config);
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

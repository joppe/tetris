// tslint:disable-next-line no-import-side-effect
import '@tetris/view/page/game-page';
// tslint:disable-next-line no-import-side-effect
import '@tetris/view/page/start-page';

import { CustomELement } from '@apestaartje/custom-element/CustomElement';
import { HTMLCustomElement } from '@apestaartje/custom-element/HTMLCustomElement';

@CustomELement({
    selector: 'tetris-game',
    template: `
        <nav>
            <button type="button" data-target="start-page">Start</button>
            <button type="button" data-target="game-page">Game</button>
        </nav>
    `,
})
export class TetrisGame extends HTMLElement implements HTMLCustomElement {
    constructor() {
        super();
    }

    connectedCallback(): void {

    }
}

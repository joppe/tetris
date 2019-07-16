// tslint:disable-next-line no-import-side-effect
import '@tetris/view/page/game-page';
// tslint:disable-next-line no-import-side-effect
import '@tetris/view/page/start-page';

import { CustomELement } from '@apestaartje/custom-element/CustomElement';
import { ChildView } from '@apestaartje/custom-element/ChildView';

@CustomELement({
    selector: 'tetris-game',
    template: `
        <nav>
            <button type="button" data-target="start-page">Start</button>
            <button type="button" data-target="game-page">Game</button>
        </nav>
    `,
})
export class TetrisGame extends HTMLElement {
    @ChildView('button')
    public button: HTMLElement | null;

    public connectedCallback(): void {
        console.log(this.button);
    }
}

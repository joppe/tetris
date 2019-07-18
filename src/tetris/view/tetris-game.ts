// tslint:disable-next-line no-import-side-effect
import '@tetris/view/page/game-page';
// tslint:disable-next-line no-import-side-effect
import '@tetris/view/page/start-page';

import { ChildElements } from '@apestaartje/custom-element/decorator/child-element/ChildElements';
import { CustomELement } from '@apestaartje/custom-element/CustomElement';
import { HTMLCustomElement } from '@apestaartje/custom-element/HTMLCustomElement';

@CustomELement({
    selector: 'tetris-game',
    template: `
        <nav>
            <button type="button" data-target="start">Start</button>
            <button type="button" data-target="game">Game</button>
        </nav>
        <game-page data-page="game" display="true"></game-page>
        <start-page data-page="start" display="false"></start-page>
    `,
})
export class TetrisGame extends HTMLElement implements HTMLCustomElement {
    @ChildElements('button')
    public buttons: NodeList;

    @ChildElements('[data-page]')
    public pages: NodeList;

    public connectedCallback(): void {
        this.showPage = this.showPage.bind(this);

        this.buttons.forEach((button: HTMLElement): void => {
            // this.showPage(button.getAttribute('data-target'));
            button.addEventListener('click', this.showPage);
        });
    }

    private showPage(event: MouseEvent): void {
        const target: string | null = (<HTMLElement>event.target).getAttribute('data-target');

        this.pages.forEach((page: HTMLElement): void => {
            if (page.getAttribute('data-page') === target) {
                page.setAttribute('display', 'true');
            } else {
                page.setAttribute('display', 'false');
            }
        });
    }
}

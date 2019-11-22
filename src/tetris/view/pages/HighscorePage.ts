import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';

// tslint:disable-next-line no-import-side-effect
import '@tetris/view/component/NavigationLink';

import { Event } from '@tetris/finite-state-machine/global/Event';

@Component({
    selector: 'tetris-highscore-page',
    template: `
        <h1>Highscore</h1>
        <nav>
            <tetris-navigation-link event-name="${Event.Home}" title="Home"></tetris-navigation-link>
        </nav>
    `,
})
export class HighscorePage extends HTMLElement {
}

import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';

// tslint:disable-next-line no-import-side-effect
import '@tetris/view/component/NavigationLink';

import { Event } from '@tetris/finite-state-machine/Event';

@Component({
    selector: 'tetris-home',
    template: `
        <h1>TETЯIS</h1>

        <p>This is just an experiment :).</p>

        <nav>
            <tetris-navigation-link event-name="${Event.Game}" title="Start"></tetris-navigation-link>
            <tetris-navigation-link event-name="${Event.Help}" title="Help"></tetris-navigation-link>
            <tetris-navigation-link event-name="${Event.HighScore}" title="High Score"></tetris-navigation-link>
        </nav>
    `,
})
export class HomePage extends HTMLElement {
}

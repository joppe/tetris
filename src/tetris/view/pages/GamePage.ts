import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';

// tslint:disable-next-line no-import-side-effect
import '@tetris/view/component/NavigationLink';

import { Event } from '@tetris/finite-state-machine/Event';

@Component({
    selector: 'tetris-game',
    template: `
        <h1>Game</h1>
        <nav>
            <tetris-navigation-link event-name="${Event.Home}" title="Home"></tetris-navigation-link>
            <tetris-navigation-link event-name="${Event.HighScore}" title="High Score"></tetris-navigation-link>
        </nav>
    `,
})
export class GamePage extends HTMLElement {
}

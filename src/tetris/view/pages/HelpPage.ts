import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';

// tslint:disable-next-line no-import-side-effect
import '@tetris/view/component/NavigationLink';

import { Event } from '@tetris/finite-state-machine/Event';

@Component({
    selector: 'tetris-help',
    template: `
        <h1>HELP</h1>

        <p>Use <b>left</b> and <b>right</b> arrow keys to move tetromino horizontally. Use <b>S</b> to rotate clockwise and <b>A</b> to rotate counter clockwise.</p>

        <nav>
            <tetris-navigation-link event-name="${Event.Home}" title="Home"></tetris-navigation-link>
            <tetris-navigation-link event-name="${Event.HighScore}" title="High Score"></tetris-navigation-link>
        </nav>
    `,
})
export class HelpPage extends HTMLElement {
}

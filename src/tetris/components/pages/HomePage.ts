import { Component } from '@apestaartje/dom/custom-element/decorator/component/Component';

@Component({
    selector: 'tetris-home',
    template: `
        <h1>Tetris!</h1>
    `,
})
export class HomePage extends HTMLElement {
}

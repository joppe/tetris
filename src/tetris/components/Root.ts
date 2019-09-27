import { Component } from '@apestaartje/dom/custom-element/decorator/component/Component';

// tslint:disable-next-line no-import-side-effect
import '@tetris/components/pages/HomePage';

@Component({
    selector: 'tetris-root',
    template: `
        <tetris-home></tetris-home>
    `,
})
export class Root extends HTMLElement {
}

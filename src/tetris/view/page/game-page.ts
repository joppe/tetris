const tmpl: HTMLTemplateElement = document.createElement('template');

// tslint:disable no-inner-html
tmpl.innerHTML = `
    <h1>Game page</h1>
`;

export class GamePage extends HTMLElement {
    constructor() {
        super();

        const shadowRoot: ShadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
}

window.customElements.define('game-page', GamePage);

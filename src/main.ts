// tslint:disable-next-line no-import-side-effect
import '@tetris/view/Root';

const container: HTMLDivElement = document.createElement('div');

// tslint:disable-next-line no-inner-html
container.innerHTML = `
    <tetris-root name="test"></tetris-root>
`;

document.body.appendChild(container);

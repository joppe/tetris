import { Component } from '@apestaartje/dom/custom-element/decorator/component/Component';

@Component({
    selector: 'test-component',
    template: `
        <p>This is the test root</p>
    `,
    style: `
        p {
            color: rgb(255, 0, 0);
        }
    `,
})
class Test extends HTMLElement {}

describe('Component', (): void => {
    it('The template is used as the innerHTML', (): void => {
        window.document.body.appendChild(document.createElement('test-component'));

        const el: HTMLElement = <HTMLElement>window.document.querySelector('test-component');

        expect(el.shadowRoot!.querySelector('p')!.innerHTML).toBe('This is the test root');
    });

    it('The styles are applied to the child elements', (): void => {
        window.document.body.appendChild(document.createElement('test-component'));

        const el: HTMLElement = <HTMLElement>window.document.querySelector('test-component');
        const p: HTMLParagraphElement = <HTMLParagraphElement>el.shadowRoot!.querySelector('p');

        expect(window.getComputedStyle(<Element>p).color).toBe('rgb(255, 0, 0)');
    });
});

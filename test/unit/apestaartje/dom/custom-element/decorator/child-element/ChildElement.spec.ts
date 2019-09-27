import { ChildElement } from '@apestaartje/dom/custom-element/decorator/child-element/ChildElement';
import { Component } from '@apestaartje/dom/custom-element/decorator/component/Component';

@Component({
    selector: 'test-childelement',
    template: `
        <div>
            <h1>Testing</h1>
            <p><b>Lorem</b> ipsum</p>
        </div>
    `,
})
class Test extends HTMLElement {
    @ChildElement('h1')
    public h1: HTMLElement | null;

    @ChildElement('h2')
    public h2: HTMLElement | null;
}

describe('ChildElement', (): void => {
    it('The decorator will fetch the element from the shadow DOM', (): void => {
        window.document.body.appendChild(document.createElement('test-childelement'));

        const el: Test = <Test>window.document.querySelector('test-childelement');

        expect(el.h1!.innerText).toBe('Testing');
    });

    it('The value will be `null` if the element is not found', (): void => {
        window.document.body.appendChild(document.createElement('test-childelement'));

        const el: Test = <Test>window.document.querySelector('test-childelement');

        // tslint:disable-next-line no-null-keyword
        expect(el.h2).toBe(null);
    });
});

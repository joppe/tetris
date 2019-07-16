import { CustomElementFactory } from '@apestaartje/custom-element/CustomElementFactory';
import { CustomElementOptions } from '@apestaartje/custom-element/CustomElementOptions';
import { HTMLCustomElementConstructor } from '@apestaartje/custom-element/HTMLCustomElementConstructor';
import { isValidSelector } from '@apestaartje/custom-element/isValidSelector';
import { HTMLCustomElement } from './HTMLCustomElement';

/**
 * https://developers.google.com/web/fundamentals/web-components/customelements
 * https://developer.mozilla.org/en-US/docs/Web/Web_Components
 *
 */

// tslint:disable-next-line function-name no-any
export function CustomELement<T extends {new(...args: any[]): any}>(options: CustomElementOptions) {
    if (!isValidSelector(options.selector)) {
        throw new Error(`Invalid CustomElement selector "${options.selector}", always use a "-" in the name of the tag.`);
    }

    const template: HTMLTemplateElement = document.createElement('template');

    // tslint:disable no-inner-html
    template.innerHTML = options.template;

    // tslint:disable-next-line no-reserved-keywords
    return (constructor: T): T => {
        const customElement: T = class extends constructor {
            // tslint:disable-next-line no-any
            constructor(...args: any[]) {
                super(...args);

                const shadowRoot: ShadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.appendChild(template.content.cloneNode(true));
            }
        };

        window.customElements.define(options.selector, customElement);

        return customElement;
    };
}

import { Constructor } from '@apestaartje/common/Constructor';

import { applyChildElement } from './decorator/child-element/applyChildElement';
import { applyChildElements } from './decorator/child-element/applyChildElements';
import { applyInput } from './decorator/input/applyInput';
import { CustomElementOptions } from './CustomElementOptions';
import { HTMLCustomElement } from './HTMLCustomElement';
import { isValidSelector } from './isValidSelector';
import { WATCH_ATTRIBUTES_PROPERTY } from './decorator/input/InputMetadata';

 /**
  * This is a class decorator.
  * Use it to do Angular style creation of component definitions.
  */

// tslint:disable-next-line function-name no-any
export function CustomELement<T extends Constructor<HTMLCustomElement>>(options: CustomElementOptions): (target: T) => any {
    if (!isValidSelector(options.selector)) {
        throw new Error(`Invalid CustomElement selector "${options.selector}", always use a "-" in the name of the tag.`);
    }

    const template: HTMLTemplateElement = document.createElement('template');

    // tslint:disable no-inner-html
    template.innerHTML = `
        <style>${options.style === undefined ? '' : options.style}</style>
        ${options.template}
    `;

    // tslint:disable-next-line no-any
    return (target: T): any => {
        const customElement: T = class extends target {
            // tslint:disable-next-line no-any
            constructor(...args: any[]) {
                super(...args);

                const shadowRoot: ShadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.appendChild(template.content.cloneNode(true));

                applyChildElement(this);
                applyChildElements(this);
                applyInput(this);
            }

            // tslint:disable-next-line function-name
            public static get observedAttributes(): string[] {
                return <string[]>customElement[WATCH_ATTRIBUTES_PROPERTY];
            }
        };

        window.customElements.define(options.selector, customElement);

        return customElement;
    };
}

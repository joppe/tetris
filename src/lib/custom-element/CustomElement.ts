import 'reflect-metadata';
import { CustomElementOptions } from '@apestaartje/custom-element/CustomElementOptions';
import { CustomElementConstructor } from '@apestaartje/custom-element/CustomElementConstructor';
import { isValidSelector } from '@apestaartje/custom-element/isValidSelector';
import { CHILD_VIEW_KEY } from './ChildView';

/**
 * https://developers.google.com/web/fundamentals/web-components/customelements
 * https://developer.mozilla.org/en-US/docs/Web/Web_Components
 *
 * https://github.com/Cammisuli/typescript-custom-elements/blob/master/src/my-custom-element.ts
 * https://dzone.com/articles/how-to-avoid-a-distorted-android-camera-preview-wi
 */

 /**
  * This is a class decorator.
  * Use it to do Angular style creation of component definitions.
  */

// tslint:disable-next-line function-name no-any
export function CustomELement<T extends CustomElementConstructor>(options: CustomElementOptions): (target: T) => any {
    if (!isValidSelector(options.selector)) {
        throw new Error(`Invalid CustomElement selector "${options.selector}", always use a "-" in the name of the tag.`);
    }

    const template: HTMLTemplateElement = document.createElement('template');

    // tslint:disable no-inner-html
    template.innerHTML = options.template;

    // tslint:disable-next-line no-any
    return (target: T): any => {
        const customElement: T = class extends target {
            // tslint:disable-next-line no-any
            constructor(...args: any[]) {
                super(...args);

                const shadowRoot: ShadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.appendChild(template.content.cloneNode(true));

                const foo = Reflect.getMetadata(CHILD_VIEW_KEY, this);

                Object.keys(foo).forEach((prop: string): void => {
                    Object.defineProperty(
                        this,
                        prop,
                        {
                            get: (): HTMLElement | null => {
                                return (<ShadowRoot>this.shadowRoot).querySelector('button');
                            },
                        },
                    );
                });
                console.log('foo', foo);
            }
        };

        window.customElements.define(options.selector, customElement);

        return customElement;
    };
}

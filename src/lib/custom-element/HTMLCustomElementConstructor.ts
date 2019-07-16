import { HTMLCustomElement } from '@apestaartje/custom-element/HTMLCustomElement';

export interface HTMLCustomElementConstructor {
    // tslint:disable-next-line no-any
    new(...args: any[]): HTMLCustomElement;
}

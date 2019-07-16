export interface HTMLCustomElement extends HTMLElement {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    // tslint:disable-next-line no-any
    attributeChangedCallback?(attributeName: string, oldValue: any, newValue: any, namespace?: any): void;
}

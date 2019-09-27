export interface HTMLCustomElement extends HTMLElement {
    // tslint:disable-next-line no-any
    attributeChangedCallback?(attributeName: string, oldValue: any, newValue: string, namespace?: string): void;
    connectedCallback?(): void;
    disconnectedCallback?(): void;
}

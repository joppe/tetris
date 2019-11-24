import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { Input } from '@apestaartje/dom/dist/custom-element/decorator/input/Input';
import { InputType } from '@apestaartje/dom/dist/custom-element/decorator/input/InputType';

@Component({
    selector: 'tetris-page-container',
    template: `
        <slot></slot>
    `,
})
export class PageContainer extends HTMLElement {
    @Input({
        type: InputType.Bool,
        attribute: 'active',
        watch: true,
    })
    public isActive: boolean;

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'active') {
            this.updateVisibility();
        }
    }

    private updateVisibility(): void {
        if (this.isActive) {
            this.style.display = 'block';
        } else {
            this.style.display = 'none';
        }
    }
}

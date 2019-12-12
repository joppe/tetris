import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { Input } from '@apestaartje/dom/dist/custom-element/decorator/input/Input';
import { InputType } from '@apestaartje/dom/dist/custom-element/decorator/input/InputType';

const ACTIVE_CLASS: string = 'active';

@Component({
    selector: 'tetris-game-over',
    template: `
        <h3>GAME OVER</h3>
        <slot name="nav"></slot>
    `,
    style: `
        h3 {
            padding: 8px 10px;
            background-color: #E78866;
            color: #6F2F34;
            font-size: 24px;
            font-weight: bold;
            line-height: 1.2;
        }
    `,
    useShadowRoot: true,
})
export class GameOver extends HTMLElement {
    @Input({
        attribute: 'active',
        watch: true,
        type: InputType.Bool,
    })
    public active: boolean;

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'active') {
            this.toggle();
        }
    }

    private toggle(): void {
        if (this.active === true) {
            this.classList.add(ACTIVE_CLASS);
        } else {
            this.classList.remove(ACTIVE_CLASS);
        }
    }
}

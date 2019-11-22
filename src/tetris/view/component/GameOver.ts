import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { Input } from '@apestaartje/dom/dist/custom-element/decorator/input/Input';
import { InputType } from '@apestaartje/dom/dist/custom-element/decorator/input/InputType';

const ACTIVE_CLASS: string = 'active';

@Component({
    selector: 'tetris-game-over',
    template: `
        <h3>GAME OVER</h3>
    `,
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

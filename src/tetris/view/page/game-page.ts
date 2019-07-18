import { CustomELement } from '@apestaartje/custom-element/CustomElement';
import { HTMLCustomElement } from '@apestaartje/custom-element/HTMLCustomElement';
import { Input } from '@apestaartje/custom-element/decorator/input/Input';
import { InputType } from '@apestaartje/custom-element/decorator/input/InputType';

@CustomELement({
    selector: 'game-page',
    template: `
        <h1>Game page</h1>
    `,
})
export class GamePage extends HTMLElement implements HTMLCustomElement {
    @Input({
        type: InputType.Bool,
        watch: true,
    })
    public display: boolean;

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        switch (name) {
            case 'display':
                this.style.display = this.display ? 'block' : 'none';
                break;
            default:
                //
        }
    }
}

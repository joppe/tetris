import { ChildElement } from '@apestaartje/dom/dist/custom-element/decorator/child-element/ChildElement';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { EventEmitter} from '@apestaartje/dom/dist/custom-element/decorator/output/EventEmitter';
import { Input } from '@apestaartje/dom/dist/custom-element/decorator/input/Input';
import { Output } from '@apestaartje/dom/dist/custom-element/decorator/output/Output';

@Component({
   selector: 'tetris-navigation-link',
   template: `
        <button type="button"></button>
    `,
})
export class NavigationLink extends HTMLElement {
    @Input({
        attribute: 'event-name',
    })
    public eventName: string;

    @Input()
    public title: string;

    @Output('state-change')
    public stateChange: EventEmitter<string>;

    @ChildElement('button')
    public button: HTMLElement | null;

    public connectedCallback(): void {
        if (this.button === null) {
            return;
        }

        this.button.setAttribute('data-event', this.eventName);
        this.button.innerText = this.title;
        this.button.addEventListener('click', (): void => {
            this.stateChange.emit(this.eventName);
        });
    }
}

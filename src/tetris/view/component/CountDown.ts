import { ChildElements } from '@apestaartje/dom/dist/custom-element/decorator/child-element/ChildElements';
import { Component } from '@apestaartje/dom/dist/custom-element/decorator/component/Component';
import { EventEmitter, Output } from '@apestaartje/dom/dist/custom-element/decorator/output';
import { Input } from '@apestaartje/dom/dist/custom-element/decorator/input/Input';
import { InputType } from '@apestaartje/dom/dist/custom-element/decorator/input/InputType';

const ANIMATE_CLASS: string = 'animate';
const ACTIVE_CLASS: string = 'active';

@Component({
    selector: 'tetris-count-down',
    template: `
        <div class="c-countdown-counter">3</div>
        <div class="c-countdown-counter">2</div>
        <div class="c-countdown-counter">1</div>
    `,
})
export class CountDown extends HTMLElement {
    @ChildElements('.c-countdown-counter')
    public steps: HTMLElement[];

    @Input({
        attribute: 'active',
        watch: true,
        type: InputType.Bool,
    })
    public active: boolean;

    @Output('count-down-finished')
    public finished: EventEmitter<boolean>;

    private _interval: number;

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'active') {
            this.toggle();
        }
    }

    private toggle(): void {
        if (this.active === true) {
            this.classList.add(ACTIVE_CLASS);
            this.start();
        } else {
            this.classList.remove(ACTIVE_CLASS);
            this.stop();
        }
    }

    private stop(): void {
        window.clearTimeout(this._interval);
    }

    private start(): void {
        let currentStep: number = this.steps.length;

        this.reset();

        this._interval = window.setInterval(
            (): void => {
                if (currentStep > 0) {
                    this.animateStep(currentStep);
                }

                currentStep -= 1;

                if (currentStep < 0) {
                    this.finished.emit(true);
                    this.stop();
                }
            },
            1000,
        );
    }

    private animateStep(value: number): void {
        const el: HTMLElement | undefined = this.steps.find((step: HTMLElement): boolean => {
            return step.textContent === String(value);
        });

        if (el === undefined) {
            throw new Error(`Could not find counter element with value "${value}"`);
        }

        el.classList.add(ANIMATE_CLASS);
    }

    private reset(): void {
        this.steps.forEach((step: HTMLElement): void => {
            step.classList.remove(ANIMATE_CLASS);
        });
    }
}

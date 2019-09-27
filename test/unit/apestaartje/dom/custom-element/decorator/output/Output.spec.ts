import { Component } from '@apestaartje/dom/custom-element/decorator/component/Component';
import { EventEmitter } from '@apestaartje/dom/custom-element/decorator/output/EventEmitter';
import { Output } from '@apestaartje/dom/custom-element/decorator/output/Output';

@Component({
    selector: 'test-output',
    template: `
        <h1>Testing</h1>
    `,
})
class Test extends HTMLElement {
    @Output('counter')
    public counter: EventEmitter<number>;

    private _count: number = 0;

    public trigger(): void {
        this._count += 1;

        this.counter.emit(this._count);
    }
}

describe('Output', (): void => {
    it('fire a CustomEvent', (): void => {
        window.document.body.appendChild(document.createElement('test-output'));

        const el: Test = <Test>window.document.querySelector('test-output');
        let catchCount: number = 0;
        let lastValue: number | undefined;

        window.document.body.addEventListener('counter', (event: CustomEvent<number>): void => {
            catchCount += 1;
            lastValue = event.detail;
        });

        el.trigger();

        expect(catchCount).toBe(1);
        expect(lastValue).toBe(1);
    });
});

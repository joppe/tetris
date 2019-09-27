import { Bind } from '@apestaartje/dom/custom-element/decorator/bind/Bind';
import { Component } from '@apestaartje/dom/custom-element/decorator/component/Component';

@Component({
    selector: 'test-bind',
    template: `test`,
})
class Test extends HTMLElement {
    private readonly _foo: string = 'foo';

    @Bind()
    public foo(): string {
        return this._foo;
    }

    public bar(): string {
        return this._foo;
    }
}

describe('Bind', (): void => {
    it('binds the method to the instance', (): void => {
        const t: Test = new Test();
        const f: () => string = t.foo;
        const b: () => string = t.bar;

        expect(t.foo()).toBe('foo');
        expect(f()).toBe('foo');
        expect((): void => {
            b();
        }).toThrow();
    });
});

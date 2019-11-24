import { factory } from '@apestaartje/store/dist/factory';
import { Store } from '@apestaartje/store/dist/Store';

// tslint:disable no-import-side-effect
import '@tetris/view/Root';
// tslint:enable no-import-side-effect

import { container } from '@tetris/dependency-injection/container';
import { Data } from '@tetris/store/Data';
import { Engine } from '@tetris/game/Engine';
import { initial } from '@tetris/store/initial';
import { keyboard } from '@tetris/control/keyboard';

export class Tetris {
    public constructor() {
        container.register('store', (): Store<Data> => {
            return factory(initial);
        });
        container.register('engine', (store: Store<Data>): Engine => {
            return new Engine(store.get('size'), keyboard());
        });
    }

    public render(root: HTMLElement): void {
        root.appendChild(
            document.createElement('tetris-root'),
        );
    }
}

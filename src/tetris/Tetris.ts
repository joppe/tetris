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
import { Local } from '@tetris/storage/Local';
import { Storage } from '@tetris/storage/Storage';
import { HighScore } from '@tetris/game/high-score/HighScore';

export class Tetris {
    public constructor() {
        container.register('storage', (): Storage => {
            return new Local();
        });
        container.register('store', (): Store<Data> => {
            return factory(initial);
        });
        container.register('engine', (store: Store<Data>): Engine => {
            return new Engine(store.get('size'), keyboard());
        });
        container.register('high-score', (): HighScore => {
            return new HighScore(10);
        });
    }

    public render(root: HTMLElement): void {
        root.appendChild(
            document.createElement('tetris-root'),
        );
    }
}

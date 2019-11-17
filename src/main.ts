// tslint:disable-next-line no-import-side-effect
import '@tetris/view/Root';

import { container } from '@tetris/dependency-injection/container';
import { Data } from '@tetris/store/Data';
import { factory } from '@apestaartje/store/dist/factory';
import { initial } from '@tetris/store/initial';
import { Store } from '@apestaartje/store/dist/Store';
import { random } from '@tetris/tetromino/random/random';

container.register('store', (): Store<Data> => {
    return factory(initial);
});

const store: Store<Data> = container.resolve('store');

document.addEventListener('click', (): void => {
    store.set('preview', random());
});

document.body.appendChild(
    document.createElement('tetris-root'),
);

import * as geometry from '@apestaartje/geometry';

import { keyboard } from 'app/tetris/control/keyboard';
import { HTMLRenderer } from 'app/tetris/render/HTMLRenderer';
import { factory } from 'app/tetris/tetromino/factory';
import { Tetromino } from 'app/tetris/tetromino/Tetromino';

const tetrominoSize: geometry.size.Size = {
    height: 20,
    width: 20
};

const t: Tetromino = factory('J', {
    x: 100,
    y: 0
});

const renderer: HTMLRenderer = new HTMLRenderer(
    {
        tetrominoSize
    },
    document.querySelector('.js-tetris')
);

renderer.register(t);
renderer.render();

keyboard({
    left(): void {
        window.console.log('left');

        t.move({
            x: -tetrominoSize.width,
            y: 0
        });

        renderer.render();
    },
    right(): void {
        window.console.log('right');

        t.move({
            x: tetrominoSize.width,
            y: 0
        });

        renderer.render();
    },
    counterClockwise(): void {
        window.console.log('counterClockwise');

        t.rotate(-90);

        renderer.render();
    },
    clockwise(): void {
        window.console.log('clockwise');

        t.rotate(90);

        renderer.render();
    }
});

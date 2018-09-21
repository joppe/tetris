import { HTMLRenderer } from 'app/tetris/render/HTMLRenderer';
import { factory } from 'app/tetris/tetromino/factory';
import { Tetromino } from 'app/tetris/tetromino/Tetromino';

const PINK: string = '#ff44ff';
const GREEN: string = '#44ff44';
const ORANGE: string = '#ff8800';
const BLUE: string = '#44ffff';
const YELLOW: string = '#ffff44';

/**
 * I straight
 * O square
 * T
 * L
 * S
 */

const t: Tetromino = factory('J', {
    x: 100,
    y: 0
});

const renderer: HTMLRenderer = new HTMLRenderer(
    {
        tetrominoSize: {
            height: 20,
            width: 20
        }
    },
    document.querySelector('.js-tetris')
);

renderer.register(t);
renderer.render();

document.querySelector('.js-rotate--left').addEventListener('click', (): void => {
    t.rotate(-90);

    renderer.render();
});

document.querySelector('.js-rotate--right').addEventListener('click', (): void => {
    t.rotate(90);

    renderer.render();
});

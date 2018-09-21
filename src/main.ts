import { HTMLRenderer } from 'app/tetris/render/HTMLRenderer';
import { Tetromino } from 'app/tetris/tetromino/Tetromino';

const PINK: string = '#ff44ff';
const GREEN: string = '#44ff44';
const ORANGE: string = '#ff8800';
const BLUE: string = '#44ffff';
const YELLOW: string = '#ffff44';

/**
 * L straight
 * O square
 * T
 * L
 * S
 */

const t: Tetromino = new Tetromino(
    {
        x: 100,
        y: 0
    },
    {
        color: PINK,
        shape: [
            [false, false, false],
            [true, true, true],
            [false, true, false]
        ]
    }
);

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

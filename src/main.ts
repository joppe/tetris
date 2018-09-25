import { Tetris } from 'app/tetris/Tetris';

const game: Tetris = new Tetris({
    size: {
        width: 12,
        height: 18
    },
    unitSize: 20,
    wellElement: document.querySelector('.js-tetris--well'),
    scoreElement: document.querySelector('.js-tetris--score'),
    nextElement: document.querySelector('.js-tetris--next'),
    lineCountElement: document.querySelector('.js-tetris--line-count')
});

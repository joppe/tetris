import { Tetris } from 'app/tetris/Tetris';

const game: Tetris = new Tetris({
    size: {
        width: 20,
        height: 30
    },
    tetrominoSize: {
        width: 20,
        height: 20
    },
    wellElement: document.querySelector('.js-tetris--well'),
    scoreElement: document.querySelector('.js-tetris--score'),
    nextElement: document.querySelector('.js-tetris--next')
});

game.start();

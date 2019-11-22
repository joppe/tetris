import { Grid } from '@tetris/grid/Grid';
import { Cell } from '@tetris/grid/Cell';

describe('Grid', (): void => {
    let grid: Grid<number>;

    beforeEach((): void => {
        grid = new Grid<number>({ width: 5, height: 10 });
    })

    describe('width', (): void => {
        it('return the width of the grid', (): void => {
            expect(grid.width).toBe(5);
        });
    });

    describe('height', (): void => {
        it('return the height of the grid', (): void => {
            expect(grid.height).toBe(10);
        });
    });

    describe('setCell', (): void => {
        it('set the value of a cell', (): void => {
            grid.setCell({ x: 2, y: 3 }, 99);

            expect(grid.getCell({ x: 2, y: 3 }).value).toBe(99);

        });
    });

    describe('removeLine', (): void => {
        it('removes a line and adds an empty line', (): void => {
            grid.setCell({ x: 2, y: 3 }, 99);
            grid.removeLine(3);

            const allUndefined: boolean = Array.from(grid.getCells()).every((cell: Cell<number | undefined>): boolean => {
                return cell.value === undefined;
            });

            expect(allUndefined).toBe(true);
        });
    });
});

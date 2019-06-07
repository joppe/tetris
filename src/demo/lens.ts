import * as lens from '@apestaartje/lens';

type Point = {
    x: number;
    y: number;
};

const a: Point = { x: 0, y: 78 };
const l: lens.Lens<Point> = lens.lens(lens.prop('x'), lens.assoc('x'));
const b: Point = l.set(99, a);

console.log('new', b);
console.log('old', a);

console.log(lens.view(l, b));
console.log(lens.set(l, 6, b));

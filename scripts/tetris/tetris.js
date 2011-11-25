/*global jQuery*/

var tetris = (function ($) {
    var shapes;

    shapes = (function () {
        var raw_shapes = [];

        // define the raw shapes
        (function () {
            var raw_shape = '';

            // add the 'L" shape
            raw_shape += '10\n'
            raw_shape += '10\n'
            raw_shape += '11'

            raw_shapes.push(raw_shape);
        }());

        function createShape(raw_shape) {
            var shape,
                lines = raw_shape.split(/\n/),
                rows = [];

            $.each(lines, function (index) {
                rows.push(lines[index].split(''));
            });

            shape = {

            };

            console.log(rows);
        }

        createShape(raw_shapes[0]);
    }());
}(jQuery));
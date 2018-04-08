export default function (Square) {

const BORDER_SIZE = 20;

return function SquareFactory(rowCount, columnCount, transform) {

    const self = {};

    const squareSize = {
        width: (transform.width - BORDER_SIZE*2) / columnCount,
        height: (transform.height - BORDER_SIZE*2) / rowCount
    };

    self.spawnRandom = function () {
        return createSquareAt( randomLocation() );
    };

    self.spawnAt = function (location) {
        return createSquareAt( location );
    };

    const createSquareAt = function (location) {
        return Square(location, createSquareTransform(location))
    };

    const createSquareTransform = function (location) {
        return {
            x: location.column * squareSize.width + BORDER_SIZE,
            y: location.row * squareSize.height + BORDER_SIZE,
            width: squareSize.width,
            height: squareSize.height
        }
    };

    const randomLocation = function () {
        const x = Math.floor( Math.random() * columnCount );
        const y = Math.floor( Math.random() * rowCount );
        return { column: x, row: y };
    };

    return self;

}

}

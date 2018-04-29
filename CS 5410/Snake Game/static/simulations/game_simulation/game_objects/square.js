export default function (GameObject) {

return function Square(location, transform) {

    const self = GameObject( transform );

    self.intersects = function (other) {
        const otherLocation = other.location();
        return (
            location.row === otherLocation.row &&
            location.column === otherLocation.column
        );
    };

    self.location = () => location;

    return self;

}

}

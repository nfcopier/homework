module.exports = function (
) {

return function ContinuousCollisionDetector(object1, object2) {

    const self = {};

    let intersection = null;

    self.collisionOccurred = function () {
        const current = object1.getTransform();
        const previous = object1.previousTransform();
        const direction = {
            x: current.x - previous.x,
            y: current.y - previous.y
        };
        if ( direction.x >= 0 && direction.y >= 0 ) {
            checkTopLeft( direction, current, previous );
        }
        if ( direction.x < 0 && direction.y >= 0 ) {
            checkTopRight( direction, current, previous );
        }
        // if ( direction.x >= 0 && direction.y < 0 ) {
        //     checkBottomLeft( direction, current, previous );
        // }
        // if ( direction.x < 0 && direction.y < 0 ) {
        //     checkBottomRight( direction, current, previous );
        // }
        return intersection;
    };

    const checkTopLeft = function(direction, current, previous) {
        const other = object2.getTransform();
        const previousBottomRight = {
            x: previous.x + previous.width,
            y: previous.y + previous.height
        };
        const otherBottomRight = {
            x: other.x + other.width,
            y: other.y + other.height
        };
        const candidates = {
            left: direction.x / direction.y * (other.y - previousBottomRight.y) + previous.x,
            right: direction.x / direction.y * (other.y - previousBottomRight.y) + previousBottomRight.x,
            top: direction.y / direction.x * (other.x - previousBottomRight.x) + previous.y,
            bottom: direction.y / direction.x * (other.x - previousBottomRight.x) + previousBottomRight.y
        };
        if (
            candidates.left < otherBottomRight.x &&
            candidates.right > other.x &&
            Math.abs( current.y - previous.y ) > Math.abs( other.y - previousBottomRight.y )
        )
            intersection = { x: candidates.left, y: other.y - current.height };
        else if (
            candidates.top < otherBottomRight.y &&
            candidates.bottom > other.y &&
            Math.abs( current.x - previous.x ) > Math.abs( other.x - previousBottomRight.x)
        )
            intersection = { x: other.x - current.width, y: candidates.top };
    };

    const checkTopRight = function(direction, current, previous) {
        const other = object2.getTransform();
        const bottomRight = {
            x: previous.x + previous.width,
            y: previous.y + previous.height
        };
        const candidates = {
            left: direction.x / direction.y * (other.y - bottomRight.y) + previous.x,
            right: direction.x / direction.y * (other.y - bottomRight.y) + bottomRight.x,
            top: direction.y / direction.x * (other.x + other.width - previous.x) + previous.y,
            bottom: direction.y / direction.x * (other.x + other.width - previous.x) + bottomRight.y
        };
        if (
            candidates.left < other.x + other.width &&
            candidates.right > other.x &&
            Math.abs( current.y - previous.y ) > Math.abs( other.y - bottomRight.y )
        )
            intersection = { x: candidates.left, y: other.y - current.height };
        else if (
            candidates.top < other.y + other.height &&
            candidates.bottom > other.y &&
            Math.abs( current.x - previous.x ) > Math.abs( other.x + other.width - previous.x)
        )
            intersection = { x: other.x + other.width, y: candidates.top };
    };

    const checkBottomLeft = function(direction, current, previous) {
        const other = object2.getTransform();
        const bottomRight = {
            x: previous.x + previous.width,
            y: previous.y + previous.height
        };
        const candidates = {
            left: direction.x / direction.y * (other.y - bottomRight.y) + previous.x,
            right: direction.x / direction.y * (other.y - bottomRight.y) + bottomRight.x,
            top: direction.y / direction.x * (other.x - bottomRight.x) + previous.y,
            bottom: direction.y / direction.x * (other.x - bottomRight.x) + bottomRight.y
        };
        if (
            candidates.left < other.x + other.width &&
            candidates.right > other.x &&
            current.y < other.y + other.height &&
            current.y + current.height > other.y
        )
            intersection = { x: candidates.left, y: other.y - current.height };
        else if (
            candidates.top > other.y + other.height &&
            candidates.bottom < other.y &&
            current.x < other.x + other.width &&
            current.x + current.width > other.x
        )
            intersection = { x: other.x - current.width, y: candidates.top };
    };

    const checkBottomRight = function(direction, current, previous) {
        const other = object2.getTransform();
        const bottomRight = {
            x: previous.x + previous.width,
            y: previous.y + previous.height
        };
        const candidates = {
            left: direction.x / direction.y * (other.y - bottomRight.y) + previous.x,
            right: direction.x / direction.y * (other.y - bottomRight.y) + bottomRight.x,
            top: direction.y / direction.x * (other.x - bottomRight.x) + previous.y,
            bottom: direction.y / direction.x * (other.x - bottomRight.x) + bottomRight.y
        };
        if (
            candidates.left < other.x + other.width &&
            candidates.right > other.x &&
            current.y < other.y + other.height &&
            current.y + current.height > other.y
        )
            intersection = { x: candidates.left, y: other.y - current.height };
        else if (
            candidates.top > other.y + other.height &&
            candidates.bottom < other.y &&
            current.x < other.x + other.width &&
            current.x + current.width > other.x
        )
            intersection = { x: other.x - current.width, y: candidates.top };
    };

    return self;

}

};

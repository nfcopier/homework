module.exports = function ContinuousCollisionDetector(object1, object2) {

    const self = {};

    let intersection = null;

    self.collisionOccurred = () => {
        const current = object1.getTransform();
        const previous = object1.previousTransform();
        const direction = {
            x: current.x - previous.x,
            y: current.y - previous.y
        };
        if (direction.x >= 0 && direction.y >= 0) {
            checkTopLeft(direction, current, previous);
        }
        if (direction.x < 0 && direction.y >= 0) {
            checkTopRight(direction, current, previous);
        }
        if (direction.x >= 0 && direction.y < 0) {
            checkBottomLeft(direction, current, previous);
        }
        if (direction.x < 0 && direction.y < 0) {
            checkBottomRight(direction, current, previous);
        }
        return intersection;
    };

    const checkTopLeft = (direction, current, previous) => {
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
            left  : direction.x / direction.y * (other.y - previousBottomRight.y) + previous.x,
            right : direction.x / direction.y * (other.y - previousBottomRight.y) + previousBottomRight.x,
            top   : direction.y / direction.x * (other.x - previousBottomRight.x) + previous.y,
            bottom: direction.y / direction.x * (other.x - previousBottomRight.x) + previousBottomRight.y
        };
        if (
            candidates.left < otherBottomRight.x &&
            candidates.right > other.x &&
            Math.abs(current.y - previous.y) > Math.abs(other.y - previousBottomRight.y)
        )
            intersection = {
                x: candidates.left,
                y: other.y - current.height
            };
        else if (
            candidates.top < otherBottomRight.y &&
            candidates.bottom > other.y &&
            Math.abs(current.x - previous.x) > Math.abs(other.x - previousBottomRight.x)
        )
            intersection = {x: other.x - current.width, y: candidates.top};
    };

    const checkTopRight = (direction, current, previous) => {
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
            left  : direction.x / direction.y * (other.y - previousBottomRight.y) + previous.x,
            right : direction.x / direction.y * (other.y - previousBottomRight.y) + previousBottomRight.x,
            top   : direction.y / direction.x * (otherBottomRight.x - previous.x) + previous.y,
            bottom: direction.y / direction.x * (otherBottomRight.x - previous.x) + previousBottomRight.y
        };
        if (
            candidates.left < otherBottomRight.x &&
            candidates.right > other.x &&
            Math.abs(current.y - previous.y) > Math.abs(other.y - previousBottomRight.y)
        )
            intersection = {
                x: candidates.left,
                y: other.y - current.height
            };
        else if (
            candidates.top < otherBottomRight.y &&
            candidates.bottom > other.y &&
            Math.abs(current.x - previous.x) > Math.abs(otherBottomRight.x - previous.x)
        )
            intersection = {x: otherBottomRight.x, y: candidates.top};
    };

    const checkBottomLeft = (direction, current, previous) => {
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
            left  : direction.x / direction.y * (otherBottomRight.y - previous.y) + previous.x,
            right : direction.x / direction.y * (otherBottomRight.y - previous.y) + previousBottomRight.x,
            top   : direction.y / direction.x * (other.x - previousBottomRight.x) + previous.y,
            bottom: direction.y / direction.x * (other.x - previousBottomRight.x) + previousBottomRight.y
        };
        if (
            candidates.left < otherBottomRight.x &&
            candidates.right > other.x &&
            Math.abs(current.y - previous.y) > Math.abs(otherBottomRight.y - previous.y)
        )
            intersection = {x: candidates.left, y: otherBottomRight.y};
        else if (
            candidates.top < otherBottomRight.y &&
            candidates.bottom > other.y &&
            Math.abs(current.x - previous.x) > Math.abs(other.x - previousBottomRight.x)
        )
            intersection = {x: other.x - current.width, y: candidates.top};
    };

    const checkBottomRight = (direction, current, previous) => {
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
            left  : direction.x / direction.y * (otherBottomRight.y - previous.y) + previous.x,
            right : direction.x / direction.y * (otherBottomRight.y - previous.y) + previousBottomRight.x,
            top   : direction.y / direction.x * (otherBottomRight.x - previous.x) + previous.y,
            bottom: direction.y / direction.x * (otherBottomRight.x - previous.x) + previousBottomRight.y
        };
        if (
            candidates.left < otherBottomRight.x &&
            candidates.right > other.x &&
            Math.abs(current.y - previous.y) > Math.abs(otherBottomRight.y - previous.y)
        )
            intersection = {x: candidates.left, y: otherBottomRight.y};
        else if (
            candidates.top < otherBottomRight.y &&
            candidates.bottom > other.y &&
            Math.abs(current.x - previous.x) > Math.abs(otherBottomRight.x - previous.x)
        )
            intersection = {x: otherBottomRight.x, y: candidates.top};
    };

    return self;

};

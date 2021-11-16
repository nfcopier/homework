export default function() {

    return function CollisionDetector(transform1, transform2) {

        const self = {};

        self.collisionOccurred = function() {
            const bounds1 = getBoundsFrom(transform1);
            const bounds2 = getBoundsFrom(transform2);
            return (
                bounds1.left < bounds2.right &&
                bounds1.right > bounds2.left &&
                bounds1.top < bounds2.bottom &&
                bounds1.bottom > bounds2.top
            );
        };

        const getBoundsFrom = function(transform) {
            return {
                left  : transform.x,
                right : transform.x + transform.width,
                top   : transform.y,
                bottom: transform.y + transform.height
            };
        };

        return self;

    };

}

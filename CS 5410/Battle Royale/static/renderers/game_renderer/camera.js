export default function() {

    const X_BUFFER = 128;
    const Y_BUFFER = 96;
    const STOP_BUFFER = 5;
    const MAX_SPEED = 0.5;
    const ACCELERATION = 0.01;

    return function Camera(gameTransform) {

        const self = {};

        let lastPlayerLocation;
        let thisLocation;
        let velocity = {x: 0, y: 0};

        self.update = function(newPlayerLocation, elapsedTime) {
            if (!thisLocation)
                return initializeFrom(newPlayerLocation);
            // updateVelocityXFrom( newPlayerLocation.x, elapsedTime );
            // updateVelocityYFrom( newPlayerLocation.y, elapsedTime );
            // updateLocation( elapsedTime );
            // lastPlayerLocation = newPlayerLocation;
            thisLocation = newPlayerLocation;
        };

        const initializeFrom = function(location) {
            thisLocation = location;
        };

        const updateVelocityXFrom = function(newX, elapsedTime) {
            if (!shouldMoveX(newX)) return;
            if (shouldStopX(newX)) return velocity.x = 0;
            if (newX > X_BUFFER + thisLocation.x && velocity.x < MAX_SPEED) {
                velocity.x += ACCELERATION;
                if (velocity.x > MAX_SPEED) velocity.x = MAX_SPEED;
            }
            if (newX < -X_BUFFER + thisLocation.x && velocity.x > -MAX_SPEED) {
                velocity.x -= ACCELERATION;
                if (velocity.x < -MAX_SPEED) velocity.x = -MAX_SPEED;
            }
            if (newX < X_BUFFER + thisLocation.x && newX > thisLocation.x) {
                velocity.x -= ACCELERATION;
                const playerSpeed = (newX - lastPlayerLocation.x) / elapsedTime;
                if (velocity.x > playerSpeed) velocity.x = playerSpeed;
            }
            if (newX > -X_BUFFER + thisLocation.x && newX < thisLocation.x) {
                velocity.x += ACCELERATION;
                const playerSpeed = (newX - lastPlayerLocation.x) / elapsedTime;
                if (velocity.x < playerSpeed) velocity.x = playerSpeed;
            }
        };

        const updateVelocityYFrom = function(newY, elapsedTime) {
            if (!shouldMoveY(newY)) return;
            if (shouldStopY(newY)) return velocity.y = 0;
            if (newY > Y_BUFFER + thisLocation.y && velocity.x < MAX_SPEED) {
                velocity.y += ACCELERATION;
                if (velocity.y > MAX_SPEED) velocity.y = MAX_SPEED;
            }
            if (newY < -Y_BUFFER + thisLocation.y && velocity.y > -MAX_SPEED) {
                velocity.y -= ACCELERATION;
                if (velocity.y < -MAX_SPEED) velocity.y = -MAX_SPEED;
            }
            if (newY < Y_BUFFER + thisLocation.y && newY > thisLocation.y) {
                velocity.y -= ACCELERATION;
                const playerSpeed = (newY - lastPlayerLocation.y) / elapsedTime;
                if (velocity.y > playerSpeed) velocity.y = playerSpeed;
            }
            if (newY > -Y_BUFFER + thisLocation.y && newY < thisLocation.y) {
                velocity.y += ACCELERATION;
                const playerSpeed = (newY - lastPlayerLocation.y) / elapsedTime;
                if (velocity.y < playerSpeed) velocity.y = playerSpeed;
            }
        };

        const shouldMoveX = function(newX) {
            return velocity.x || Math.abs(newX - thisLocation.x) > X_BUFFER;
        };

        const shouldStopX = function(newX) {
            return (
                newX === lastPlayerLocation.x &&
                Math.abs(newX - thisLocation.x) < STOP_BUFFER
            );
        };

        const shouldMoveY = function(newY) {
            return velocity.y || Math.abs(newY - thisLocation.y) > Y_BUFFER;
        };

        const shouldStopY = function(newY) {
            return (
                newY === lastPlayerLocation.y &&
                Math.abs(newY - thisLocation.y) < STOP_BUFFER
            );
        };

        const updateLocation = function(elapsedTime) {
            thisLocation.x += velocity.x * elapsedTime;
            thisLocation.y += velocity.y * elapsedTime;
        };

        self.location = function() {
            if (!thisLocation) return null;
            return {
                x: thisLocation.x - gameTransform.width / 2,
                y: thisLocation.y - gameTransform.height / 2
            };
        };

        return self;

    };

}

export default function (Directions) {

const SPEED = 100;

return function (squareFactory, headInit) {

    const self = {};

    let direction = Directions.RIGHT;
    let timeSinceLastMovement = 0;

    let growCount = 0;

    const segments = [headInit];

    self.update = function(timeElapsed) {
        timeSinceLastMovement += timeElapsed;
        if (timeSinceLastMovement < SPEED) return;
        timeSinceLastMovement = 0;
        appendNewHead();
        if (growCount > 0)
            growCount -= 1;
        else
            segments.pop();
    };

    const appendNewHead = function() {
        const newLocation = newHeadLocation();
        const newHead = squareFactory.spawnAt( newLocation );
        segments.unshift( newHead );
    };

    const newHeadLocation = function() {
        const head = segments[0];
        switch (direction) {
            case Directions.TOP:
                return { row: head.location().row-1, column: head.location().column };
            case Directions.BOTTOM:
                return { row: head.location().row+1, column: head.location().column };
            case Directions.LEFT:
                return { row: head.location().row, column: head.location().column-1 };
            case Directions.RIGHT:
                return { row: head.location().row, column: head.location().column+1 };
        }
    };

    self.intersects = function(others) {
      for (let other of others)
          if (other.intersects( segments[0] ))
              return true;
      return false;
    };

    self.exceeds = function(rowCount, columnCount) {
        const headLocation = segments[0].location();
        return (
            headLocation.row < 0 ||
            headLocation.column < 0 ||
            headLocation.row >= rowCount ||
            headLocation.column >= columnCount
        );
    };

    self.grow = function() {
        growCount += 3;
    };

    self.turn = function(newDirection) {
        switch (newDirection) {
            case Directions.TOP:
                return turnUp();
            case Directions.BOTTOM:
                return turnDown();
            case Directions.LEFT:
                return turnLeft();
            case Directions.RIGHT:
                return turnRight();
        }
    };

    const turnUp = function() {
        if (direction === Directions.BOTTOM) return;
        direction = Directions.TOP;
    };

    const turnDown = function() {
        if (direction === Directions.TOP) return;
        direction = Directions.BOTTOM;
    };

    const turnLeft = function() {
        if (direction === Directions.RIGHT) return;
        direction = Directions.LEFT;
    };

    const turnRight = function() {
        if (direction === Directions.LEFT) return;
        direction = Directions.RIGHT;
    };

    self.segments = () => segments;

    return self;

}

}

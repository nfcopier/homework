export default function (
    Row,
    GameObject
) {

const GROUP_HEIGHT = 75;
const ROW_GAP = 5;

return function RowGroup({pointValue, color}, yPosition, gameTransform) {

    const transform = {
        x: gameTransform.x,
        y: yPosition,
        theta: 0,
        width: gameTransform.width,
        height: GROUP_HEIGHT
    };

    const topRow = Row(0, transform.width);
    const bottomRow = Row( topRow.getTransform().height + ROW_GAP, transform.width );

    const self = GameObject( transform );

    const initialize = function () {
        self.addChild( topRow );
        self.addChild( bottomRow );
    };

    self.getColor = function () { return color; };

    self.getPointValue = function () { return pointValue; };

    self.getTopBrickCount = function () {
        const topBricks = topRow.getChildren();
        return topBricks.length;
    };

    initialize();

    return self;

}

}

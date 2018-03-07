export default function (
    Row
) {

const GROUP_HEIGHT = 75;
const ROW_GAP = 5;
const ROW_COUNT = 2;

return function RowGroup({pointValue, color}, yPosition, gameTransform) {

    const self = {};

    self.transform = {
        x: gameTransform.x,
        y: yPosition,
        theta: 0,
        width: gameTransform.width,
        height: GROUP_HEIGHT
    };

    const rows = createRows();

    function createRows() {
        let rowY = 0;
        const results = [];
        for (let i = 0; i < ROW_COUNT; i++) {
            const row = Row(rowY, self.transform.width);
            results.push( row );
            rowY += row.transform.height + ROW_GAP;
        }
        return results;
    }

    self.getRows = function () { return rows; };

    self.getColor = function () { return color; };

    self.getPointValue = function () { return pointValue; };

    self.getTopBrickCount = function () {
        const topBricks = rows[0].getBricks();
        return topBricks.length;
    };

    self.hasBricks = function () {
        for (let row of rows) {
            if (row.hasBricks()) return true;
        }
        return false;
    };

    return self;

}

}

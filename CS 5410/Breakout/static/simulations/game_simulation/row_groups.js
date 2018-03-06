export default function (
    Row
) {

const GROUP_HEIGHT = 75;
const GROUP_COUNT = 4;
const ROW_GAP = 5;
const ROW_COUNT = 2;

return function RowGroups(gameTransform) {

    const self = {};

    const transformTemplate = {
        x: gameTransform.x,
        y: gameTransform.y + 100,
        theta: 0,
        width: gameTransform.width,
        height: GROUP_HEIGHT
    };

    const groups = createRowGroups();

    function createRowGroups() {
        const results = [];
        for (let i = 0; i < GROUP_COUNT; i++) {
            results.push( createGroup() );
        }
        return results;
    }

    function createGroup() {
        const transform = Object.assign( {}, transformTemplate );
        transformTemplate.y += GROUP_HEIGHT;
        return {
            transform: transform,
            rows: createRows()
        }
    }

    function createRows() {
        let rowY = 0;
        const results = [];
        for (let i = 0; i < ROW_COUNT; i++) {
            const row = Row(rowY, transformTemplate.width);
            results.push( row );
            rowY += row.transform.height + ROW_GAP;
        }
        return results;
    }

    self.getGroups = function () { return groups; };

    return self;

}

}

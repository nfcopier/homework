export default function (Walls) {

    function RecursiveDivisionAlgorithm(width, height) {
        this._width = width;
        this._height = height;
    }

    RecursiveDivisionAlgorithm.prototype.generateMaze = function () {
        const maze = _generateMaze(this._width, this._height);
        const topRow = _getTopRowFrom(maze);
        const bottomRow = _getBottomRowFrom(maze);
        const leftColumn = _getLeftColumnFrom(maze);
        const rightColumn = _getRightColumnFrom(maze);
        for (let i = 0; i < this._width; i++) {
            topRow[i].walls |= Walls.TOP;
            bottomRow[i].walls |= Walls.BOTTOM;
        }
        for (let j = 0; j < this._height; j++) {
            leftColumn[j].walls |= Walls.LEFT;
            rightColumn[j].walls |= Walls.RIGHT;
        }
        return maze;
    };

    function _generateMaze(width, height) {
        if (width <= 1 && height <= 1) return [[{walls: 0}]];
        const isVertical = _chooseVorH(width, height);
        if (isVertical) {
            return _divideLeftRight(width, height);
        } else {
            return _divideTopBottom(width, height);
        }
    }

    function _chooseVorH(width, height) {
        if (width <= 1) return false;
        if (height <= 1) return true;
        if (width > height) {
            return !_proportionalChoice(width, height);
        } else {
            return _proportionalChoice(height, width);
        }
    }

    function _proportionalChoice(greater, lesser) {
        const chance = Math.floor(greater/lesser);
        const result = Math.floor(Math.random()*chance) + 1;
        return chance === result;
    }

    function _divideLeftRight(width, height) {
        const hole = Math.floor(Math.random() * height);
        const left = _generateLeftMaze(width, height, hole);
        const right = _generateRightMaze(width, height, hole);
        return _mergeLeftRight(height, left, right);
    }

    function _generateLeftMaze(width, height, hole) {
        const childWidth = Math.floor(width/2);
        const maze = _generateMaze(childWidth, height);
        const cells = _getRightColumnFrom(maze);
        for (let i = 0; i < height; i++) {
            if (i !== hole)
                cells[i].walls |= Walls.RIGHT;
        }
        return maze;
    }

    function _getRightColumnFrom(maze) {
        const width = maze[0].length;
        return maze.map( row => row[width-1] );
    }

    function _generateRightMaze(width, height, hole) {
        const childWidth = Math.ceil(width/2);
        const maze = _generateMaze(childWidth, height);
        const cells = _getLeftColumnFrom(maze);
        for (let i = 0; i < height; i++) {
            if (i !== hole)
                cells[i].walls |= Walls.LEFT;
        }
        return maze;
    }

    function _getLeftColumnFrom(maze) {
        return maze.map( row => row[0] );
    }

    function _mergeLeftRight(height, left, right) {
        const merged = [];
        for (let i = 0; i < height; i++) {
            merged.push([].concat(left[i], right[i]));
        }
        return merged;
    }

    function _divideTopBottom(width, height) {
        const hole = Math.floor(Math.random() * width);
        const top = _generateTopMaze(width, height, hole);
        const bottom = _generateBottomMaze(width, height, hole);
        return _mergeTopBottom(top, bottom);
    }

    function _generateTopMaze(width, height, hole) {
        const childHeight = Math.floor(height/2);
        const maze = _generateMaze(width, childHeight);
        const cells = _getBottomRowFrom(maze);
        for (let i = 0; i < width; i++) {
            if (i !== hole)
                cells[i].walls |= Walls.BOTTOM;
        }
        return maze;
    }

    function _getBottomRowFrom(maze) {
        const height = maze.length;
        return maze[height-1];
    }

    function _generateBottomMaze(width, height, hole) {
        const childHeight = Math.ceil(height/2);
        const maze = _generateMaze(width, childHeight);
        const cells = _getTopRowFrom(maze);
        for (let i = 0; i < width; i++) {
            if (i !== hole)
                cells[i].walls |= Walls.TOP;
        }
        return maze;
    }

    function _getTopRowFrom(maze) {
        return maze[0];
    }

    function _mergeTopBottom(top, bottom) {
        return [].concat(top, bottom);
    }

    return RecursiveDivisionAlgorithm;

}

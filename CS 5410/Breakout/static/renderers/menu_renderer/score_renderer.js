export default function (Renderer) {

return function (scores) {

    const self = Renderer( scores.transform );

    let currentY = 350;

    const specTemplate = {
        font: "36px serif",
        color: "blue",
        alignment: "center",
        border: { color: "magenta", thickness: 3 }
    };

    self.render = function () {
        const scoreList = scores.list;
        for (let index = 0; index < scoreList.length; index++) {
            let score = scoreList[index];
            drawScore( index+1, score );
        }
    };

    const drawScore = function (place, score) {
        const spec = Object.assign( {}, specTemplate );
        const placeString = getStringFrom( place );
        spec.text = `${placeString} - ${score}`;
        spec.location = { x: getX(), y: getY() };
        self.graphics.drawText( spec )
    };

    const getX = function() {
        return scores.transform.x + scores.transform.width / 2;
    };

    const getY = function () {
        const current = currentY;
        currentY += 50;
        return current
    };

    const getStringFrom = function (place) {
        switch (place) {
            case 1: return "1st";
            case 2: return "2nd";
            case 3: return "3rd";
            case 4: return "4th";
            case 5: return "5th";
        }
    };

    return self;

}

}
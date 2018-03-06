export default function (Renderer) {

const SCORE_HEIGHT = 50;

return function (score) {

    const transform = {
        x: 25,
        y: score.transform.y + score.transform.height - SCORE_HEIGHT,
        theta: 0,
        width: score.transform.width / 2,
        height: SCORE_HEIGHT
    };

    const spec = {
        font: "36px serif",
        color: "blue",
        alignment: "left",
        location: { x: 0, y: transform.height / 2 },
        border: { color: "magenta", thickness: 1.5 }
    };

    const self = Renderer( transform );

    self.render = function () {
        spec.text = `Score: ${score.value}`;
        self.graphics.drawText( spec );
    };

    return self;

}

}

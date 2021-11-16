export default function(Renderer) {

    const SCORE_HEIGHT = 50;

    return function(score, gameTransform) {

        const transform = {
            x     : 15,
            y     : 0,
            theta : 0,
            width : gameTransform.width / 4,
            height: SCORE_HEIGHT
        };

        const labelSpec = {
            text     : "Score:",
            font     : "36px serif",
            color    : "blue",
            alignment: "left",
            location : {x: 0, y: transform.height / 2},
            border   : {color: "magenta", thickness: 1.5}
        };

        const valueSpec = {
            text     : "" + score,
            font     : "36px serif",
            color    : "blue",
            alignment: "right",
            location : {x: transform.width, y: transform.height / 2},
            border   : {color: "magenta", thickness: 1.5}
        };

        const self = Renderer(transform);

        self.render = function() {
            self.graphics.drawText(labelSpec);
            self.graphics.drawText(valueSpec);
        };

        return self;

    };

}

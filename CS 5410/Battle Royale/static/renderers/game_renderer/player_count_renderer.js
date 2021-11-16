export default function(
    Renderer
) {

    const COUNT_HEIGHT = 50;

    return function PlayerCountRenderer(playerCount, gameTransform) {

        const width = gameTransform.width / 4;

        const transform = {
            x     : gameTransform.width - width - 15,
            y     : 0,
            theta : 0,
            width : width,
            height: COUNT_HEIGHT
        };

        const self = Renderer(transform);

        const labelSpec = {
            text     : "Players Left:",
            font     : "36px serif",
            color    : "blue",
            alignment: "left",
            location : {x: 0, y: transform.height / 2},
            border   : {color: "magenta", thickness: 1.5}
        };

        const valueSpec = {
            text     : "" + playerCount,
            font     : "36px serif",
            color    : "blue",
            alignment: "right",
            location : {x: transform.width, y: transform.height / 2},
            border   : {color: "magenta", thickness: 1.5}
        };

        self.render = function() {
            self.graphics.drawText(labelSpec);
            self.graphics.drawText(valueSpec);
        };

        return self;

    };

}

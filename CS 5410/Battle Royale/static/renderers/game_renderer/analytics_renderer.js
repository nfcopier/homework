export default function (
    Renderer
) {

const ANALYTICS_HEIGHT = 50;

return function AnalyticsRenderer(analytics, gameTransform) {

    const transform = {
        x: gameTransform.x + 25,
        y: gameTransform.y + gameTransform.height - ANALYTICS_HEIGHT,
        theta: 0,
        width: gameTransform.width - 50,
        height: ANALYTICS_HEIGHT
    };

    const fpsLabelSpec = {
        text: "FPS: ",
        font: "36px serif",
        color: "blue",
        alignment: "left",
        location: { x: 0, y: transform.height / 2 },
        border: { color: "magenta", thickness: 1.5 }
    };

    const fpsValueSpec = {
        text: "" + analytics.fps,
        font: "36px serif",
        color: "blue",
        alignment: "left",
        location: { x: 100, y: transform.height / 2 },
        border: { color: "magenta", thickness: 1.5 }
    };

    const gameMinutes = Math.floor( analytics.gameTime / 60000 );
    const gameSeconds = ("00" + Math.floor( analytics.gameTime / 1000 ) % 60).slice(-2);
    const gameMilli = ("000" + analytics.gameTime % 1000).slice(-3);
    const gameTimeSpec = {
        text: `${gameMinutes}:${gameSeconds}:${gameMilli}`,
        font: "36px serif",
        color: "blue",
        alignment: "right",
        location: { x: transform.width, y: transform.height / 2 },
        border: { color: "magenta", thickness: 1.5 }
    };

    const self = Renderer( transform );

    self.render = function () {
        self.graphics.drawText( fpsLabelSpec );
        self.graphics.drawText( fpsValueSpec );
        self.graphics.drawText( gameTimeSpec );
    };

    return self;

}

}

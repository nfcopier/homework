export default function (
    Renderer,
    PaddleRenderer
) {

const BAR_WIDTH = 200;
const BAR_HEIGHT = 50;
const PADDLE_WIDTH = 30;
const PADDLE_HEIGHT = 15;
const PADDLE_GAP = 10;

return function (paddles) {

    const transform = {
        x: paddles.transform.x + paddles.transform.width - 25 - BAR_WIDTH,
        y: paddles.transform.y + paddles.transform.height - BAR_HEIGHT,
        theta: 0,
        width: BAR_WIDTH,
        height: BAR_HEIGHT
    };

    const self = Renderer( transform );

    let paddleX = transform.width - PADDLE_WIDTH;

    const paddleTransform = {
        y: (BAR_HEIGHT - PADDLE_HEIGHT) / 2,
        theta: 0,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT
    };

    self.render = function () {
        for (let i = 0; i < paddles.count; i++) {
            self.children.push( createPaddleRenderer() );
        }
    };

    const createPaddleRenderer = function () {
        const transform = Object.assign( {}, paddleTransform );
        transform.x = paddleX;
        paddleX -= PADDLE_WIDTH + PADDLE_GAP;
        return PaddleRenderer( {transform: transform} );
    };

    return self;

}

}

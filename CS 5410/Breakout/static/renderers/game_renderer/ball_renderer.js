export default function (Renderer) {

return function (ball) {

    const self = Renderer( ball.transform );

    return self;

}

}

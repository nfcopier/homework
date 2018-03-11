export default function (Renderer) {

return function (paddle) {

    const self = Renderer( paddle.getTransform() );

    return self;

}

}

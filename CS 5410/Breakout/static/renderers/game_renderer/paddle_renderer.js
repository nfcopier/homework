export default function (Renderer) {

return function (paddle) {

    const self = Renderer( paddle.transform );

    return self;

}

}

export default function (
    Renderer
) {

return function (color, brick) {

    const self = Renderer( brick.getTransform() );

    return self;

}

}

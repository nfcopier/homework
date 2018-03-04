export default function (CanvasRenderer) {

return function MenuRenderer(simulation) {

    const self = CanvasRenderer();

    self.render = function () {};

    return self;

}

}

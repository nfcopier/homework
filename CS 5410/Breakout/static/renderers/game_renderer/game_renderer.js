export default function (Renderer) {

return function GameRenderer(simulation) {

    self = Renderer( simulation.transform );

    const superRender = self.render;

    self.render = function () {
        superRender();
        self.graphics.clearCursor();
    };

    return self;

}

}

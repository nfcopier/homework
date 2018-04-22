export default function (
    AvatarRenderer
) {

return function PlayerRenderer(playerState) {

    self = AvatarRenderer( playerState, "green" );

    const superRender = self.render;
    self.render = function () {
        superRender();
        renderFov();
    };

    const renderFov = function () {
        self.graphics.drawPath({ points: playerState.fov, color: "white" });
    };

    return self;

}

}

export default function(
    MissileRenderer,
    AvatarRenderer
) {

    return function PlayerRenderer(playerState) {

        self = AvatarRenderer(playerState, "green");

        const missileTransform = {y: 10, theta: 0, width: 1, height: 10};

        const missilePlacements = [1, 18, 3, 16];

        const superRender = self.render;
        self.render = function() {
            for (let i = 0; i < playerState.missileAmmo; i++)
                renderMissile(missilePlacements[i]);
            superRender();
            renderFov();
        };

        const renderMissile = function(xValue) {
            missileTransform.x = xValue;
            self.renderChild(MissileRenderer(missileTransform));
        };

        const renderFov = function() {
            self.graphics.drawPath({
                points   : playerState.fov,
                color    : "white",
                alpha    : 1,
                thickness: 1
            });
        };

        return self;

    };

}

export default function(
    CountdownRenderer,
    AvatarRenderer,
    PlayerRenderer,
    BuildingRenderer,
    PowerUpRenderer,
    MissileRenderer,
    BulletRenderer,
    ScoreRenderer,
    HealthRenderer,
    PlayerCountRenderer,
    AnalyticsRenderer,
    AmmoRenderer,
    MapRenderer,
    ParticleEffectRenderer,
    Camera,
    Renderer
) {

    return function GameRenderer(simulation) {

        const transform = simulation.getTransform();

        const self = Renderer(transform);

        const camera = Camera(transform);

        const fetchImage = function() {
            const spaceImage = new Image();
            spaceImage.src = "./static/images/space_background.jpg";
            spaceImage.onload = function() {
                drawSpaceBackdrop = drawBackgroundImage(spaceImage, 1);
            };
            const glassImage = new Image();
            glassImage.src = "./static/images/brick_overlay - Copy.png";
            glassImage.onload = function() {
                drawOverlay = drawBackgroundImage(glassImage, 0.5);
            };
        };

        const superRender = self._render;
        self._render = function(context, elapsedTime) {
            self.render = () => {
                drawSpaceBackdrop();
                drawBackgroundRectangle();
                drawOverlay();
            };
            superRender(context);
            const playerState = simulation.getAvatarState();
            self.render = renderGame(context, playerState);
            context.save();
            camera.update(playerState.transform, elapsedTime);
            const cameraLocation = camera.location();
            context.translate(-cameraLocation.x, -cameraLocation.y);
            self.graphics.renderBubble(simulation.bubbleData());
            superRender(context);
            context.restore();
            self.render = renderUI(playerState);
            superRender(context);
        };

        const renderUI = (playerState) => function() {
            clearCursor();
            if (simulation.isGameOver())
                drawGameOver();
            else {
                addUIChildren(playerState);
            }
        };

        const renderGame = (context, playerState) => function() {
            if (simulation.isGameOver()) return;
            addGameChildren(context, playerState);
        };

        const drawGameOver = function() {
            const mainSpec = {
                text     : "Game Over",
                location : {x: transform.width / 2, y: 200},
                font     : "96px serif",
                color    : "blue",
                alignment: "center",
                border   : {color: "magenta", thickness: 2}
            };
            self.graphics.drawText(mainSpec);
            const scoreSpec = {
                text     : `Score: ${simulation.getScore()}`,
                location : {x: transform.width / 2, y: 350},
                font     : "48px serif",
                color    : "blue",
                alignment: "center",
                border   : {color: "magenta", thickness: 2}
            };
            self.graphics.drawText(scoreSpec);
        };

        const addUIChildren = function(playerState) {
            self.children.push(createMapRenderer(playerState));
            self.children.push(createScoreRenderer());
            self.children.push(createHealthRenderer());
            self.children.push(createPlayerCountRenderer());
            self.children.push(createAnalyticsRenderer());
            self.children.push(createAmmoRenderer());
            const countdown = simulation.getCountdown();
            if (countdown > 0)
                self.children.push(createCountdownRenderer(countdown));
        };

        const addGameChildren = function(context, playerState) {
            for (let building of simulation.playerBuildings())
                self.children.push(BuildingRenderer(building));
            addEnemies(playerState);
            for (let powerUp of simulation.powerUps())
                self.children.push(PowerUpRenderer(powerUp));
            for (let missile of simulation.missiles())
                self.children.push(MissileRenderer(missile.transform));
            for (let bullet of simulation.bullets())
                self.children.push(BulletRenderer(bullet.transform, "yellow"));
            for (let effect of simulation.getParticleEffects())
                self.children.push(createParticleEffectRenderer(effect));
            for (let building of simulation.noPlayerBuildings())
                self.children.push(BuildingRenderer(building));
            if (playerState.hasAvatar)
                self.children.push(PlayerRenderer(playerState));
        };

        const addEnemies = function(playerState) {
            // if (playerState.hasAvatar)
            //     self.children.push(Fov(playerState));
            for (let avatar of simulation.getEnemies())
                self.children.push(AvatarRenderer(avatar));
            if (playerState.hasAvatar)
                self.children.push(restore());
        };

        const Fov = function(playerState) {
            return {
                _render: function(context) {
                    context.save();
                    context.translate(playerState.transform.x + playerState.transform.width / 2, playerState.transform.y + playerState.transform.height / 2);
                    context.rotate(-playerState.transform.theta);
                    context.translate(-playerState.transform.width / 2, -playerState.height / 2);
                    self.graphics.clip(playerState.fov);
                    context.translate(playerState.transform.width / 2, playerState.height / 2);
                    context.rotate(playerState.transform.theta);
                    context.translate(-playerState.transform.x - playerState.transform.width / 2, -playerState.transform.y - playerState.transform.height / 2);
                }
            };
        };

        const restore = function() {
            return {
                _render: function(context) {
                    context.restore();
                }
            };
        };

        const createMapRenderer = function(playerState) {
            const bubbleData = simulation.bubbleData();
            const buildings = simulation.buildings();
            const extents = simulation.extents();
            return MapRenderer(transform, bubbleData, playerState, buildings, extents);
        };

        const createScoreRenderer = function() {
            const score = simulation.getScore();
            return ScoreRenderer(score, transform);
        };

        const createHealthRenderer = function() {
            const playerState = simulation.getAvatarState();
            return HealthRenderer(playerState, transform);
        };

        const createPlayerCountRenderer = function() {
            const playerCount = simulation.playerCount();
            return PlayerCountRenderer(playerCount, transform);
        };

        const createParticleEffectRenderer = function(effect) {
            return ParticleEffectRenderer(effect);
        };

        const createCountdownRenderer = function(countdown) {
            return CountdownRenderer(countdown, transform);
        };

        const createAnalyticsRenderer = function() {
            const analytics = simulation.getAnalytics();
            return new AnalyticsRenderer(analytics, transform);
        };

        const createAmmoRenderer = function() {
            const playerState = simulation.getAvatarState();
            return AmmoRenderer(playerState, transform);
        };

        const clearCursor = function() { self.graphics.clearCursor(); };

        const drawBackgroundRectangle = function() {
            self.graphics.drawRectangle({
                upperLeft  : {x: 0, y: 0},
                bottomRight: {x: self.width, y: self.height},
                color      : "rgba(0,0,255,0.25)"
            });
        };

        const drawBackgroundImage = function(image, alpha) {
            return function() {
                const spec = {
                    image      : image,
                    upperLeft  : {
                        x: transform.x,
                        y: transform.y
                    },
                    bottomRight: {
                        x: transform.width,
                        y: transform.height
                    },
                    alpha      : alpha
                };
                self.graphics.drawImage(spec);
            };
        };

        self.camera = () => camera;

        let drawSpaceBackdrop = drawBackgroundRectangle;
        let drawOverlay = () => {};

        fetchImage();

        return self;

    };

}

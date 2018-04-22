export default function (
    CountdownRenderer,
    AvatarRenderer,
    PlayerRenderer,
    MissileRenderer,
    BulletRenderer,
    ScoreRenderer,
    AnalyticsRenderer,
    ParticleEffectRenderer,
    Camera,
    Renderer
) {

return function GameRenderer(simulation) {

    const transform = simulation.getTransform();

    const self = Renderer( transform );

    const camera = Camera( transform );

    const fetchImage = function () {
        const image = new Image();
        image.src = "./static/images/space_background.jpg";
        image.onload = function () {
            drawBackground = drawBackgroundImage( image );
        };
    };

    const superRender = self._render;
    self._render = function(context, elapsedTime) {
        self.render = () => drawBackground();
        superRender( context );
        const playerState = simulation.getAvatarState();
        self.render = renderGame( context, playerState );
        context.save();
        camera.update( playerState.transform, elapsedTime );
        const cameraLocation = camera.location();
        context.translate( -cameraLocation.x, -cameraLocation.y );
        superRender( context );
        context.restore();
        self.render = renderUI();
        superRender( context );
    };

    const renderUI = (playerState) => function() {
        clearCursor();
        if (simulation.isGameOver())
            drawGameOver();
        else {
            addUIChildren( playerState );
        }
    };

    const renderGame = (context, playerState) => function() {
        if (simulation.isGameOver()) return;
        addGameChildren( context, playerState );
    };

    const drawGameOver = function () {
        const mainSpec = {
            text: "Game Over",
            location: {x: simulation.getTransform().width / 2, y: 200},
            font: "96px serif",
            color: "blue",
            alignment: "center",
            border: { color: "magenta", thickness: 2 }
        };
        self.graphics.drawText( mainSpec );
        const scoreSpec = {
            text: `Score: ${simulation.getScore()}`,
            location: {x: simulation.getTransform().width / 2, y: 350},
            font: "48px serif",
            color: "blue",
            alignment: "center",
            border: { color: "magenta", thickness: 2 }
        };
        self.graphics.drawText( scoreSpec );
    };

    const addUIChildren = function () {
        self.children.push( createScoreRenderer() );
        self.children.push( createAnalyticsRenderer() );
        const countdown = simulation.getCountdown();
        if (countdown > 0)
            self.children.push( createCountdownRenderer( countdown ) );
    };

    const addGameChildren = function (context, playerState) {
        addEnemies( playerState );
        if (playerState.hasAvatar)
            self.children.push( PlayerRenderer( playerState ) );
        for (let missile of simulation.getMissiles())
            self.children.push( MissileRenderer( missile.transform ) );
        for (let bullet of simulation.getBullets())
            self.children.push( BulletRenderer( bullet.transform ) );
        for (let effect of simulation.getParticleEffects())
            self.children.push( createParticleEffectRenderer( effect ) );
    };

    const addEnemies = function (playerState) {
        if (playerState.hasAvatar)
            self.children.push( Fov( playerState ) );
        for (let avatar of simulation.getEnemies())
            self.children.push( AvatarRenderer( avatar ) );
        if (playerState.hasAvatar)
            self.children.push( restore() );
    };

    const Fov = function (playerState) {
        return {
            _render: function (context) {
                context.save();
                context.translate( playerState.transform.x+playerState.transform.width/2, playerState.transform.y+playerState.transform.height/2 );
                context.rotate( -playerState.transform.theta );
                context.translate( -playerState.transform.width/2, -playerState.height/2 );
                self.graphics.clip( playerState.fov );
                context.translate( playerState.transform.width/2, playerState.height/2 );
                context.rotate( playerState.transform.theta );
                context.translate( -playerState.transform.x-playerState.transform.width/2, -playerState.transform.y-playerState.transform.height/2 );
            }
        };
    };

    const restore = function () {
        return {
            _render: function (context) {
                context.restore();
            }
        };
    };

    const createScoreRenderer = function () {
        const score = simulation.getScore();
        const gameTransform = simulation.getTransform();
        return ScoreRenderer( score, gameTransform );
    };

    const createParticleEffectRenderer = function (effect) {
        return ParticleEffectRenderer( effect );
    };

    const createCountdownRenderer = function (countdown) {
        return CountdownRenderer( countdown, transform );
    };

    const createAnalyticsRenderer = function() {
        const analytics = simulation.getAnalytics();
        return new AnalyticsRenderer( analytics, simulation.getTransform() );
    };

    const clearCursor = function () { self.graphics.clearCursor(); };

    const drawBackgroundRectangle = function () {
        self.graphics.drawRectangle({
            upperLeft: {x: 0, y: 0},
            bottomRight: {x: self.width, y: self.height},
            color: "#000033"
        });
    };

    const drawBackgroundImage = function(image) { return function () {
        const spec = {
            image: image,
            upperLeft: {
                x: transform.x,
                y: transform.y
            },
            bottomRight: {
                x : transform.width,
                y: transform.height
            }
        };
        self.graphics.drawImage( spec );
    }};

    self.camera = () => camera;

    let drawBackground = drawBackgroundRectangle;

    fetchImage();

    return self;

}

}

module.exports = function (
    gameObjects,
    collisionSystems,
    Actions
) {

return function GameSimulation(clients) {

    const transform = {
        x: 0,
        y: 0,
        theta: 0,
        width: 1024,
        height: 768
    };

    const self = gameObjects.GameObject( transform );

    let currentState = {
        gameTime: 0,
        transform: null
    };
    let avatar = null;

    let countdown = null;
    let otherAction = Actions.NONE;
    let gameOver = false;
    let client = null;

    resetGame();

    function resetGame() {
        resetCountdown();
    }

    function resetCountdown() {
        self.update = updateCountdown;
        countdown = 3000;
    }

    function updateCountdown (elapsedTime) {
        countdown -= elapsedTime;
        currentState.gameTime += elapsedTime;
        if (countdown <= 0) spawnAvatar();
        if (client) client.sendState( currentState );
    }

    function spawnAvatar() {
        const newLocation = nextSpawnLocation();
        avatar = gameObjects.Avatar( newLocation );
        self.update = updateGame;
    }

    function nextSpawnLocation() {
        return {
            x: Math.floor(Math.random() * transform.width),
            y: Math.floor(Math.random() * transform.height)
        };
    }

    function updateGame (elapsedTime) {
        if (!client) {
            client = clients.wantToJoin()[0];
            if (!client) return;
        }
        const actions = client.gameInput().input();
        otherAction = actions.other;
        if (gameOver) return;
        currentState.gameTime += elapsedTime;
        updatePlayerRotation( actions.mousePosition );
        updatePlayerVelocity( actions.move );
        currentState.transform = avatar.getTransform();
        if (client) client.sendState( currentState );
    }

    const updatePlayerRotation = function (mousePosition) {
        avatar.rotate( mousePosition )
    };

    const updatePlayerVelocity = function (moveActions) {
        const vector = {
            x: xFrom( moveActions ),
            y: yFrom( moveActions )
        };
        avatar.move( vector );
    };

    const xFrom = function(moveActions) {
        switch (moveActions.x) {
            case Actions.MOVE_LEFT:
                return -1;
            case Actions.MOVE_RIGHT:
                return 1;
            default:
                return 0;
        }
    };

    const yFrom = function(moveActions) {
        switch (moveActions.y) {
            case Actions.MOUSE_UP:
                return 1;
            case Actions.MOVE_DOWN:
                return -1;
            default:
                return 0;
        }
    };

    self.currentState = () => currentState;

    return self;

}

};

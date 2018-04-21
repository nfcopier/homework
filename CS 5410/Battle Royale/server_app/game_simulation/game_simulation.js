module.exports = function (
    Player,
    gameObjects
) {

const GAME_LENGTH = 15 * 60 * 1000;

return function GameSimulation(clients) {

    const transform = {
        x: 0,
        y: 0,
        theta: 0,
        width: 1024,
        height: 768
    };

    const self = gameObjects.GameObject( transform );

    let players = [];
    let gameState = {
        bubble: {
            x: transform.width / 2,
            y: transform.height / 2,
            radius: Math.min( transform.width, transform.height )
        },
        gameTime: GAME_LENGTH
    };

    self.update = function(elapsedTime) {
        gameState.gameTime -= elapsedTime;
        clients.justLoggedIn().forEach( addPlayer );
        players.forEach( doUpdate(elapsedTime) );
        players.forEach( send(gameState) );
    };

    const send = (gameState) => function (player) {
        player.sendPlayerUpdate();
        player.sendGameState( gameState )
    };

    const addPlayer = function (client) {
        const player = Player( client );
        const newLocation = nextSpawnLocation();
        players.push( player );
        player.respawn( newLocation );
    };

    const doUpdate = (elapsedTime) => (player) => player.update( elapsedTime );

    function nextSpawnLocation() {
        return {
            x: Math.floor(Math.random() * transform.width),
            y: Math.floor(Math.random() * transform.height)
        };
    }

    return self;

}

};

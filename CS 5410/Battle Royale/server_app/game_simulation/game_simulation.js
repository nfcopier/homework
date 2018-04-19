module.exports = function (
    Player,
    gameObjects
) {

const GAME_LENGTH = 10 * 60 * 1000;

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
        for (let client of clients.wantToJoin())
            addPlayerFrom( client );
        for (let player of players)
            player.update( elapsedTime );
        for (let player of players)
            player.sendUpdate();
        for (let player of players)
            player.sendGameState( gameState )
    };

    const addPlayerFrom = function (client) {
        const player = Player( client );
        const newLocation = nextSpawnLocation();
        player.respawn( newLocation );
        players.push( player );
    };

    function nextSpawnLocation() {
        return {
            x: Math.floor(Math.random() * transform.width),
            y: Math.floor(Math.random() * transform.height)
        };
    }

    return self;

}

};

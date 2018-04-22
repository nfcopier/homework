module.exports = function (
    Player
) {

return function GameSimulation(clients) {

    const transform = {
        width: 1024,
        height: 768
    };

    const self = {};

    let players = [];
    let gameState = {
        bubble: {
            x: transform.width / 2,
            y: transform.height / 2,
            radius: Math.min( transform.width, transform.height )
        },
        gameTime: 0
    };

    self.update = function(elapsedTime) {
        gameState.gameTime += elapsedTime;
        clients.justLoggedIn().forEach( addPlayer );
        players = players.filter( isLoggedIn );
        players.forEach( doUpdate(elapsedTime) );
        players.filter( isDead ).forEach( respawn );
        gameState.playerData = players.filter( hasAvatar ).map( playerData );
        gameState.elapsedTime = elapsedTime;
        players.forEach( send(gameState) );
    };

    const addPlayer = function (client) {
        const player = Player(client);
        players.push(player);
        respawn( player )
    };

    const isLoggedIn = (player) => player.isLoggedIn();

    const doUpdate = (elapsedTime) => (player) => player.update( elapsedTime );

    const isDead = (player) => player.isDead();

    const respawn = function(player) {
        const newLocation = nextSpawnLocation();
        player.respawn( newLocation );
    };

    const hasAvatar = (player) => player.hasAvatar();

    const playerData = (player) => player.ownData();

    const send = (gameState) => function (player) {
        player.sendPlayerUpdate();
        player.sendGameState( gameState )
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

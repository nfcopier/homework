export default function (
    Actions,
    Avatar
) {

return function AvatarStatePredictor(spawnPoint) {

    const self = {};

    let knownTransform;
    let predictedTransform;
    let updates;
    let missileAmmo;
    let bulletAmmo;
    let health;
    let fov;
    let hasAvatar = false;

    const initialize = function() {
        updates = [];
        predictedTransform = knownTransform = {
            x: spawnPoint.x,
            y: spawnPoint.y,
            theta: spawnPoint.theta,
            width: 20,
            height: 25
        };
        missileAmmo = 4;
        bulletAmmo = 200;
        health = 20;
    };

    self.update = function(userInput, elapsedTime) {
        hasAvatar = true;
        const latestUpdate = updateFrom( userInput, elapsedTime );
        updates.push( latestUpdate );
        const avatar = Avatar( knownTransform );
        updates.forEach( applyTo(avatar) );
        predictedTransform = avatar.getTransform();
        fov = avatar.fov();
    };

    const updateFrom = function(userInput, elapsedTime) {
        const input = {
            sequenceNumber: userInput.sequenceNumber,
            move: Object.assign({}, userInput.move),
            mousePosition: Object.assign({}, userInput.mousePosition)
        };
        return {input: input, elapsedTime: elapsedTime};
    };

    const applyTo = (avatar) => function( update ) {
        const elapsedTime = update.elapsedTime;
        avatar.rotate( update.input.mousePosition );
        const direction = {
            x: xFrom( update.input.move ),
            y: yFrom( update.input.move )
        };
        avatar.move( direction, elapsedTime );
    };

    self.setKnown = function (newState) {
        knownTransform = newState.transform;
        missileAmmo = newState.missileAmmo;
        bulletAmmo = newState.bulletAmmo;
        health = newState.health;
        updates = updates.filter( isNewerThan(newState) )
    };

    const isNewerThan = (newState) => (update) =>
        update.input.sequenceNumber > newState.sequenceNumber;

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

    self.state = function () {
        return {
            transform: predictedTransform,
            missileAmmo: missileAmmo,
            bulletAmmo: bulletAmmo,
            health: health,
            fov: fov,
            hasAvatar: hasAvatar
        }
    };

    initialize();

    return self;

}

};

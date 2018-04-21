export default function (
    Actions,
    Avatar
) {

return function StatePredictor(location) {

    const self = {};

    let knownTransform;
    let predictedTransform;
    let updates;
    let missileAmmo;
    let bulletAmmo;
    let health;
    let score;

    const initialize = function() {
        updates = [];
        predictedTransform = knownTransform = {
            x: location.x,
            y: location.y,
            theta: 0,
            width: 20,
            height: 25
        };
        missileAmmo = 4;
        bulletAmmo = 200;
        health = 20;
        score = 0;
    };

    self.update = function(userInput, elapsedTime) {
        const latestUpdate = updateFrom( userInput, elapsedTime );
        updates.push( latestUpdate );
        const avatar = Avatar( knownTransform );
        updates.forEach( applyTo(avatar) );
        predictedTransform = avatar.getTransform();
    };

    const updateFrom = function(actions, elapsedTime) {
        const input = {
            sequenceNumber: actions.sequenceNumber,
            move: Object.assign({}, actions.move),
            mousePosition: Object.assign({}, actions.mousePosition)
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
        score = newState.score;
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
            score: score
        }
    };

    initialize();

    return self;

}

};

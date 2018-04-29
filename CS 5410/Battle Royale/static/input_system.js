export default function (
    KeyCodes,
    Actions,
    Directions
) {

const LOWER_A_CODE = "a".charCodeAt( 0 );
const UPPER_A_CODE = "A".charCodeAt( 0 );

const keyMapping = {
    forward: KeyCodes.DOM_VK_W,
    back: KeyCodes.DOM_VK_S,
    left: KeyCodes.DOM_VK_A,
    right: KeyCodes.DOM_VK_D
};

return function InputSystem(canvas) {

    const self = {};
    let actions = {
        move: { x: Actions.NONE, y: Actions.NONE },
        mousePosition: { x: 0, y: 0 },
        fire: Actions.NONE
    };
    let mousePosition = { x: 0, y: 0};
    let sequenceNumber = 0;
    let firingBullets = false;
    let missileFired = false;

    self.startListening = function () {
        resetActions();
        window.addEventListener("keydown", onKeyDown, false);
        window.addEventListener("keyup", onKeyUp, false);
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("contextmenu", (e) => e.preventDefault())
    };

    const onKeyDown = function (e) {
        const xDirection = getDirectionX( e );
        if (xDirection) actions.move.x = getMoveActionFrom( xDirection );
        const yDirection = getDirectionY( e );
        if (yDirection) actions.move.y = getMoveActionFrom( yDirection );
        actions.other = getOtherActionFrom( e );
        if (isPrintable(e.keyCode)) appendText( e );
    };

    const onKeyUp = function (e) {
        const xDirection = getDirectionX( e );
        if (xDirection) actions.move.x = Actions.NONE;
        const yDirection = getDirectionY( e );
        if (yDirection) actions.move.y = Actions.NONE;
    };

    const isPrintable = function (keyCode) {
        return keyCode > 48 && keyCode < 90;
    };

    const appendText = function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        actions.text += charFrom( e );

    };

    const charFrom = function (e) {
        if (e.shiftKey) return String.fromCharCode( e.keyCode );
        return String.fromCharCode( e.keyCode + LOWER_A_CODE - UPPER_A_CODE);
    };

    const getDirectionX = function (e) {
        switch (e.keyCode) {
            case keyMapping.left:
                return Directions.LEFT;
            case keyMapping.right:
                return Directions.RIGHT;
            default:
                return null;
        }
    };

    const getDirectionY = function (e) {
        switch (e.keyCode) {
            case keyMapping.forward:
                return Directions.TOP;
            case keyMapping.back:
                return Directions.BOTTOM;
            default:
                return null;
        }
    };

    const getMoveActionFrom = function (event) {
        switch (event) {
            case Directions.LEFT:
                return Actions.MOVE_LEFT;
            case Directions.RIGHT:
                return Actions.MOVE_RIGHT;
            case Directions.TOP:
                return Actions.MOUSE_UP;
            case Directions.BOTTOM:
                return Actions.MOVE_DOWN;
            default:
                return Actions.NONE;
        }
    };

    const getOtherActionFrom = function (e) {
        switch (e.keyCode) {
            case KeyCodes.DOM_VK_ESCAPE:
                return Actions.PAUSE_GAME;
            case KeyCodes.DOM_VK_BACK_SPACE:
                return Actions.BACK_SPACE;
            default:
                return Actions.NONE;
        }
    };

    const onTouchEnd = function (e) {
        onMouseMove( e );
        onMouseUp();
    };

    const onMouseMove = function(event) {
        const canvasScale = canvas.getScale();
        mousePosition = {
            x: canvasScale.x * event.clientX,
            y: canvasScale.y * event.clientY
        };
    };

    const onMouseDown = function (event) {
        if (isBullet(event)) firingBullets = true;
        else if (isMissile(event) && !missileFired && !firingBullets) {
            missileFired = true;
            actions.fire = Actions.FIRE_MISSILE;
        }
    };

    const isBullet = (event) => event.button === KeyCodes.MOUSE_LEFT;

    const isMissile = (event) => event.button === KeyCodes.MOUSE_RIGHT;

    const onMouseUp = function (event) {
        actions.mouseUp = Actions.MOUSE_UP;
        if (isBullet(event)) firingBullets = false;
        if (isMissile(event)) missileFired = false;
    };

    self.getActions = function (elapsedTime, camera) {
        const currentActions = actions;
        currentActions.elapsedTime = elapsedTime;
        const cameraLocation =  camera ? camera.location() : null;
        if (cameraLocation)
            currentActions.mousePosition = {
                x: currentActions.mousePosition.x + cameraLocation.x,
                y: currentActions.mousePosition.y + cameraLocation.y
            };
        if (firingBullets) currentActions.fire = Actions.FIRE_BULLET;
        resetActions();
        return currentActions;
    };

    function resetActions() {
        sequenceNumber += 1;
        actions = {
            sequenceNumber: sequenceNumber,
            move: Object.assign( {}, actions.move ),
            mousePosition: Object.assign( {}, mousePosition ),
            mouseUp: Actions.NONE,
            fire: Actions.NONE,
            text: "",
            other: Actions.NONE
        };
    }

    return self;

}

}
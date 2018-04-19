const gameObject = require("./game_object.js");
const avatar = require("./avatar.js");

module.exports = function (
) {

    const GameObject = gameObject();

    const Avatar = avatar( GameObject );

    return {
        GameObject: GameObject,
        Avatar: Avatar
    }
};

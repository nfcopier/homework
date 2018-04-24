const symmetric = require("./symmetric");

module.exports = function (
    Building,
    PowerUp,
    Wall
) {

    return [
        symmetric(
            Building,
            PowerUp
        )
    ];

};

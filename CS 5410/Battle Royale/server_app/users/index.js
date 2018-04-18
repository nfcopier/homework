const userRepo = require("./user_repository");
const register = require("./register_user");

module.exports = function (fs) {

    const UserRepo = userRepo( fs );

    const registerUser = register( UserRepo );

    return {
        registerUser: registerUser
    }

};

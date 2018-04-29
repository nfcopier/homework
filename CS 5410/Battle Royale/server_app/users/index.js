const userRepo         = require("./user_repository");
const register         = require("./register_user");
const checkCredentials = require("./check_credentials");

module.exports = function (fs) {

    const UserRepo = userRepo( fs );

    const registerUser = register( UserRepo );

    const check = checkCredentials( UserRepo );

    return {
        registerUser: registerUser,
        check: check
    }

};

const UserRepository = require("./user_repository.js");

module.exports = function CheckCredentials(username, password) {
    if (isNullOrEmpty(username))
        throw "username_empty";
    if (isNullOrEmpty(password))
        throw "password_empty";
    const userRepo = UserRepository();
    const user = userRepo.getByUsername(username);
    return user && user.password === password;
};

const isNullOrEmpty = (string) => {
    // noinspection JSUnresolvedFunction
    return !string || !string.trim().length;
};

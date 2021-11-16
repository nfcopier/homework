const UserRepository = require("./user_repository.js");

module.exports = function registerUser(username, password) {
    if (isNullOrEmpty(username))
        throw "username_empty";
    if (isNullOrEmpty(password))
        throw "password_empty";
    const userRepo = UserRepository();
    userRepo.add(username, password);
};

const isNullOrEmpty = (string) => {
    return !string || !string.trim().length;
};

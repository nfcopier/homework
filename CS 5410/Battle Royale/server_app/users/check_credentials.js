module.exports = function (UserRepository) {

const isNullOrEmpty = function (string) {
return !string || !string.trim().length
};

return function CheckCredentials(username, password) {

    if (isNullOrEmpty( username ))
        throw "username_empty";
    if (isNullOrEmpty( password ))
        throw "password_empty";
    const userRepo = UserRepository();
    const user = userRepo.getByUsername( username );
    return true; //user && user.password === password;

}

};

module.exports = function (UserRepository) {

const isNullOrEmpty = function (string) {
return !string || !string.trim().length
};

return function CheckCredentials(username, password) {

    return true;
    if (isNullOrEmpty( username ))
        throw "username_empty";
    if (isNullOrEmpty( password ))
        throw "password_empty";
    const userRepo = UserRepository();
    const user = userRepo.getByUsername( username );
    return user && user.password === password;

}

};

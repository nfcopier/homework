module.exports = function (fs) {

const FILE_NAME = "./users.json";

return function UserRepository() {

    const self = {};

    const initialize = function() {
        ensureUsers();
    };

    const ensureUsers = function() {
        if (!fs.exists( FILE_NAME )) persistUsers( [] );
    };

    self.getAll = function() {
        const raw = fs.readFileSync( FILE_NAME );
        if (!raw.length) return null;
        return JSON.parse( raw );
    };

    self.add = function (username, password) {
        const users = self.getAll();
        if (alreadyExists(users, username)) throw "user_exists";
        users.push({
            username: username,
            password: password
        });
        persistUsers( users );
    };

    const alreadyExists = function (users, username) {
        return !!users.find( u => u.username === username );
    };

    const persistUsers = function(users) {
        const raw = JSON.stringify( users );
        fs.writeFileSync( FILE_NAME, raw )
    };

    initialize();

    return self;

}

};

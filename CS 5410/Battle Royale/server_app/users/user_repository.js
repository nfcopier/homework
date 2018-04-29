module.exports = function (fs) {

const FILE_NAME = "./users.json";

return function UserRepository() {

    const self = {};

    const initialize = function() {
        ensureUsers();
    };

    const ensureUsers = function() {
        if (!fs.existsSync( FILE_NAME )) persistUsers( [] );
    };

    self.getAll = function() {
        const raw = fs.readFileSync( FILE_NAME );
        if (!raw.length) return null;
        return JSON.parse( raw );
    };

    self.add = function (username, password) {
        if (alreadyExists(username)) throw "user_exists";
        const users = self.getAll();
        users.push({
            username: username,
            password: password
        });
        persistUsers( users );
    };

    const alreadyExists = (username) => !!self.getByUsername( username );

    self.getByUsername = function (username) {
        return self.getAll().find( has(username) );
    };

    const has = username => user => user.username === username;

    const persistUsers = function(users) {
        const raw = JSON.stringify( users );
        fs.writeFileSync( FILE_NAME, raw )
    };

    initialize();

    return self;

}

};

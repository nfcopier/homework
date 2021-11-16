const fs = require("fs");

const FILE_NAME = "./users.json";

module.exports = function UserRepository() {

    const self = {};

    const _ctor = () => {
        ensureUsers();
        return this;
    };

    const ensureUsers = () => {
        if (!fs.existsSync(FILE_NAME)) persistUsers([]);
    };

    self.getAll = () => {
        const raw = fs.readFileSync(FILE_NAME).toString();
        if (!raw.length) return null;
        return JSON.parse(raw);
    };

    self.add = (username, password) => {
        if (alreadyExists(username)) throw "user_exists";
        const users = self.getAll();
        users.push({
            username: username,
            password: password
        });
        persistUsers(users);
    };

    const alreadyExists = (username) => Boolean(self.getByUsername(username));

    self.getByUsername = (username) => {
        return self.getAll().find(has(username));
    };

    const has = username => user => user.username === username;

    const persistUsers = (users) => {
        const raw = JSON.stringify(users);
        fs.writeFileSync(FILE_NAME, raw);
    };

    return _ctor();

};

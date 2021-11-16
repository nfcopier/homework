const Client= require("./client.js");

module.exports = function Clients() {

    const self = {};

    clients = [];

    self.add = (clientSocket) => {
        const client = Client(clientSocket);
        clients.push(client);
        client.startListening();
    };

    self.justLoggedIn = () => {
        return clients.filter(c => c.justLoggedIn());
    };

    return self;

};

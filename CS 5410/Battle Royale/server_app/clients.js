module.exports = function (
    Client
) {

return function Clients() {

    const self = {};

    clients = [];

    self.add = function (clientSocket) {
        const client = Client(clientSocket);
        clients.push( client );
        client.startListening();
    };

    self.justLoggedIn = function () {
        return clients.filter( c => c.justLoggedIn() );
    };

    return self;

}

};

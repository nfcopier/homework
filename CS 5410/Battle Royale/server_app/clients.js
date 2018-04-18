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

    return self;

}

};

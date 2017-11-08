const studios = require('./studios');
const Hapi = require('hapi'); 


const server = new Hapi.Server();
const port = process.env.port || 3000;
server.connection({host: 'localhost', port});

server.route(studios);
server.start(function () {
    console.log('server running at ', server.info.uri); //eslint-disable-line
});

module.exports = server;
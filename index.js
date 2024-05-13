const net  = require('net');
const { RedisParser } = require('./src/parser/redis-parser');
const { returnReply, returnError } = require('./src/parser/parser-options');

// TCP Server
const server = net.createServer(connection => {
    console.log('Readish client connected.');

    connection.on('data', data => {
        
        const parser = new RedisParser({
            connection: connection,
            returnReply: returnReply,
            returnError: returnError
        });

        parser.execute(data);
    });
});

server.listen(8080, () => console.log(`Readish server running on port 8080.`));
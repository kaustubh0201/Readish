const net  = require('net');
const { setCommand } = require('./commands/set');
const { getCommand } = require('./commands/get');
const { pingCommand } = require('./commands/ping');
const { store } = require('./storage/store');
const { RedisParser } = require('./parser/redis-parser');

// TCP Server
const server = net.createServer(connection => {
    console.log('Readish client connected.');

    connection.on('data', data => {
        const parser = new RedisParser({
            returnReply: (reply) => {
                const command = reply[0];
                
                switch (command) {
                    case 'set': setCommand(store, reply, connection);
                    break;

                    case 'get': getCommand(store, reply, connection);
                    break;

                    case 'ping': pingCommand(connection);
                    break;

                    default: {
                        let err = 'Command Not Found! Please try again!';
                        connection.write(`$${err.length}\r\n${err}\r\n`);
                    }
                        
                }
            },
            returnError: (err) => {
                connection.write(`$${err.length}\r\n${err}\r\n`);
                console.log('=>', err);
            }
        });

        parser.execute(data);
    });
});

server.listen(8080, () => console.log(`Readish server running on port 8080.`));
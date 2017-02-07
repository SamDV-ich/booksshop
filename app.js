const http = require('http'),
    conf = require('./config/config'),
    app = require('./core/application');

function listen() {
    server.close();
    server.listen(conf.config.server.port, conf.config.server.host);
}

const server = http.createServer((req, res) => {
        try {
            app.run(req, res, conf.config);
        }
        catch(e) {
            console.log('errorHandler', e);
            res.statusCode = 500;
            res.end(500 + ' ' + http.STATUS_CODES[500]);
            // app.end(500, http.STATUS_CODES[500]);
        }
    }
);

listen(conf.config.server.port, conf.config.server.host);

// Server errors handler
server.on('error', (e) => {
    if(e.code == 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            listen();
        }, 5000);
    }
    else {
        console.log('An error has occurred', e);
    }
});

server.setTimeout(conf.config.server && conf.config.server.requestTimeout ? conf.config.server.requestTimeout : 60000, (socket) => {
    console.log('time out');
    // close connection with user
    // 'HTTP/1.1 503 ' + http.STATUS_CODES[503]
    socket.end();
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request');
});
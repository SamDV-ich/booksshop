const fs  = require('fs'),
    path = require('path'),
    conf = require('../../config/config');

exports.execute = function(req, res, cb) {
    let pathInd = './' + conf.config.client.dir + '/' + (process.env.DEV ? conf.config.client.devDir : conf.config.client.prodDir) + '/index.html';

    fs.readFile(path.normalize(pathInd), (err, data) => {
        if(err) {
            cb(req, res, {statusCode: 500});
        }
        else {
            cb(req, res, {isFile: true, file : {buffer: data}, headers : {
                'Content-Type' : 'text/html'
            }});
        }
    });
};
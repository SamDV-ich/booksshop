//routing initialization
require('../application/routes');

const router = require('../core/router'),
    response = require('../core/response'),
    mainController = require('../core/controller'),

    path = require('path'),
    fs = require('fs');

let appConf;

function getFile(req, res, options) {
    let envPath = (process.env.DEV ? appConf.client.devDir : appConf.client.prodDir),
        isNodeModule = options.file.path.indexOf('node_modules') !== -1;

    let filePath = path.join
        (
            isNodeModule ? './' : './client',
            isNodeModule ? '' : envPath,
            options.file.path
        );

    fs.readFile(filePath, (err, data) => {
            if(err) {
                callback(req, res, {statusCode: 404});
            }
            else {
                options.file.buffer = data;
                options.isFile = false;

                callback(req, res, options);
            }
    });
}

function controllerCallBack(req, res, data) {
    callback(req, res, data);
}

// wait object with two params isFile and controller (controller name)
function callback(req, res, result) {
    console.log(result);
    if(!result || typeof result != 'object') {
        result = {
            file : {}
        };
    }

    //close connection and show file if exist
    if(!result.controller) {
        if(result.isFile && result.file.path) {
            getFile(req, res, result);
        }
        else {
            response.end(res, result);
        }
    }
    //include and execute controller
    else {
        mainController.execute(req, res, result, controllerCallBack);
    }
}

exports.run = function(req, res, config) {
    appConf = config;
    // response.setServerResponse(res);

    router.execute(req, res, callback);
};

// exports.end = function(code, msg, force) {
//     response.end(res, {statusCode: code || 500, force:force});
// };
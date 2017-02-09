const url = require('url'),
    path = require('path'),
    conf = require('../config/config');

const clientConf = conf.config.client;

let routes = {};

exports.add = function(name, path, controller, options) {
    let reg = path;

    if(options) {
        for(let option in options) {
            reg = reg.replace(new RegExp("\\(" + option + "\\)"), options[option]);
        }
    }

    reg = new RegExp('^' + reg + '$');

    routes[name] = {
        path : path,
        pathReg : reg,
        controller : controller
    }
};

exports.execute = function(req, res, callback) {
    let reqUrlObj = url.parse(req.url),
        reqPathName = reqUrlObj.pathname,
        responseData = {
            //option to check if should be loaded a file
            isFile : true,
            //file data if exists i.e. Content-type, extension
            file : {},
            //controller name
            controller : null
        },
        fileExtMatch;


    responseData.file.path = reqPathName;

    if((new RegExp('\.js$', 'i')).test(reqPathName)) {
        responseData.file.ContentType = 'text/javascript';
    }
    else if((new RegExp('\.css$', 'i')).test(reqPathName)) {
        responseData.file.ContentType = 'text/css';
    }
    else if((new RegExp('\.html$', 'i')).test(reqPathName)) {
        responseData.file.ContentType = 'text/html';
    }
    else if(fileExtMatch = reqPathName.match(/\.(jpg|jpeg|png|gif|svg|ico)$/i)) {
        let mime = 'image/';

        switch(fileExtMatch[1]) {
            case 'jpg':
            case 'jpeg':
                mime += 'jpeg';
                break;
            case 'svg':
                mime += 'svg+xml';
                break;
            case 'ico':
                mime += 'x-icon';
                break;
            default:
                mime += fileExtMatch[1];
        }

        responseData.file.ContentType = mime;
    }
    else if(fileExtMatch = reqPathName.match(/\.(ttf|woff|eot)$/i)) {
        responseData.file.ContentType = 'font/' + fileExtMatch[1];
    }
    else {
        delete responseData.file.path;

        responseData.isFile = false;

        for(let name in routes) {
            let result = reqPathName.match(routes[name].pathReg);

            if(result !== null) {
                responseData.controller = name;
                break;
            }
        }

        if(!responseData.controller) {
            responseData.statusCode = 404;
        }
    }

    callback(req, res, responseData);
};
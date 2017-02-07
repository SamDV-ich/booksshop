const defaultOptions = {
    headers : {
        'Content-Type' : 'text/plain'
    },
    statusCode : 200,
    isFile : false,
    buffer: null,
    content : ''
},
codes = {
    500 : '500 Internal Server Error',
    404 : '404 Not Found'
};

exports.end = function(res, options) {
    let responseData = Object.assign({}, defaultOptions, options && (typeof options == 'object') ? options : {});

    if(!responseData.force) {
        if(typeof responseData.file != 'object') {
            responseData.file = {};
        }

        if(responseData.file.ContentType) {
            responseData.headers['Content-Type'] = responseData.file.ContentType;
        }

        res.writeHead(responseData.statusCode,  responseData.headers);

        if(responseData.file.buffer && Buffer.isBuffer(responseData.file.buffer)) {
            res.write(responseData.file.buffer.toString('utf8'));
        }

        if(codes.hasOwnProperty(responseData.statusCode)) {
            res.write(codes[responseData.statusCode]);
        }
    }
    else {
        res.abort();
    }

    res.end();
};

// exports.setServerResponse = function(res) {
//     res = res;
// };

// exports.get = function() {
//     return res;
// };

exports.setHeaders = function(headersObject) {

};
    // res.writeHead(options.statusCode || code, {'Content-length': data.length});

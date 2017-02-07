
exports.execute = function(req, res, data, cb) {
    try {
        require('../application/controllers/' + data.controller).execute(req, res, cb);
    }
    catch(e) {
        cb(req, res, {statusCode: 500})
    }
};
const constant = require("../constant.js");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    if (res.headersSent) {
        return next(err);
    }

    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            res.json({ title: "Validation Error", message: err.message, stackTrace: err.stack });
            break;
        case constant.UNAUTHORIZED:
            res.json({ title: "Unauthorized Error", message: err.message, stackTrace: err.stack });
            break;
        case constant.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        case constant.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stackTrace: err.stack });
            break;
        case constant.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
            break;
        default:
            res.json({ message: err.message, stackTrace: err.stack });
            break;
    }
};

module.exports = errorHandler;
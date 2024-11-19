const customError = require("../utils/customError");

//Global error handling
const errorHandler = (err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
        status,
        message : err.message || "Something went wrong"
    })
}

module.exports = errorHandler;
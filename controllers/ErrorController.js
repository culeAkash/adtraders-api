const AppError = require("../utils/AppError");


const handleCastErrorDB = (err) => {
    // console.log(err);
    const message = `Invalid ${err.path} : ${err.value}`
    return new AppError(message, 400);
}


const handleDuplicateErrorDB = (err) => {
    const message = `Duplicate field value : ${(err.keyValue.name) || (err.keyValue.email)} : Please use another value!`
    return new AppError(message, 400);
}


const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(elem => elem.message);
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}


// handle JWT Token verification error
const handleJWTError = () => new AppError('Invalid token, Please login again', 403);

//handle jwt expired error
const handleJwtExpiredError = () => new AppError('Your token has expired! Please login again.', 401);

module.exports = (error, req, res, next) => {

    error.status = error?.status || 'error';
    error.statusCode = error?.statusCode || 500;

    console.log(error);

    let err = { ...error };
    err.message = error.message;
    err.name = error.name


    console.log(err);

    if (err.name === 'CastError') error = handleCastErrorDB(err)

    if (err.code === 11000) error = handleDuplicateErrorDB(err);

    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);


    if (err.name === 'JsonWebTokenError') error = handleJWTError();

    if (err.name === 'TokenExpiredError') error = handleJwtExpiredError();


    // console.log(error);

    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    }
    else {
        res.status(500).json({
            status: 'error',
            message: "Something went very wrong..."
        })
    }
}
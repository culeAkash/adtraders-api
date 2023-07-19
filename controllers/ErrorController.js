const AppError = require("../utils/AppError");


const handleCastErrorDB = (err) => {
    // console.log(err);
    const message = `Invalid ${err.path} : ${err.value}`
    return new AppError(message, 400);
}


const handleDuplicateErrorDB = (err) => {
    const message = `Duplicate field value : ${(err.keyValue.name)} : Please use another value!`
    return new AppError(message, 400);
}


const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(elem => elem.message);
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}

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


    // console.log(error);

    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
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
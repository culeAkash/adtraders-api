




module.exports = (error, req, res, next) => {

    error.status = error?.status || 'error';
    error.statusCode = error?.statusCode || 500;

    console.log(error);

    let err = { ...error };
    err.message = error.message;


    console.log(err);

    res.json({
        status: 'fail',
        message: error.message
    })
}
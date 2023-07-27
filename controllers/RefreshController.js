const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/CatchAsync')

const { promisify } = require('util')

const jwt = require('jsonwebtoken')


exports.handleRefreshToken = catchAsync(async (req, res, next) => {
    const cookies = req.cookies;

    console.log(cookies.jwt);
    if (!cookies.jwt) return next(new AppError('Refresh token not present, Please login', 403));
    const refreshToken = cookies.jwt;

    console.log(refreshToken);

    const user = await User.find({ refreshToken: refreshToken });

    console.log(user);

    if (!user) return next(new AppError('User is either not present or has deactivated account', 401));

    // verify refresh token
    const decodedToken = await promisify(jwt.verify)(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);


    // create new access token
    console.log(decodedToken);
    const userId = decodedToken.userId

    const freshUser = await User.findById(decodedToken.userId);

    if (!freshUser) {
        return next(new AppError("The user belonging to this token does no longer exist!", 401));
    }

    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })


    res.status(200).json({
        status: 'success',
        accessToken
    })
})

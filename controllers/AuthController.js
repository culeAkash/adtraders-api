const User = require("../models/UserModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");

const jwt = require('jsonwebtoken')
const { promisify } = require('util')


const signtoken = (userId, secret, expire) => {
    return jwt.sign({ userId }, secret, {
        expiresIn: expire
    });
}



exports.login = catchAsync(async (req, res, next) => {
    // extract email and password from body if not present error
    const { email, password } = req.body;

    if (!email || !password)
        return next(new AppError('Email and password are required', 400));


    // check if user exists with that email

    const user = await User.findOne({ email: email }).select("+password")

    if (!user)
        return next(new AppError(`No user present with given email`, 401))


    // check for password
    // console.log(await user.comparePassword(password, user.password));
    if (!await user.comparePassword(password, user.password))
        return next(new AppError("Password is incorrect", 401));

    const userId = user._id;

    // create token
    const accessToken = signtoken(userId, process.env.JWT_SECRET_KEY, process.env.JWT_EXPIRES_IN);

    //create refresh token
    const refreshToken = signtoken(userId, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, process.env.JWT_REFRESH_TOKEN_EXPIRES_IN);

    user.refreshToken = refreshToken;

    const result = await user.save();

    console.log(result);

    // console.log(accessToken);

    //save the access token to secure cookie
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        status: 'success',
        accessToken
    })
})


exports.authenticate = catchAsync(async (req, res, next) => {


    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }


    if (!token) {
        return next(new AppError('You are not logged in, Please login using credentials', 401));
    }


    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);


    console.log(decodedToken.userId);


    const freshUser = User.findById(decodedToken.userId);


    req.user = freshUser

    next();


})



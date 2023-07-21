const User = require("../models/UserModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");

const jwt = require('jsonwebtoken')
const { promisify } = require('util')


const signtoken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}


const generateTokenAndCookie = (user, res) => {

    // cookie options

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true
    }

    const accessToken = signtoken(user._id);

    res.cookie("accessToken", accessToken, cookieOptions);

    user.password = undefined;

    return accessToken;
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

    // create token
    let accessToken = generateTokenAndCookie(user, res);

    // console.log(accessToken);

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



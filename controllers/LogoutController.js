const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");


const User = require('../models/UserModel')



exports.logoutHandler = catchAsync(async (req, res, next) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) return next(new AppError("Can't logout if not logged in", 204));

    const refreshToken = cookies.jwt

    const user = await User.findOne({ refreshToken })

    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.status(204).json({
            status: 'success'
        })
    }

    // Delete token from db
    user.refreshToken = ""
    const result = await user.save()

    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true
    })
    res.status(204).json({
        status: 'logout successful'
    })

})




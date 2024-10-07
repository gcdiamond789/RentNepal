//create and send token and save in cookie
const sendToken = (user, statusCode, message, res) => {

    //create jwt token
    const token = user.getJwtToken();

    //options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        path:"/"
    }
    


    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user,
        message
    })


}

module.exports = sendToken;
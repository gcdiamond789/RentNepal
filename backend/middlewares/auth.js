const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next) => {

    const {token} = req.cookies;
    

    if (!token){
        return next(new ErrorHandler("Please login to view the resources", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
 

    const user = await User.findById(decoded.id);
   
    req.user = user

    next()

    
}
)

exports.authorizedRoles = (...roles) =>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access`, 403)
                );
        }
        next()
    }
}


const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary')

//Register a user
exports.registerUser = catchAsyncErrors( async(req, res, next) => {
    

    const {name, email, password, avatar} = req.body;

    //whether user enterd email and password
    if(!email || !password || !name){
        return next(new ErrorHandler('Please enter name, email, and password properly', 400));
    }

   
    let avatarData = {
        public_id: 'RentNepal/Users/a7ut3k78rsrbjajtaxf1', // Set a default public_id
        url: 'https://res.cloudinary.com/ddeanc2do/image/upload/v1727412929/RentNepal/Users/a7ut3k78rsrbjajtaxf1.png' // Set a default URL
    };


    if (avatar) {
        const result = await cloudinary.v2.uploader.upload(avatar, {
            folder: "RentNepal/Users",
            width: 150,
            crop: "scale"
        });
        avatarData = {
            public_id: result.public_id,
            url: result.secure_url
        };
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar: avatarData
    })

    sendToken(user, 200, "", res)

    
}
)

//login based on user email and password
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const {email, password} = req.body;

    //whether user enterd email and password
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    //finding user in our database
    const user = await User.findOne({email}).select('+password')

    if (!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }



    sendToken(user, 200, "", res)
})


//logout user
exports.logout = catchAsyncErrors( async(req, res, next) => {

    const options = {
        expires: new Date(Date.now() + 10000),
        httpOnly: true,
        secure: true,
        path:"/"        }

    await res.cookie('token', null, options)

    res.status(200).json({
        success: true,
        message: "logout succesful"
    })
})



// gives the user their own information
exports.userProfile = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//change the password
exports.changePassword = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //confirm the old password
    const currentPassword = req.body.currentPassword;
    
    const status = await user.comparePassword(currentPassword);

    if (!status){
        const message = "Your current password doesn't match with the entered password.";
        return next(new ErrorHandler(message, 401));
    }

    //compare two entered password
    if(req.body.newPassword !== req.body.confirmNewPassword){
        const message = "Your new passwords doesn't match with each other.";
        return next(new ErrorHandler(message, 402))
    }

    user.password = req.body.newPassword;
    await user.save()
    sendToken(user,200 ,"Password Updated Successfully", res)

    

})

//update the user name and email address
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
    const userNewData = req.body;
    
    let user = User.findById(req.user.id);
    
    userNewData.email = userNewData.email || user.email;
    userNewData.name = userNewData.name || user.name;

    user = await User.findByIdAndUpdate(req.user.id, userNewData, {
        new: true,
        runValidators: true
    })
    
    res.status(200).json({
        success: true,
        message: "User profile updated."
    })
})

//get all the users with details
exports.getAllUsers = catchAsyncErrors( async(req, res, next) => {
    const users = await User.find();
    const UsersCount = await User.countDocuments();

    res.status(200).json({
        success: true,
        UsersCount,
        users
    })
})

//get specific user details
exports.getUser = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHandler(`User not found with given id ${req.params.id}.`, 404));
    }

    res.status(200).json({
        success: true,
        user
    })
})

//update the user information like role name email
exports.updateUser = catchAsyncErrors( async(req, res, next) => {
    let user = await User.findById(req.params.id);
    if (!user){
        return next(new ErrorHandler(`User not found with id ${req.params.id}.`, 404))
    }

    const newData = req.body;
    newData.email = newData.email || user.email;
    newData.name = newData.name || user.name;
    newData.role = newData.role || user.role;

    user = await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
})


//delete the user from the database
exports.deleteUser = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with id ${req.params.id}`, 404));
    }


    res.status(200).json({
        success: true,
        user
    })

})
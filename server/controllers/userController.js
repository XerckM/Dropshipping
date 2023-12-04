const User = require('../models/userModel');

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const { validateId } = require("../utils/validateId");

const createUser = asyncHandler(async (req, res) => {
    console.log('Register route hit');
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists");
    }
});

const loginUser = asyncHandler(async (req,res) => {
    console.log('Login route hit');
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    console.log('Logout route hit');
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        res.sendStatus(204);

    }
    await User.findOneAndUpdate({ refreshToken: refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    })
    res.sendStatus(204);
});

const handleRefreshToken = asyncHandler(async (req, res) => {
    console.log('Refreshing Token');
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token In Cookies");
    const user = await User.findOne({ refreshToken });
    if(!user) throw new Error("Invalid Refresh Token");
    jwt.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is an error in refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});

const updateUser = asyncHandler(async (req, res) => {
    console.log("Update route hit");
    const { _id } = req.user;
    validateId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    console.log('Get All Users route hit');
    try {
        const getAllUsers = await User.find();
        res.json(getAllUsers);
    } catch (error) {
        throw new Error(error)
    }
});

const getUser = asyncHandler(async (req, res) => {
    console.log('Get User route hit');
    const { id } = req.params;
    validateId(id);
    try {
        const getUser = await User.findById(id);
        res.json({
            getUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    console.log('Delete User route hit');
    const { id } = req.params;
    validateId(id);
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({
            deleteUser,
            message: "User Successfully Deleted"
        });
    } catch (error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    console.log('Block User route hit');
    const { id } = req.params;
    validateId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id, 
            {
                isBlocked: true
            },
            {
                new: true
            }
        );
        res.json({
            message: "User Blocked"
        });
    } catch (error) {
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async (req, res) => {
    console.log('Unblock User route hit');
    const { id } = req.params;
    validateId(id);
    try {
        const unblock = await User.findByIdAndUpdate(
            id, 
            {
                isBlocked: false
            },
            {
                new: true
            }
        );
        res.json({
            message: "User Unblocked"
        });
    } catch (error) {
        throw new Error(error);
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    console.log('Update Password route hit');
    const { _id } = req.user;
    const { password } = req.body;
    validateId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatePassword = await user.save();
        res.json(updatePassword);
    } else {
        res.json(user);
    }
});

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    handleRefreshToken,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,
    blockUser,
    unblockUser,
    updatePassword
};
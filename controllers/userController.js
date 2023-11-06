import User from "../models/users.js"
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
export const getAllUsers = async (req, res) => {

}

export const getMyUser = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    })
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 400))
        const hashedPass = await bcrypt.hash(password, 9);
        user = await User.create({ name, email, password: hashedPass });
        setCookie(user, res, 201, "Registered Successfully");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("User not found!", 400))
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) return next(new ErrorHandler("Invalid Password", 404))
        setCookie(user, res, 200, `Welcome ${name}`)

    } catch (error) {
        next(error);
    }

}

export const logout = (req, res) => {
    res.status(200).cookie(
        "token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    }
    ).json({
        success: true,
        message: 'You have been logged out'
    })
}
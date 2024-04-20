const bcrypt = require("bcrypt");
const User = require("../Models/userModel.js");
const jwtProvider = require("../Configs/jwtProvider.js");

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("User already exists with this email");
        }

        password = await bcrypt.hash(password, 8);
        const user = await User.create({ firstName, lastName, email, password });

        console.log("Created user:", user);
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with this email");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByIdentifier = async (identifier) => {
    try {
        const user = await User.findOne({ $or: [{ email: identifier }, { _id: identifier }] });

        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
}


const getUserProfileByToken = async (token) => {
    try {
        const user = await jwtProvider.getUserIdFromToken(token);
        if (!user) {
            throw new Error("Invalid token or token does not contain user ID");
        }
        return user;
    } catch (error) {
        throw error;
    }
}


const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser, getUserByIdentifier, getUserProfileByToken, getAllUsers, getUserByEmail };

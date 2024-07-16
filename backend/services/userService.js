// import bcrypt from "bcryptjs";
// import createToken from "../utils/createToken.js";
// import userRepository from "../repositories/userRepository.js";
// import User from "../models/userModel.js";
const userRepository = require('../repositories/userRepository');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');

const registerUser = async () => {

    // Tạo mới user
    if (!username || !email || !password) {
        throw new Error("Please fill all the inputs.");
    }

    const userExists = await userRepository.findUserByEmail(email);
    if (userExists)
        throw new Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userRepository.createUser({ username, email, password: hashedPassword });

    try {
        const savedUser = await userRepository.saveUser(newUser);
        const token = createToken(res, newUser._id);

        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            isStaff: newUser.isStaff,
            isManager: newUser.isManager,
        };
    } catch (error) {
        throw new Error("Invalid user data");
    }
};

const createUser = async (userData) => {
};


const updateUserProfile = async (userId, userData) => {
    // Cập nhật thông tin user
    const updatedUser = await userRepo.updateUser(userId, userData);
    return updatedUser;
};

const deleteUserAccount = async (userId) => {
    // Xóa user
    await userRepo.deleteUser(userId);
};

const getAllUsers = async () => {
    // Lấy danh sách tất cả user
    const users = await userRepo.getAllUsers();
    return users;
};

const getUserById = async (userId) => {
    // Lấy thông tin user theo id
    const user = await userRepo.findUserById(userId);
    return user;
};

const userServices = {
    registerUser,
    createUser,
    updateUserProfile,
    deleteUserAccount,
    getAllUsers,
    getUserById,
};

export default userServices;


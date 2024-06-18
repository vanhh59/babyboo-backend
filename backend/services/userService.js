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
        res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        return;
    }
    // Kiểm tra xem email đã tồn tại trong hệ thống chưa
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) res.status(400).json({ message: "Email đã tồn tại" });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const userData = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
    });

    try {
        await userData.save();
        createToken(res, userData._id);

        res.status(201).json({
            _id: userData._id,
            username: userData.username,
            email: userData.email,
            isAdmin: userData.isAdmin,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
        throw new Error("Không thể tạo tài khoản");
    }

    // Tạo mới user

};

const createUser = async (userData) => {
};

const loginUser = async (userData) => {
    // Đăng nhập
    const { email, password } = userData;

    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            createToken(res, existingUser._id);

            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
        } else {
            res.status(400).json({ message: "Mật khẩu không chính xác" });
        }
    } else {
        res.status(404).json({ message: "Email không tồn tại" });
    }
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
    loginUser,
    updateUserProfile,
    deleteUserAccount,
    getAllUsers,
    getUserById,
};

// export default userServices;
module.exports = userServices;


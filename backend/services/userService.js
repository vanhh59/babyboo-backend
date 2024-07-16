import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import userRepository from "../repositories/userRepository.js";
import User from "../models/userModel.js";

const registerUser = async () => {

    // Tạo mới user
    if (!username || !email || !password) {
        throw new Error("Vui lòng nhập đầy đủ thông tin");
    }
    // Kiểm tra xem email đã tồn tại trong hệ thống chưa
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
        res.status(400).send("User already exists") && console.log("User already exists");
    }
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
            isStaff: userData.isStaff,
            isManager: userData.isManager,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
        throw new Error("Invalid user data");
    }

    // Tạo mới user

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

// export default userServices;
module.exports = userServices;


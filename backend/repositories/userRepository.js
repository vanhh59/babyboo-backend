import User from "../models/userModel.js";

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}; // Tìm user theo email

const createUser = async (userData) => {
    return await User.create(userData);
}; // Tạo mới user

const updateUser = async (userId, userData) => {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
}; // Cập nhật thông tin user

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
}; // Xóa user

const getAllUsers = async () => {
    return await User.find({});
}; // Lấy danh sách tất cả user

const findUserById = async (userId) => {
    return await User.findById(userId);
}; // Tìm user theo id


export {
    findUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    findUserById,
};
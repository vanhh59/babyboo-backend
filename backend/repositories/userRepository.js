import User from "../models/userModel.js";

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}; // Tìm user theo email

const createUser = async (userData) => {
    const newUser = new User(userData);
    return await User.create(userData);
}; // Tạo mới user

const saveUser = async (newUser) => {
    try {
        return await newUser.save();
    } catch (error) {
        throw new Error("Error saving user data");
    }
}; // Lưu thông tin user

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

const userRepository = {
    findUserByEmail,
    saveUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    findUserById,
};

export default userRepository;
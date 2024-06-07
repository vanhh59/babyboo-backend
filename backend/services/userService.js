import * as userRepo from "../repository/userRepo.js";
import * as bcrypt from "bcryptjs";
import * as createToken from "../utils/createToken.js";

const registerUser = async () => {

    if (!username || !email || !password) {
        res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        return;
    }
    // Kiểm tra xem email đã tồn tại trong hệ thống chưa
    const existingUser = await userRepo.findUserByEmail(userData.email);
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

export {
    registerUser,
    updateUserProfile,
    deleteUserAccount,
    getAllUsers,
    getUserById,
};
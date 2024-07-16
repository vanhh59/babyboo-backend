import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import userRepository from "../repositories/userRepository.js";

const registerUser = async (username, email, password, res) => {
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

const loginUser = async (email, password, res) => {
    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            createToken(res, existingUser._id);

            return {
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
                isStaff: existingUser.isStaff,
                isManager: existingUser.isManager,
            };
        } else {
            throw new Error("Invalid password");
        }
    } else {
        throw new Error("User not found !");
    }
};

const logoutCurrentUser = async (res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
    });

    return "Logged out successfully";
};

const getAllUsers = async () => {
    const users = await userRepository.getAllUsers();
    return users;
};

const getCurrentUserProfile = async (req) => {
    const user = await userRepository.findUserById(req.user._id);

    if (user) {
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            isStaff: user.isStaff,
            isManager: user.isManager,
        };
    } else {
        throw new Error("User not found.");
    }
};

const userServices = {
    registerUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
};

export default userServices;
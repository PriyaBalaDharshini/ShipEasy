import userModel from "../models/userModel.js"
import passwordHash from "../helper/passwordHash.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


/* Registration */
const registerUser = async (req, res) => {
    try {
        const { fullName, email, age, country, address, password } = req.body;

        //Checking for the existance of name
        const checkFullname = await userModel.findOne({ fullName });
        if (checkFullname) {
            return res.status(400).json({ message: "Name already exists" })
        }

        //Checking for the existance of email
        const checkEmail = await userModel.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        //password hashing
        const hashedPassword = await passwordHash.createHash(password)

        const newUser = new userModel({
            fullName, email, age, country, address, password: hashedPassword
        })
        await newUser.save()

        res.status(200).json({ message: "User Created Successfully", newUser })
    } catch (error) {
        res.status(500).json({ message: "Error  registering user", error })
    }
}

//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        // Check if the email exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email does not exist. Please register" });
        }

        // Compare the provided password with the hashed password
        const passwordCompare = await passwordHash.hashCompare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role }, //// Payload: user data to encode
            process.env.JWT_SECRET, // Secret key for signing the token
            { expiresIn: "1h" } // Token expiration time
        )
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

//Get All users
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Details fetched successfully", allUsers })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

//Delete user

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export default {
    registerUser,
    login,
    getAllUsers,
    deleteUser
}
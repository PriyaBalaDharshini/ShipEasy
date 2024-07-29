import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    country: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: Number, default: 0 },
    role: { type: String, default: "user" },
},
    { timestamp: true }
)

const userModel = mongoose.model("User", userSchema);
export default userModel;
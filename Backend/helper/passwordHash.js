import bcrypt from "bcrypt"


const SALT = 8;

const createHash = async (data) => {
    let salt = await bcrypt.genSalt(SALT);
    let hash = await bcrypt.hash(data, salt);
    return hash;
}

const hashCompare = async (data, hash) => {
    return bcrypt.compare(data, hash)
}

export default { createHash, hashCompare }
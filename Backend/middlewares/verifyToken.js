import jwt from "jsonwebtoken";

// Middleware to verify the token
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Correctly using the Authorization header

    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Extract the token from the Bearer token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Token is not valid" });
            req.user = user; // Attach user info to the request
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        return res.status(401).json({ message: "You are not authenticated" });
    }
};

// Middleware to verify token and user authorization
export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            res.status(403).json({ message: "You are not permitted to do this operation" });
        }
    });
};

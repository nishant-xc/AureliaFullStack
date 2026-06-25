import { verifyAccessToken } from "../utils/jwt.js";

export async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,

                message: "Authorization header missing",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,

                message: "Token missing",
            });
        }

        const decoded = verifyAccessToken(token);

        req.user = {
            id: decoded.id,

            email: decoded.email,

            role: decoded.role,
        };

        next();
    } catch {
        return res.status(401).json({
            success: false,

            message: "Invalid or expired token",
        });
    }
}

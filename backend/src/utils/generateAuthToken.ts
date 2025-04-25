import jwt from "jsonwebtoken";
import serverConfig from "../config/serverConfig";

export function generateTokenAndSetCookie(userId: string, res: any) {
    if (!serverConfig.JWT_SECRET_TOKEN) {
        throw new Error("JWT_SECRET_TOKEN is not defined in environment variables");
    }
    
    const token = jwt.sign({ userId }, serverConfig.JWT_SECRET_TOKEN, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds conversion
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: serverConfig.NODE_ENV !== "development",
    });
};
import dotenv from "dotenv";
dotenv.config();

export default {
    PORT : process.env.PORT || 3000,
    NODE_ENV : process.env.NODE_ENV || "development",
    AUTH_TOKEN : process.env.AUTH_TOKEN,
    JWT_SECRET_TOKEN : process.env.JWT_SECRET_TOKEN,
}
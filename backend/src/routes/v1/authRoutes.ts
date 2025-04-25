import express from "express";

import authController from "../../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", authController.logIn);

authRouter.post("/signup", authController.signUp);

authRouter.post("/logout", authController.logOut);

export default authRouter;
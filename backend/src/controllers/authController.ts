import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { AuthService } from "../services/authService";
import { AuthRepository } from "../repositories/authRepository";
import { generateTokenAndSetCookie } from "../utils/generateAuthToken";

const authService = new AuthService(new AuthRepository());

async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        // signup a new user
        const newUser = await authService.signUp(req.body);

        // generate JWT token
        generateTokenAndSetCookie(newUser.id, res);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User Signed Up",
            error: {},
            data: newUser
        });
    } catch (error) {
        next(error);
    }
}

async function logIn(req: Request, res: Response, next: NextFunction) {
    try {
        // login an existing user
        const loginUser = await authService.logIn(req.body);

        // generate JWT token
        generateTokenAndSetCookie(loginUser.id, res);

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "User Logged In",
            error: {},
            data: loginUser
        });
    } catch (error) {
        next(error);
    }
}

async function logOut(req: Request, res: Response, next: NextFunction) {
    try {
        const logoutUser = authService.logOut();

        res.cookie("jwt", "", { maxAge: 0 });

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User Logged Out",
            error: {},
            data: logoutUser
        });
    } catch (error) {
        next(error);
    }
}

export default {
    logIn,
    signUp,
    logOut
}
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { ProfileService } from "../services/profileService";
import { ProfileRepository } from "../repositories/profileRepository";
import { BadRequestError } from "../errors/BadRequestError";

const profileService = new ProfileService(new ProfileRepository());

async function getUserProfileDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.body;
        if(!userId) {
            throw new BadRequestError("userId", "userId not passed!");
        }

        const userData = await profileService.getUserProfile(userId);
        return res.status(StatusCodes.ACCEPTED).json({
            status: true,
            message: "User Profile Details have been retrieved!",
            error: {},
            data: userData
        });
    } catch(error) {
        next(error);
    }
}

async function updateUserProfileDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, name, email, gender } = req.body;
        if(!userId) {
            throw new BadRequestError("userId", "userId not passed!");
        }

        const updatedData = await profileService.updateUserProfile(userId, name, gender, email);
        return res.status(StatusCodes.ACCEPTED).json({
            status: true,
            message: "User Profile Details have been updated!",
            error: {},
            data: updatedData
        });
    } catch(error) {
        next(error);
    }
}

export default {
    getUserProfileDetails,
    updateUserProfileDetails
}

import { Request, Response, NextFunction, json } from "express";
import { StatusCodes } from "http-status-codes";

import { ActivityService } from "../services/activityService";
import { ActivityRepository } from "../repositories/activityRepository";
import { BadRequestError } from "../errors/BadRequestError";

const activityRepository = new ActivityRepository();
const activityService = new ActivityService(activityRepository);

async function getActivities(req: Request, res: Response, next: NextFunction) {
    try {
        // Predefined activities (shown in the dropdown in the frontend search bar)
        const activityLogs = await activityService.getActivities();
        return res.status(StatusCodes.OK).json({
            status: true,
            message: "Retrieved all predefined activity logs!",
            error: {},
            data: activityLogs
        });
    } catch (error) {
        next(error);
    }
}

async function logNewActivity(req: Request, res: Response, next: NextFunction) {
    try {
        // User Logged Activities (showed in the box besides the search bar, showing the user's daily activities)
        const { id, user_id, activity_id, metrics } = req.body;
        if (!id || !user_id || !activity_id) {
            throw new BadRequestError("ID or UserID or ActivityID", {
                errorMessage: "ID or UserID or ActivityID is missing!",
                data: {
                    id,
                    user_id,
                    activity_id
                }
            });
        }

        const newActivity = await activityService.logNewActivity(id, user_id, activity_id, metrics);
        return res.status(StatusCodes.ACCEPTED).json({
            status: true,
            message: "Added the new user activity",
            error: {},
            data: newActivity
        });
    } catch (error) {
        next(error);
    }
}

async function getUserActivityLogs(req: Request, res: Response, next: NextFunction) {
    try {
        // write the logic to return user's day activity logs and total carbon emission done (this is for the log box)
        const { user_id } = req.body;
        const userActivityLogs = await activityService.getUserActivityLogs(user_id)

        return res.status(StatusCodes.ACCEPTED).json({
            status: true,
            message: "Fetched the user's daily activity logs",
            error: {},
            data: userActivityLogs
        });
    } catch (error) {
        next(error)
    }
}

export default {
    getActivities,
    logNewActivity,
    getUserActivityLogs
}
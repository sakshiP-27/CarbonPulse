import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getActivities(req: Request, res: Response) {
    // TODO: write the logic to add predefined activities over here (this show the activities in the dropdown)

    return res.status(StatusCodes.OK).json({
        status: true,
        message: "Retrieved all predefined activity logs!",
        error: {},
        // data: activityLogs
    });
}

function logNewActivity(req: Request, res: Response) {
    // TODO: write the logic to feed the user's activity log (this is for search bar)

    return res.status(StatusCodes.ACCEPTED).json({
        status: true,
        message: "Added the new user activity",
        error: {},
        // data: newActivity
    });
}

function getUserActivityLogs(req: Request, res: Response) {
    // TODO: write the logic to return user's day activity logs and total carbon emmission done (this is for the log box)

    return res.status(StatusCodes.ACCEPTED).json({
        status: true,
        message: "Fetched the user's daily activity logs",
        error: {},
        // data: userActivityLogs
    });
}

export default {
    getActivities,
    logNewActivity,
    getUserActivityLogs
}
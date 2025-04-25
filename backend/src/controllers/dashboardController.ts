import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { DashboardService } from "../services/dashboardService";
import { DashboardRepository } from "../repositories/dashboardRepository";

const dashboardService = new DashboardService(new DashboardRepository());

async function showDataDashboard(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.body;

        const userDashboardData = await dashboardService.showDashboardData(userId);
        
        return res.status(StatusCodes.OK).json({
            status: true,
            message: "Dashboard Data fetched!",
            error: {},
            data: userDashboardData
        });
    } catch(error) {
        next(error);
    }
}

export default {
    showDataDashboard
}
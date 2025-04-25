import dbClient from "../config/dbConfig";
import { BadRequestError } from "../errors/BadRequestError";

export class ActivityRepository {
    private prismaClient: any;

    constructor() {
        this.prismaClient = dbClient();
    }

    async getActivities() {
        try {
            const activities = await this.prismaClient.activity.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                }
            });
            return activities;
        } catch (error) {
            throw new Error("Error Fetching Activities!");
        }
    }

    async logNewActivity(user_id: string, activity_id: string, carbon_footprint: number) {
        try {
            // Validate that the IDs are valid numbers
            const userId = parseInt(user_id);
            const activityId = parseInt(activity_id);
            
            if (isNaN(userId) || isNaN(activityId)) {
                throw new BadRequestError(user_id ? user_id : activity_id, {
                    errorMessage: "UserID or ActivityID sent is invalid"
                });
            }

            const newUserActivity = await this.prismaClient.userActivity.create({
                data: {
                    user_id: userId,
                    activity_id: activityId,
                    carbon_footprint: carbon_footprint
                },
                include: {
                    user: true,
                    activity: true
                }
            });
            return newUserActivity;
        } catch (error: any) {
            if (error.code === 'P2003') {
                throw new Error("User or activity not found");
            }
            throw new Error("Error logging new activity: " + error.message);
        }
    }

    async getUserActivityLogs(user_id: string) {
        try {
            const userId = parseInt(user_id);

            if (isNaN(userId)) {
                throw new BadRequestError(user_id, {
                    errorMessage: "UserID sent is invalid!"
                });
            }

            // Get start and end of current day
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            const endOfDay = new Date(today.setHours(23, 59, 59, 999));

            const userActivityLogs = await this.prismaClient.userActivity.findMany({
                where: {
                    user_id: userId,
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                },
                include: {
                    activity: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            carbon_footprint: true,
                            createdAt: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return userActivityLogs;
        } catch (error: any) {
            if (error.code === 'P2003') {
                throw new Error("User not found");
            }
            throw new Error("Error fetching user activity logs: " + error.message);
        }
    }
}
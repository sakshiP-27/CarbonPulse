import dbClient from "../config/dbConfig";
import { InternalServerError } from "../errors/InternalServerError";

export class DashboardRepository {
    private prismaClient: any;

    constructor() {
        this.prismaClient = dbClient();
    }

    async getTopFiveActivities(userID: number) {
        try {
            const topFiveActivities = await this.prismaClient.userActivity.findMany({
                where: {
                    user_id: userID
                },
                orderBy: {
                    carbon_footprint: 'desc'
                },
                take: 5,
                include: {
                    activity: true
                }
            });

            return topFiveActivities;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Can't fetch top 5 activities, some internal issue occurred!",
                errorDetails: error
            });
        }
    }

    async getTodayActivities(userID: number) {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const todayActivities = await this.prismaClient.userActivity.findMany({
                where: {
                    user_id: userID,
                    createdAt: {
                        gte: today
                    }
                },
                include: {
                    activity: true
                }
            });
            
            return todayActivities;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Can't fetch today's activities, some internal issue occurred!",
                errorDetails: error
            });
        }
    }

    async savePrediction(userID: number, predictedFootprint: number) {
        try {
            const prediction = await this.prismaClient.prediction.create({
                data: {
                    predicted_footprint: predictedFootprint,
                    user_id: userID
                }
            });
            
            return prediction;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Can't save prediction, some internal issue occurred!",
                errorDetails: error
            });
        }
    }

    async saveRecommendation(userID: number, title: string, description: string, carbonFootprint: number) {
        try {
            const recommendation = await this.prismaClient.recommendation.create({
                data: {
                    title,
                    description,
                    carbon_footprint: carbonFootprint,
                    user_id: userID
                }
            });
            
            return recommendation;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Can't save recommendation, some internal issue occurred!",
                errorDetails: error
            });
        }
    }
}
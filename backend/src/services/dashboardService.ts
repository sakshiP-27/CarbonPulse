import axios from "axios";

import { DashboardRepository } from "../repositories/dashboardRepository";
import { InternalServerError } from "../errors/InternalServerError";
import serverConfig from "../config/serverConfig";

export class DashboardService {
    private dashboardRepository: DashboardRepository;

    constructor(dashboardRepository: DashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    async showDashboardData(userId: string) {
        try {
            const userID: number = parseInt(userId);

            // Get the top 5 user activities
            const top5_activities = await this.dashboardRepository.getTopFiveActivities(userID);

            const topFiveActivities = {
                activities: top5_activities.map((activity: any) => ({
                    title: activity.activity.title,
                    carbon_footprint: activity.carbon_footprint
                }))
            };

            // 1. From the database get all the activities that happened today
            const todayActivities = await this.dashboardRepository.getTodayActivities(userID);
            
            // 2. Call the ML Model APIs for getting the prediction
            const predictionData = await this.getPrediction(todayActivities);
            
            // 3. Call the ML Model APIs for getting the recommendation
            const recommendationData = await this.getRecommendation(todayActivities);
            
            // 4. Store these prediction & recommendation in Database
            const prediction = await this.dashboardRepository.savePrediction(
                userID,
                predictionData.predicted_footprint
            );
            
            const recommendation = await this.dashboardRepository.saveRecommendation(
                userID,
                recommendationData.title,
                recommendationData.description,
                recommendationData.carbon_footprint
            );
            
            // 5. Send these prediction & recommendation to controller
            return {
                topFiveActivities,
                todayActivities,
                prediction,
                recommendation
            };
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Dashboard details not retrieved, some internal error occurred",
                errorDetails: error
            });
        }
    }

    // Helper methods to call ML APIs
    private async getPrediction(activities: any[]): Promise<any> {
        try {
            const response = await axios.post(`${serverConfig.ML_SERVICE_URL}/predict`, {
                activities: activities.map(activity => ({
                    activity_id: activity.activity_id,
                    carbon_footprint: activity.carbon_footprint,
                    type: activity.activity.type
                }))
            });
            
            return response.data;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Failed to get prediction from ML model",
                errorDetails: error
            });
        }
    }

    private async getRecommendation(activities: any[]): Promise<any> {
        try {
            const response = await axios.post(`${serverConfig.ML_SERVICE_URL}/recommend`, {
                activities: activities.map(activity => ({
                    activity_id: activity.activity_id,
                    carbon_footprint: activity.carbon_footprint,
                    title: activity.activity.title,
                    type: activity.activity.type
                }))
            });
            
            return response.data;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Failed to get recommendation from ML model",
                errorDetails: error
            });
        }
    }
}
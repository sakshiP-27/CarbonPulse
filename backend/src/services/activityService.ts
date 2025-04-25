import axios from "axios";

import { ActivityRepository } from "../repositories/activityRepository";
import { InternalServerError } from "../errors/InternalServerError";
import { PredefinedActivity } from "../types/predefinedActivity";
import { activityMappings } from "../config/estimatesConfig";
import serverConfig from "../config/serverConfig";

export class ActivityService {
    private activityRepository: ActivityRepository;
    private carbonApiClient;

    constructor(activityRepository: ActivityRepository) {
        this.activityRepository = activityRepository;
        
        // Create a configured axios instance for Carbon Interface API
        this.carbonApiClient = axios.create({
            baseURL: 'https://www.carboninterface.com/api/v1',
            headers: {
                'Authorization': `Bearer ${serverConfig.AUTH_TOKEN}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000 // 10 seconds timeout
        });
    }

    async getActivities(): Promise<Array<PredefinedActivity>> {
        try {
            const activities = await this.activityRepository.getActivities();
            return activities;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Error Fetching Activities!",
                detail: error
            });
        }
    }

    async logNewActivity(id: string, user_id: string, activity_id: string, metrics: object): Promise<any> {
        try {
            const activityId: number = parseInt(activity_id);
            let carbonFootprint: number = 0;

            if (activityId === 1) { // Using Air Conditioner
                const activity_data = activityMappings[1];
                
                // preparing metadata
                const activity_type: string = activity_data.type;
                const electricity_unit: string = activity_data.electricity_unit;
                const country: string = activity_data.country;
                const average_units: number = activity_data.per_hour_units;
                const duration: number = (metrics as any).duration;

                const units_consumed: number = average_units/60 * duration;
                carbonFootprint = await this.getElectricityCarbonFootprint(
                    activity_type, 
                    electricity_unit, 
                    country, 
                    units_consumed
                );
            } else if (activityId === 2) { // Using Fan
                const activity_data = activityMappings[2];
                
                // preparing metadata
                const activity_type: string = activity_data.type;
                const electricity_unit: string = activity_data.electricity_unit;
                const country: string = activity_data.country;
                const average_units: number = activity_data.per_hour_units;
                const duration: number = (metrics as any).duration;

                const units_consumed: number = average_units/60 * duration;
                carbonFootprint = await this.getElectricityCarbonFootprint(
                    activity_type, 
                    electricity_unit, 
                    country, 
                    units_consumed
                );
            } else if (activityId === 3) { // Using Washing Machine
                const activity_data = activityMappings[3];
                
                // preparing metadata
                const activity_type: string = activity_data.type;
                const electricity_unit: string = activity_data.electricity_unit;
                const country: string = activity_data.country;
                const average_units: number = activity_data.per_hour_units;
                const duration: number = (metrics as any).duration;

                const units_consumed: number = average_units/60 * duration;
                carbonFootprint = await this.getElectricityCarbonFootprint(
                    activity_type, 
                    electricity_unit, 
                    country, 
                    units_consumed
                );
            } else if (activityId === 4) { // Using Microwave Oven
                const activity_data = activityMappings[4];
                
                // preparing metadata
                const activity_type: string = activity_data.type;
                const electricity_unit: string = activity_data.electricity_unit;
                const country: string = activity_data.country;
                const average_units: number = activity_data.per_hour_units;
                const duration: number = (metrics as any).duration;

                const units_consumed: number = average_units/60 * duration;
                carbonFootprint = await this.getElectricityCarbonFootprint(
                    activity_type, 
                    electricity_unit, 
                    country, 
                    units_consumed
                );
            } else if (activityId === 5) { // Using Light Bulb / Lights
                const activity_data = activityMappings[5];
                
                // preparing metadata
                const activity_type: string = activity_data.type;
                const electricity_unit: string = activity_data.electricity_unit;
                const country: string = activity_data.country;
                const average_units: number = activity_data.per_hour_units;
                const duration: number = (metrics as any).duration;

                const units_consumed: number = average_units/60 * duration;
                carbonFootprint = await this.getElectricityCarbonFootprint(
                    activity_type, 
                    electricity_unit, 
                    country, 
                    units_consumed
                );
            } else if (activityId === 6) { // Traveling using a Car
                const activity_data = activityMappings[6];

                // preparing metadata
                const activity_type: string = activity_data.type;
                const distance_unit: string = activity_data.distance_unit;
                const vehicle_model_id: string = activity_data.vehicle_model_id;
                const distance: number = (metrics as any).distance;
                
                carbonFootprint = await this.getVehicleCarbonFootprint(
                    activity_type, 
                    distance_unit, 
                    vehicle_model_id, 
                    distance
                );
            } else if (activityId === 7) { // Taking a Flight
                const activity_data = activityMappings[7];

                // preparing metadata
                const activity_type: string = activity_data.type;
                const distance_unit: string = activity_data.distance_unit;
                const passengers: number = activity_data.passengers;
                const flight_from: string = (metrics as any).flight_from;
                const flight_to: string = (metrics as any).flight_to;

                carbonFootprint = await this.getFlightCarbonFootprint(
                    activity_type, 
                    passengers, 
                    distance_unit, 
                    flight_from, 
                    flight_to
                );
            }

            const newActivity = await this.activityRepository.logNewActivity(
                user_id, 
                activity_id, 
                carbonFootprint
            );

            if (!newActivity) {
                throw new InternalServerError({
                    errorMessage: "New Activity not inserted into the Database!",
                    data: {
                        Id: id,
                        UserId: user_id,
                        ActivityId: activity_id
                    },
                    activity: newActivity
                });
            }
            return newActivity;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Error while logging the new activity!",
                data: {
                    Id: id,
                    UserId: user_id,
                    ActivityId: activity_id
                },
                detail: error
            });
        }
    }

    async getUserActivityLogs(user_id: string): Promise<Array<any>> {
        try {
            const userActivityLogs = await this.activityRepository.getUserActivityLogs(user_id);

            if (!userActivityLogs) {
                return [];
            }
            return userActivityLogs;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "Error while fetching the user logs",
                detail: error
            });
        }
    }

    async getElectricityCarbonFootprint(
        activityType: string, 
        electricityUnit: string, 
        country: string, 
        electricityUnits: number
    ): Promise<number> {
        try {
            const response = await this.carbonApiClient.post('/estimates', {
                type: activityType,
                electricity_unit: electricityUnit,
                electricity_value: electricityUnits,
                country: country
            });
            
            return response.data.data.attributes.carbon_kg;
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new InternalServerError({
                    errorMessage: `Error calculating carbon footprint: ${error.response.status}`,
                    detail: error.response.data
                });
            } else if (error.request) {
                // The request was made but no response was received
                throw new InternalServerError({
                    errorMessage: "Error calculating carbon footprint: No response received",
                    detail: error.request
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new InternalServerError({
                    errorMessage: "Error calculating carbon footprint",
                    detail: error.message
                });
            }
        }
    }

    async getVehicleCarbonFootprint(
        activityType: string, 
        distanceUnit: string, 
        vehicleModelId: string, 
        distance: number
    ): Promise<number> {
        try {
            const response = await this.carbonApiClient.post('/estimates', {
                type: activityType,
                distance_unit: distanceUnit,
                distance_value: distance,
                vehicle_model_id: vehicleModelId
            });
            
            return response.data.data.attributes.carbon_kg;
        } catch (error: any) {
            if (error.response) {
                throw new InternalServerError({
                    errorMessage: `Error calculating vehicle carbon footprint: ${error.response.status}`,
                    detail: error.response.data
                });
            } else if (error.request) {
                throw new InternalServerError({
                    errorMessage: "Error calculating vehicle carbon footprint: No response received",
                    detail: error.request
                });
            } else {
                throw new InternalServerError({
                    errorMessage: "Error calculating vehicle carbon footprint",
                    detail: error.message
                });
            }
        }
    }

    async getFlightCarbonFootprint(
        activityType: string, 
        passengerCount: number, 
        distanceUnit: string, 
        flightFrom: string, 
        flightTo: string
    ): Promise<number> {
        try {
            const response = await this.carbonApiClient.post('/estimates', {
                type: activityType,
                passengers: passengerCount,
                legs: [
                    {
                        departure_airport: flightFrom,
                        destination_airport: flightTo
                    }
                ],
                distance_unit: distanceUnit
            });
            
            return response.data.data.attributes.carbon_kg;
        } catch (error: any) {
            if (error.response) {
                throw new InternalServerError({
                    errorMessage: `Error calculating flight carbon footprint: ${error.response.status}`,
                    detail: error.response.data
                });
            } else if (error.request) {
                throw new InternalServerError({
                    errorMessage: "Error calculating flight carbon footprint: No response received",
                    detail: error.request
                });
            } else {
                throw new InternalServerError({
                    errorMessage: "Error calculating flight carbon footprint",
                    detail: error.message
                });
            }
        }
    }
}
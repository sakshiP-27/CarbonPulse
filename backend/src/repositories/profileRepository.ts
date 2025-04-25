import dbClient from "../config/dbConfig";
import { InternalServerError } from "../errors/InternalServerError";
import { NotFoundError } from "../errors/NotFoundError";

export class ProfileRepository {
    private prismaClient: any;

    constructor() {
        this.prismaClient = dbClient();
    }

    async getUserProfile(userID: number) {
        try {
            const userData = await this.prismaClient.user.findUnique({
                where: {
                    id: userID
                }
            });

            if (!userData) {
                throw new NotFoundError("User Details", `User Details for ID ${userID} not found`)
            }

            return userData;
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                throw error;
            }

            throw new InternalServerError({
                errorMessage: "Some error occurred internally while fetching details",
                errorDetails: error
            });
        }
    }

    async updateUserProfile(userID: number, name: string, email: string, gender: string) {
        try {
            const userData = await this.prismaClient.user.update({
                where: {
                    id: userID
                },
                data: {
                    name,
                    email,
                    gender,
                    updatedAt: new Date()
                }
            });

            if (!userData) {
                throw new NotFoundError("User Details", `User Details for ID ${userID} not found`);
            }

            return userData;
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                throw error;
            }

            throw new InternalServerError({
                errorMessage: "Some error occurred internally while fetching details",
                errorDetails: error
            });
        }
    }
}
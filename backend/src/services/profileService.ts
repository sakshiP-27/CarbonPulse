import { InternalServerError } from "../errors/InternalServerError";
import { ProfileRepository } from "../repositories/profileRepository";

export class ProfileService {
    private profileRepository: ProfileRepository;

    constructor(profileRepository: ProfileRepository) {
        this.profileRepository = profileRepository;
    }

    async getUserProfile(userId: string) {
        try {
            const userID = parseInt(userId);
            const userData = await this.profileRepository.getUserProfile(userID);

            const userProfileData = {
                name: userData.name,
                email: userData.email,
                gender: userData.gender
            }

            return userProfileData;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "User profile details not retrieved, some error occurred internally!",
                errorDetails: error
            });
        }
    }

    async updateUserProfile(userId: string, name: string, gender: string, email: string) {
        try {
            const userID = parseInt(userId);
            const updatedData = await this.profileRepository.updateUserProfile(userID, name, email, gender);

            const updatedProfileData = {
                name: updatedData.name,
                email: updatedData.email,
                gender: updatedData.gender
            }

            return updatedProfileData;
        } catch (error) {
            throw new InternalServerError({
                errorMessage: "User profile details not updated, some error occurred internally!",
                errorDetails: error
            });
        }
    }
}
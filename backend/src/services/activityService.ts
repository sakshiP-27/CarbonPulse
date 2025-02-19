import { ActivityRepository } from "../repositories/activityRepository";

export class ActivityService {
    private activityRepository: ActivityRepository;

    constructor(activityRepository: ActivityRepository) {
        this.activityRepository = activityRepository;
    }
}
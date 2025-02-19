import dbClient from "../config/dbConfig";

export class ActivityRepository {
    private prismaClient: any;

    constructor() {
        this.prismaClient = dbClient();
    }
}
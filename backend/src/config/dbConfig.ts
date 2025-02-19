import { PrismaClient } from "@prisma/client";
import serverConfig from "./serverConfig";

function dbClient() {
    try {
        if (serverConfig.NODE_ENV === "development") {
            const prismaClient = new PrismaClient();
            return prismaClient;
        }
    }
    catch (error) {
        console.log("Unable to create a client for the database!");
        console.log(error);
    }
}

export default dbClient;
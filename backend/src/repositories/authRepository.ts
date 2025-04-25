import dbClient from "../config/dbConfig";
import { InternalServerError } from "../errors/InternalServerError";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";

export class AuthRepository {
    private prismaClient: any;

    constructor() {
        this.prismaClient = dbClient();
    }

    async signUp(name: string, email: string, password: string, gender: string) {
        try {
            const existingUser = await this.prismaClient.user.findUnique({
                where: { email }
            });
            
            if (existingUser) {
                // Specific error for duplicate email
                throw new BadRequestError("Email", {
                    errorMessage: "User with this email already exists"
                });
            }
            
            const newUser = await this.prismaClient.user.create({
                data: {
                    name,
                    email,
                    password,
                    gender
                }
            });
            return newUser;
        } catch (error: any) {
            // Prevent wrapping specific errors in generic errors
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            
            // Handle Prisma-specific errors
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                throw new BadRequestError("Email", {
                    errorMessage: "User with this email already exists"
                });
            }
            
            throw new InternalServerError({
                errorMessage: "Internal issue occurred, can't store the user data",
                details: error
            });
        }
    }

    async logIn(email: string) {
        try {
            const user = await this.prismaClient.user.findUnique({
                where: { email }
            });

            if (!user) {
                throw new NotFoundError("Email", "User with this email not found, please sign up!");
            }
            return user;
        } catch (error) {
            // Don't wrap NotFoundError in another error
            if (error instanceof NotFoundError) {
                throw error;
            }
            
            throw new InternalServerError({
                errorMessage: "Error retrieving user data",
                details: error
            });
        }
    }
}
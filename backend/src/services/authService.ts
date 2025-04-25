import bcrypt from "bcryptjs";

import { BadRequestError } from "../errors/BadRequestError";
import { InternalServerError } from "../errors/InternalServerError";
import { NotFoundError } from "../errors/NotFoundError";
import { AuthRepository } from "../repositories/authRepository";
import { encryptPassword } from "../utils/hashPassword";
import { checkPassword } from "../validators/checkPassword";

export class AuthService {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async signUp(userData: any) {
        try {
            const { name, email, password, confirmPassword, gender } = userData;

            // Input validation
            if (!name || !email || !password || !confirmPassword || !gender) {
                throw new BadRequestError("Required fields", {
                    errorMessage: "All fields are required"
                });
            }

            const checkValidPassword = checkPassword(password, confirmPassword); // validating the password

            if (!checkValidPassword) {
                throw new BadRequestError(confirmPassword, {
                    errorMessage: "Password and Confirm Password are not the same!"
                });
            }

            // Hashing the password
            const hashedPassword = await encryptPassword(password);

            const registeredData = await this.authRepository.signUp(name, email, hashedPassword, gender);
            return registeredData;
        } catch (error) {
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }

            throw new InternalServerError({
                errorMessage: "Something wrong occurred internally",
                details: error
            });
        }
    }

    async logIn(loginData: any) {
        try {
            const { email, password } = loginData;
            
            // Input validation
            if (!email || !password) {
                throw new BadRequestError("Required fields", {
                    errorMessage: "Email and password are required"
                });
            }

            try {
                const loginUserData = await this.authRepository.logIn(email);
                
                // comparing the password entered
                const isPasswordCorrect = await bcrypt.compare(password, loginUserData.password);
    
                if (!isPasswordCorrect) {
                    throw new BadRequestError("Password", {
                        errorMessage: "Invalid password"
                    });
                }
    
                const userData = {
                    id: loginUserData.id,
                    name: loginUserData.name,
                    email: loginUserData.email,
                    gender: loginUserData.gender 
                };
    
                return userData;
            } catch (error) {
                if (error instanceof NotFoundError) {
                    throw new BadRequestError("Credentials", {
                        errorMessage: "Invalid email or password"
                    });
                }
                throw error;
            }
        } catch (error) {
            if (error instanceof BadRequestError) {
                throw error;
            }
            
            throw new InternalServerError({
                errorMessage: "Login failed",
                details: error
            });
        }
    }

    logOut() {
        const logOutUser = {
            success: true,
            message: "User logged out successfully"
        };

        return logOutUser;
    }
}
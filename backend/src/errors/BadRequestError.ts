import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";

export class BadRequestError extends BaseError {
    constructor(badPropertyName: string, details: any) {
        super("BadRequestError", StatusCodes.BAD_REQUEST, `Invalid request with ${badPropertyName}`, details);
    }
}

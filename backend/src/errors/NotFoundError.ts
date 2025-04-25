import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";

export class NotFoundError extends BaseError {
    constructor(resourceName: string, resourceValue: string) {
        super("NotFoundError", StatusCodes.NOT_FOUND, `${resourceName} not found for the value ${resourceValue}`, {
            resourceName,
            resourceValue
        });
    }
}
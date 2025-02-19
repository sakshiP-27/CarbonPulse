import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";

class ServiceUnavailableError extends BaseError {
    constructor(serviceName: string, details: any) {
        super("ServiceUnavailableError", StatusCodes.SERVICE_UNAVAILABLE, `${serviceName} is current unavailable`, details)
    }
}

export default ServiceUnavailableError;
import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";

class UnauthorizedError extends BaseError {
    constructor(details: any) {
        super("UnauthorizedError", StatusCodes.UNAUTHORIZED, `Authorization failed, Access denied!`, details);
    }
}

export default UnauthorizedError;
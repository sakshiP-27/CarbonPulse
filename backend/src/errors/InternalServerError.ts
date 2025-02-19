import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";

class InternalServerError extends BaseError {
    constructor(details: any) {
        super("InternalServerError", StatusCodes.INTERNAL_SERVER_ERROR, `Something went wrong internally, Please try again later!`, details);
    }
}

export default InternalServerError;
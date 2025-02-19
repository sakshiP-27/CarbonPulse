import { StatusCodes } from "http-status-codes";
import BaseError from "../errors/baseError";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(err: BaseError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.details,
            data: {}
        });
    }
    else {
        console.log('Something went wrong!');
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: err,
            data: {}
        });
    }
}

class BaseError extends Error {
    statusCode: number;
    details: any;

    constructor(name: string, statusCode: number, description: string, details: any) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.details = details;
    }
}

export default BaseError;
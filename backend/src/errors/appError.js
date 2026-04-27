export class appError extends Error {
    constructor(message, code, statusCode) {
        super(message),
        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}
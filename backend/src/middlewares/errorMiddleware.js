export const errorMiddleware = (error, req, res, next) => {

    if(error.isOperational) {
        return res.status(error.statusCode).json({
            success: false,
            error: {
                code: error.code,
                message: error.message
            }
        });
    }

    return res.status(500).json({
        success: false,
        error: {
            code: error.code,
            message: error.message
        }
    });
}
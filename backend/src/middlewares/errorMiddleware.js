export const errorMiddleware = (error, req, res, _next) => {
    if (error.isOperational) {
        return res.status(error.statusCode).json({
            success: false,
            error: {
                code: error.code,
                message: error.message
            }
        });
    }

    console.error("Erro interno capturado:", error);

    return res.status(500).json({
        success: false,
        error: {
            code: error.code,
            message: error.message
        }
    });
};

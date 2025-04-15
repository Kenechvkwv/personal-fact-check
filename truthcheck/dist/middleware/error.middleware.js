const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    // Development error handling was made more detailed here
    if (process.env.NODE_ENV === "development") {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            errors: err.errors, // Include validation errors if they exist
        });
    }
    // Production error handling - more generic
    else {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                errors: err.errors, // Include validation errors if they exist
            });
        }
        // Programming or other unknown error: don't leak error details
        else {
            console.error("ERROR 💥", err);
            res.status(500).json({
                status: "error",
                message: "Opps 🚫 Something went very wrong!",
            });
        }
    }
};
export default errorMiddleware;

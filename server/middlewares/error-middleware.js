const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend error"
    const extraDetails = err.extraDetails || "Send extradetails from the err"

    return res.status(status).json({message, extraDetails})
}

export default errorMiddleware;
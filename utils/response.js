const sendResponse = (res, { message, statusCode, data }) => {
    res.status(statusCode).json({
        status: true,
        message,
        data
    })
}

module.exports = sendResponse;
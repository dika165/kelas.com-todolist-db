export const successResponse = (response, message, data, status = 200) => {
    return response.status(status).json({
        status: status, 
        message: message, 
        data: data
    })
}

export const errorResponse = (response, message, status =400) => {
    return response.status(status).json({
        status:status, 
        message: message,
    })
}
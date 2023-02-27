export const response = async(status, message , data) => {
    return{ statusCode:status, body: JSON.stringify({message, data})}
}

export const jwtResponse = async(status, message , data) => {
    return{ principalId:'Invalid', body: JSON.stringify({message, data})}
}

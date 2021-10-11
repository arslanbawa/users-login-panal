const logIN = (token) => {
    return {
        type: "LOG_IN",
        payload: token
    }
}
export default {
    logIN
}
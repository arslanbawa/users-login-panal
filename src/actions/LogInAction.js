const logIN = (token) => {
    return {
        type: "LOG_IN",
        payload: token
    }
}
const Role = (role) =>{
    return {
        type: "ROLE",
        payload: role
    }
}
export default {
    logIN,Role
}
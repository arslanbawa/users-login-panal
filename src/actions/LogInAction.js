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
const Id = (id) =>{
    return {
        type: "ROLE",
        payload: id
    }
}
export default {
    logIN,Role,Id
}
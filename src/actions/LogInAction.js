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
const exportObjects={    logIN,
    Role,Id}
export default exportObjects
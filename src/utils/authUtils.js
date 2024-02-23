const userId = "user-id"
const accsesToken = "access-token"
const refeshToken = "refesh-token"

const getAccessToken = () => {
    return localStorage.getItem(accsesToken)
}
const getRefeshToken = () => {
    return localStorage.getItem(refeshToken)
}
const getUserId = () => {
    return localStorage.getItem(userId)
}

const removeAccessToken = () => {
    localStorage.removeItem(accsesToken)
}

const removeUserId = () => {
    localStorage.removeItem(userId)
}

const setAccessToken = (a) => {
    return localStorage.setItem(accsesToken, a)
}
const setRefeshToken = (a) => {
    return localStorage.setItem(refeshToken, a)
}
const setUserId = (a) => {
    return localStorage.setItem(userId, a)
}
export { getAccessToken, getRefeshToken, getUserId, setAccessToken, setUserId, setRefeshToken, removeAccessToken, removeUserId }

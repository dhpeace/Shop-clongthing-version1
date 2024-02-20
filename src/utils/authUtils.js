const getAccessToken = () => {
    return localStorage.getItem("access-token")
}
const getRefeshToken = () => {
    return localStorage.getItem("refesh-token")
}
const getUserId = () => {
    return localStorage.getItem("user-id")
}

const setAccessToken = (a) => {
    return localStorage.setItem("access-token", a)
}
const setRefeshToken = (a) => {
    return localStorage.setItem("refesh-token", a)
}
const setUserId = (a) => {
    return localStorage.setItem("user-id", a)
}
export { getAccessToken, getRefeshToken, getUserId, setAccessToken, setUserId, setRefeshToken }

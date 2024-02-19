import axios from "axios"

export const API_BASE_URL = "http://localhost:8081/api/v1"
// export const API_BASE_URL = "http://192.168.1.6:8081/api/v1";

const jwt = localStorage.getItem("jwt")

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
    },
})

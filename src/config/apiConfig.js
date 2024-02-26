import axios from "axios"
import { getAccessToken, getUserId } from "../utils/authUtils"

export const API_BASE_URL = "http://localhost:8081/api/v1"
// export const API_BASE_URL = "http://192.168.31.83:8081/api/v1"

export const setHeaders = () => {
    return {
        authorization: getAccessToken(),
        "x-client-id": getUserId(),
    }
}

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        ...setHeaders(),
        "Content-Type": "application/json",
    },
})

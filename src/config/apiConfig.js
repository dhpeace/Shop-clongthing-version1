import axios from "axios"
import { getAccessToken, getUserId } from "../utils/authUtils"

export const API_BASE_URL = "http://localhost:8081/api/v1"
// export const API_BASE_URL = "http://192.168.1.6:8081/api/v1";

const jwt = localStorage.getItem("jwt")
const userId = localStorage.getItem("user-id")

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        authorization: getAccessToken(),
        "x-client-id": getUserId(),
        "Content-Type": "application/json",
    },
})

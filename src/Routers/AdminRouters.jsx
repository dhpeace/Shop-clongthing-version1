// eslint-disable-next-line no-unused-vars
import React from "react"
import { Routes, Route } from "react-router-dom"
import Admin from "../Admin/Admin"
import { useSelector } from "react-redux"
import { selectAuth } from "../State/auth.slice"

function AdminRouters() {
    const curentUser = useSelector(selectAuth.selectCurrentUser)
    console.log("curentUser", curentUser)
    return (
        <div>
            {curentUser?.roles.find((v) => v === "ADMIN") ? (
                <Routes>
                    <Route path="/*" element={<Admin />}></Route>
                </Routes>
            ) : (
                "Ban khong co quyen truy cap vui long dang nhap"
            )}
        </div>
    )
}

export default AdminRouters

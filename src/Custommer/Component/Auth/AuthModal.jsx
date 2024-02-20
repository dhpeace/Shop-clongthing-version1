// eslint-disable-next-line no-unused-vars
import { Box, Modal, Typography } from "@mui/material"
// eslint-disable-next-line no-unused-vars
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import RegisterForm from "./RegisterForm"
import { useLocation, useNavigate } from "react-router-dom"
import LoginForm from "./LoginForm"
import { api } from "../../../config/apiConfig"
import { useDispatch } from "react-redux"
import { authAction, fetchInfo } from "../../../State/auth.slice"
import { useState } from "react"
import { getAccessToken, getUserId } from "../../../utils/authUtils"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: 4,
}
function AuthModal({ handleClose, open, urlReturnLogin = "/", urlReturnRegister = "/" }) {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const handleOnLogin = async (data) => {
        try {
            const a = await api.post("/auth/login", data)
            console.log(a.data.data)
            dispatch(authAction.loginSuccess(a.data.data))
            handleClose()
            navigate(urlReturnLogin)
        } catch (error) {
            console.log(error.response.data.message)
            toast(error.response.data.message)
        }
    }

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>{location.pathname === "/register" ? <RegisterForm /> : <LoginForm onSubmit={handleOnLogin} />}</Box>
            </Modal>
        </div>
    )
}

AuthModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    urlReturnLogin: PropTypes.string,
    urlReturnRegister: PropTypes.string,
}
AuthModal.defaultProps = {
    urlReturnLogin: "/",
    urlReturnRegister: "/",
}

export default AuthModal

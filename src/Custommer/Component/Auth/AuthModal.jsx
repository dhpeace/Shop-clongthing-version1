// eslint-disable-next-line no-unused-vars
import { Box, Modal, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { api } from "../../../config/apiConfig";
import { useDispatch } from "react-redux";
import { authAction } from "../../../State/auth.slice";
import { useState } from "react";
import { getAccessToken, getUserId } from "../../../utils/authUtils";
import { getUser } from "../../../State/Auth/Action";
import Logout from "./Logout";

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
};
function AuthModal({
  handleClose,
  open,
  isConverModToUser,
  idUserMod,
  urlReturnLogin = "/",
  urlReturnRegister,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleOnLogin = async (data) => {
    try {
      const a = await api.post("/auth/login", data);
      dispatch(authAction.loginSuccess(a.data.data));
      handleClose();
      navigate(urlReturnLogin);
    } catch (error) {
      console.log(error.response.data.message);
      toast(error.response.data.message);
    }
  };
  const handleOnRegister = async (data) => {
    try {
      const url = isConverModToUser
        ? `conver-mod-to-user/${idUserMod}`
        : "register";
      const a = await api.post(`/auth/${url}`, data, {
        headers: {
          "x-client-id": idUserMod,
        },
      });
      dispatch(authAction.loginSuccess(a.data.data));
      handleClose();
      navigate(urlReturnRegister);
    } catch (error) {
      console.log(error.response);
      toast(error.response?.data?.data + " " + error.response?.data?.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(authAction.logout());
    handleClose();
    navigate("/login");
  };

  return (
    <div>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {location.pathname === "/register" || isConverModToUser ? (
            <RegisterForm onSubmit={handleOnRegister} />
          ) : (
            <>
              <LoginForm onSubmit={handleOnLogin} />
              <Logout onLogout={handleLogout} /> 
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

AuthModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  urlReturnLogin: PropTypes.string,
  isConverModToUser: PropTypes.bool,
  onRegisterSuccess: PropTypes.func,
  idUserMod: PropTypes.string,
  urlReturnRegister: PropTypes.string,
};
AuthModal.defaultProps = {
  urlReturnLogin: "/",
  urlReturnRegister: "/",
};

export default AuthModal;

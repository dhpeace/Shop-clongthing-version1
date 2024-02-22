import { Button, Grid, TextField } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getUser, register } from "../../../State/Auth/Action";
import PropTypes from "prop-types";
import { useState } from "react";

function RegisterForm({ onSubmit }) {
  const [data, setData] = useState({ name: null, email: null, password: null });
  const navigate = useNavigate();
  // const dispatch = useDispatch()

  const handleSubmit = (data) => {
    console.log(data);

    onSubmit(data);
  };
  const handleClickLogin = () => {
    navigate("/login");
  };
  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={data?.name}
              onchange={(e) => setData({ ...data, name: e.target.value })}
              required
              id="firtname"
              name="firtname"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastname"
              name="lastname"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={data?.email}
              onchange={(e) => setData({ ...data, email: e.target.value })}
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            {/* oooooo */}
            <TextField
              value={data?.password}
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              onClick={(data) => handleSubmit(data)}
              size="large"
              sx={{
                padding: ".8rem 0",
                backgroundColor: "#3f51b5",
                color: "#fff",
                width: "100%",
              }}>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center mt-5">
        <div className="py-3 flex items-center">
          <p> If you already have an account, </p>
          <Button
            onClick={handleClickLogin}
            className="ml-5"
            size="small"
            color="primary">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
RegisterForm.propTypes = { onSubmit: PropTypes.func.isRequired };

export default RegisterForm;

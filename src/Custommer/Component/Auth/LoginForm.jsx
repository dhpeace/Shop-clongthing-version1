import { Button, Grid, TextField } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      firtName: data.get("firtName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log("userData", userData);
  };
  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
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
            <TextField
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
              size="large"
              sx={{
                padding: ".8rem 0",
                backgroundColor: "#3f51b5",
                color: "#fff",
                width: "100%",
              }}>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center mt-5">
        <div className="py-3 flex items-center">
          <p> If you already have an account, </p>
          <Button
            onClick={() => navigate("/register")}
            className="ml-5"
            size="small"
            color="primary">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

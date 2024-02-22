import { Button, Grid, TextField } from "@mui/material"

import PropTypes from "prop-types"
// eslint-disable-next-line no-unused-vars
import React from "react"
import { useNavigate } from "react-router-dom"

function LoginForm({ onSubmit }) {
    const a = "http://localhost:5173/login-redirect"
    const gglink = `http://localhost:8081/api/v1/oauth2/authorization/google?redirect_url=${a}`
    const fblink = `http://localhost:8081/api/v1/oauth2/authorization/facebook?redirect_url=${a}`

    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        }
        onSubmit && onSubmit(userData)
    }
    return (
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField required id="email" name="email" label="Email" fullWidth autoComplete="email" variant="outlined" />
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
                            }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className="flex justify-center flex-col items-center mt-5">
                <div className="py-3 flex items-center">
                    <p> If you already have an account, </p>
                    <Button onClick={() => navigate("/register")} className="ml-5" size="small" color="primary">
                        Register
                    </Button>
                </div>
                <div className="py-3 flex items-center">
                    <p>Login with googole </p>
                    <Button onClick={() => (window.location.href = gglink)} className="ml-5" size="small" color="primary">
                        Login with googole
                    </Button>
                </div>
                <div className="py-3 flex items-center">
                    <p>Login with facebook</p>
                    <Button onClick={() => (window.location.href = fblink)} className="ml-5" size="small" color="primary">
                        Login with facebook
                    </Button>
                </div>
            </div>
        </div>
    )
}

// LoginForm.propTypes = { returnUrl: PropTypes.string }
// LoginForm.defaultProps = {
//     returnUrl: "/",
// }

LoginForm.propTypes = { onSubmit: PropTypes.func }

export default LoginForm

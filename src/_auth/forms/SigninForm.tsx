import React, { useState } from "react";
import {
  Button,
  ThemeProvider,
  createTheme,
  TextField,
  FormControl,
  Box,
} from "@mui/material";
import "../../scss/signinForm.scss";
import { Link } from "react-router-dom";

const SigninForm = () => {
  return (
    <Box className="signIn" sx={{ height: "100%", width: "100%" }}>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ mb: 5 }}>
            <img src="/assets/images/logo.svg" alt="logo" />
          </Box>
          <h2>Log in to your account</h2>
          <p className="subtitle">Welcome back! Please enter your details.</p>
        </Box>
        <TextField
          id="outlined-required"
          label="Email"
          variant="filled"
          sx={{ width: "50%" }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          sx={{ width: "50%" }}
        />
        <Button variant="contained" sx={{ width: "50%" }}>
          Log in
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <p>Don't have an account?</p>
          <Link className="link" to="/sign-up">
            Sign up
          </Link>
        </Box>
      </FormControl>
    </Box>
  );
};

export default SigninForm;

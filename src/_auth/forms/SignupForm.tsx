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
import { MarkEmailReadSharp } from "@mui/icons-material";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = () => {
    setNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (name.trim().length === 0) {
      setNameError("Name cannot be empty");
      isValid = false;
    }
    if (username.length <= 2) {
      setUsernameError("Username must contain at least 3 characters");
      isValid = false;
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }
    if (password.length < 6 || password.length > 12) {
      setPasswordError("Password must contain between 6 to 12 characters");
      isValid = false;
    }
  };

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
          <h2>Create a new account</h2>
          <p className="subtitle">
            To use snapgram, Please enter your details.
          </p>
        </Box>
        <TextField
          label="Name"
          variant="filled"
          sx={{ width: "50%" }}
          onChange={(e) => {
            const newName = e.target.value;
            setName(newName);
            if (newName.length > 0) {
              setNameError("");
            } else {
              setNameError("Name cannot be empty");
            }
          }}
          value={name}
          error={nameError.length > 0}
          helperText={nameError}
        />
        <TextField
          label="Username"
          variant="filled"
          sx={{ width: "50%" }}
          onChange={(e) => {
            const newUsername = e.target.value;
            setUsername(newUsername);
            if (newUsername.length >= 2) {
              setUsernameError("");
            } else {
              setUsernameError("Username must contain at least 3 characters");
            }
          }}
          value={username}
          error={usernameError.length > 0}
          helperText={usernameError}
        />
        <TextField
          label="Email"
          variant="filled"
          sx={{ width: "50%" }}
          onChange={(e) => {
            const newEmail = e.target.value;
            setEmail(newEmail);

            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (emailRegex.test(newEmail)) {
              setEmailError("");
            } else {
              setEmailError("Please enter a valid email");
            }
          }}
          value={email}
          error={emailError.length > 0}
          helperText={emailError}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          sx={{ width: "50%" }}
          onChange={(e) => {
            const newPassword = e.target.value;
            setPassword(newPassword);
            if (newPassword.length >= 6 && newPassword.length <= 12) {
              setPasswordError("");
            } else {
              setPasswordError(
                "Password must contain between 6 to 12 characters"
              );
            }
          }}
          value={password}
          error={passwordError.length > 0}
          helperText={passwordError}
        />
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={handleSubmit}
        >
          Sign up
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <p>Already have an account?</p>
          <Link className="link" to="/sign-in">
            Log in
          </Link>
        </Box>
      </FormControl>
    </Box>
  );
};

export default SignupForm;

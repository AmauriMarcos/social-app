import React, { useState } from "react";
import {
  Button,
  ThemeProvider,
  createTheme,
  TextField,
  FormControl,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import "../../scss/signinForm.scss";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useValidation from "../../utils/useValidation";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { emailError, passwordError, validateEmail, validatePassword } = useValidation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      console.log("Email:", email);
      console.log("Password:", password);
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
          <h2>Log in to your account</h2>
          <p className="subtitle">Welcome back! Please enter your details.</p>
        </Box>
        <TextField
          label="Email"
          variant="filled"
          sx={{ width: "50%" }}
          onChange={(e) => {
            const newEmail = e.target.value;
            setEmail(newEmail);
            validateEmail(newEmail);
          }}
          value={email}
          error={emailError.length > 0}
          helperText={emailError}
        />
        <TextField
          label="Password"
          autoComplete="current-password"
          variant="filled"
          sx={{ width: "50%" }}
          onChange={(e) => {
            const newPassword = e.target.value;
            setPassword(newPassword);
            validatePassword(newPassword);
          }}
          value={password}
          error={passwordError.length > 0}
          helperText={passwordError}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={handleSubmit}
        >
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

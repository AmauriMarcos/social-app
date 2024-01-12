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
  CircularProgress,
} from "@mui/material";
import "../../scss/signinForm.scss";
import { Link, Navigate } from "react-router-dom";
import { MarkEmailReadSharp } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useValidation from "../../utils/useValidation";
import { AlertColor } from "@mui/material/Alert";
import {useCreateUserAccount, useSignInAccount} from '../../lib/react-query/queriesAndMutations';
import {useUserContext} from '../../context/AuthContext';

type SignupFormProps = {
  setAlertType: React.Dispatch<React.SetStateAction<AlertColor>>;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignupForm: React.FC<SignupFormProps> = ({
  setAlertType,
  setAlertOpen,
}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  const {
    nameError,
    usernameError,
    emailError,
    passwordError,
    validateName,
    validateUsername,
    validateEmail,
    validatePassword,
  } = useValidation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const isNameValid = validateName(name);
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    const {mutateAsync: createUserAccount, isLoading: isCreatingUser} = useCreateUserAccount();
    const {mutateAsync: signInAccount, isLoading: isSigningIn} = useSignInAccount();

    if (isNameValid && isUsernameValid && isEmailValid && isPasswordValid) {
      const values = {
        name,
        username,
        email,
        password,
      };
      const newUser = await createUserAccount(values);
      setIsLoading(false);

      if (!newUser) {
        setAlertOpen(true);
        setAlertType("error");
        return;
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password
      });

      if(!session){
        setAlertOpen(true);
        setAlertType("error");
        return;
      }

      const isLoggedIn = await checkAuthUser();

     /*  setAlertOpen(true);
      setAlertType("success");
      <Navigate to="/" />;
      console.log("New user:", newUser); */
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
            To use snapgram, please enter your details.
          </p>
        </Box>
        <TextField
          label="Name"
          variant="filled"
          sx={{ width: "50%" }}
          onChange={(e) => {
            const newName = e.target.value;
            setName(newName);
            validateName(newName);
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
            validateUsername(newUsername);
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
        {isLoading ? (
          <Button variant="contained" sx={{ width: "50%" }}>
            <CircularProgress
              color="inherit"
              style={{ width: "24px", height: "24px", marginRight: "1rem" }}
            />{" "}
            Loading...
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ width: "50%" }}
            onClick={handleSubmit}
          >
            Sign up
          </Button>
        )}

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

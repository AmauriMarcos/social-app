import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import "../scss/authLayout.scss";
/* import SideImg from "../../public/assets/images/side-img.svg"; */

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
            }}
          >
            <Outlet />
          </Box>
          <img
            className="authLayout-img"
            src="/assets/images/side-img.svg"
            alt="snapgram img"
          />
        </Box>
      )}
    </>
  );
};

export default AuthLayout;

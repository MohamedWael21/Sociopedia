import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import React from "react";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.alt,
          p: "1rem 6%",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "32px",
            color: "primary.main",
          }}
        >
          Sociopedia
        </Typography>
      </Box>
      <Box
        sx={{
          width: isNonMobileScreen ? "50%" : "100%",
          p: "2rem",
          m: "2rem auto",
          borderRadius: "1.2rem",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "500", mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Socipahts
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;

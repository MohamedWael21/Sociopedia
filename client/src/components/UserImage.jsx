import { Box } from "@mui/material";
import React from "react";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
      }}
    >
      <img
        src={`http://localhost:3001/assets/${image}`}
        alt="user"
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          width: size,
          height: size,
        }}
      />
    </Box>
  );
};

export default UserImage;

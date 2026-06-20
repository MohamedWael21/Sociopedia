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
        src={image.startsWith("http") ? image : `${process.env.REACT_APP_BASE_URL}/assets/${image}`}
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

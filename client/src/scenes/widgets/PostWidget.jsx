import React, { useState } from "react";
import {
  ChatBubbleOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
const PostWidget = ({ post }) => {
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(post.likes[loggedInUserId]);
  const likesCount = Object.keys(post.likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${post._id}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={post.userId}
        name={`${post.firstName} ${post.lastName}`}
        subtitle={post.location}
        userPicturePath={post.userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {post.description}
      </Typography>
      {post.picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${post.picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* Likes Section */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: primary }} />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>

          {/* Comments Section  */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlined />
            </IconButton>
            <Typography>{post.comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment && (
        <Box mt="0.5rem">
          {post.comments.map((comment, index) => (
            <Box key={`${post.firstName} ${post.lastName}-${index}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pt: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;

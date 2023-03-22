import React from "react";
//MUI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
//Components
import LoveButton from "../../atoms/LoveButton";
//Styled components
import styled from "styled-components";

const CommentsCount = ({ number }) => {
  return <Paragraph paragraph>{number} comments</Paragraph>;
};

const PostCommentActionPanel = ({
  isLoved,
  handleLove,
  loveCount,
  comment,
  handleCommentChange,
  sendComment,
  handleExpandClick,
  filterComments,
}) => {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={4} sm={4} md={3}>
          <LoveButton
            onClick={handleLove}
            isLoved={isLoved}
            loveCount={loveCount}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <div onClick={handleExpandClick} style={{ cursor: "pointer" }}>
            <CommentsCount number={filterComments.length} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default PostCommentActionPanel;

const Paragraph = styled(Typography)`
  &:hover {
    text-decoration: underline;
  }
`;

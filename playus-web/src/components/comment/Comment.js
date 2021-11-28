import React from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  font-size: 11px;
  color: rgb(38, 38, 38);
`;

const Username = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: rgb(38, 38, 38);
`;

function Comment({ comment_no, user_name, comment_data, comment_createdAt }) {
  const me = localStorage.getItem("LOGIN");
  return (
    <CommentContainer>
      <Username>{user_name}</Username>
      <CommentCaption>{comment_data}</CommentCaption>
    </CommentContainer>
  );
}

export default Comment;

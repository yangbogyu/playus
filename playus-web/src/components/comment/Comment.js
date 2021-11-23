import React from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Username = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: rgb(38, 38, 38);
`;

function Comment() {
  return (
    <CommentContainer>
      <Username>test</Username>
      <CommentCaption></CommentCaption>
    </CommentContainer>
  );
}

export default Comment;

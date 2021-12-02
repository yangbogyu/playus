import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Comment from "./Comment";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const CommentContainer = styled.div`
  padding: 15px 15px 10px 15px;
`;

const PostCommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  margin-left: 10px;
  padding: 10px;
  &::placeholder {
    font-size: 12px;
    font-weight: 600;
  }
`;

const Button = styled.button`
  border: none;
  background-color: white;
  color: ${(props) => props.theme.accent};
  padding: 8px 10px 8px 8px;
  font-weight: 600;
  width: fit-content;
`;

function Comments({ room }) {
  const { register, handleSubmit } = useForm();
  const me = localStorage.getItem("LOGIN");
  const [comment, setComment] = useState(null);

  useEffect(() => {
    fetch(`${URL}/comment/${room.room_no}`)
      .then((res) => res.json())
      .then(({ Comment }) => {
        if (Comment === false) {
          setComment(null);
        } else {
          setComment(Comment);
        }
      });
  }, [room]);

  const fetchSubmitValid = async ({ payload }) => {
    const { createComment } = await CREATECOMMENT({
      payload,
    });
    if (createComment === true) {
      alert("성공");
      window.location.reload();
    }
  };

  const CREATECOMMENT = async ({ payload }) => {
    const ok = await fetch(`${URL}/comment/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_no: room.room_no,
        user_name: me,
        comment_data: payload,
      }),
    }).then((res) => res.json());
    return ok;
  };

  return (
    <div>
      <CommentContainer>
        {comment?.map((comment) => (
          <Comment key={comment.comment_no} {...comment} no={room.room_no} />
        ))}
      </CommentContainer>
      <form onSubmit={handleSubmit(fetchSubmitValid)}>
        <PostCommentContainer>
          <PostCommentInput
            name="payload"
            ref={register({ required: true })}
            type="text"
            placeholder="댓글 쓰실라우?"
          />
          <Button type="submit">작성</Button>
        </PostCommentContainer>
      </form>
    </div>
  );
}

export default Comments;

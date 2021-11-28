import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Comment from "./Comment";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const PostCommentContainer = styled.div`
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const CommentContainer = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 5px;
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

function Comments({ room }) {
  const { register, handleSubmit } = useForm();
  const me = localStorage.getItem("LOGIN");
  const [comment, setComment] = useState();

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
  }, [comment]);

  const fetchSubmitValid = async ({ payload }) => {
    console.log(payload);
    const { createComment } = await CREATECOMMENT({
      payload,
    });
    console.log(createComment);
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
          <Comment key={comment.comment_no} {...comment} />
        ))}
      </CommentContainer>
      <PostCommentContainer>
        <form onSubmit={handleSubmit(fetchSubmitValid)}>
          <PostCommentInput
            name="payload"
            ref={register({ required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </div>
  );
}

export default Comments;

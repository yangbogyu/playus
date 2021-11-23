import { useForm } from "react-hook-form";
import styled from "styled-components";
import Comment from "./Comment";

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const CommentContainer = styled.div`
  padding: 20px;
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

function Comments({ room }) {
  const { register, handleSubmit } = useForm();

  console.log(room);
  const onValid = (data) => {};
  return (
    <div>
      <CommentContainer>
        <Comment></Comment>
      </CommentContainer>
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
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

import { useForm } from "react-hook-form";
import styled from "styled-components";

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const CommentContainer = styled.div`
  margin: 20px;
  padding: 20px;
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

function Comments() {
  const { register, handleSubmit } = useForm();

  // 'payload' is in data of 'onVaild'.
  const onValid = (data) => {};
  return (
    <div>
      <CommentContainer></CommentContainer>
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

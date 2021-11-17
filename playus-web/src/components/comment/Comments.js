import { useForm } from "react-hook-form";
import styled from "styled-components";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

function Comments() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  // 'payload' is in data of 'onVaild'.
  const onValid = (data) => {};
  return (
    <CommentsContainer>
      {/* <Comment author={author} payload={caption} /> */}
      <CommentCount>
        {/* {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`} */}
      </CommentCount>
      {/* {comments?.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          photoId={photoId}
          author={comment.user.username}
          payload={comment.payload}
          isMine={comment.isMine}
        />
      ))} */}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
          // name="payload"
          // ref={register({ required: true })}
          // type="text"
          // placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

export default Comments;

import { faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const CommentWrapper = styled.div`
  margin-bottom: 7px;
  padding: 7px;
  display: flex;
  flex-direction: column;
`;

const CommentUsername = styled.span`
  margin-top: 7px;
  font-size: 15px;
  font-weight: 600;
  color: rgb(0, 0, 0);
`;

const CommentCaption = styled.span`
  margin-top: 7px;
  font-size: 13px;
  font-weight: 500;
  color: rgb(62, 62, 62);
`;

const CommentCreatedAt = styled.span`
  margin-top: 7px;
  font-size: 10px;
  color: rgb(150, 150, 150);
`;

const IconContainer = styled.div`
  margin-right: 7px;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px;
  font-weight: 600;
  margin-left: 50px;
  width: fit-content;
`;

const DeleteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Comment({
  comment_no,
  user_name,
  comment_data,
  comment_createdAt,
  no,
}) {
  const me = localStorage.getItem("LOGIN");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteComment = () => {
    if (user_name === me) {
      fetch(`${URL}/comment/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment_no,
          room_no: no,
          user_name,
        }),
      })
        .then((res) => res.json())
        .then(({ deleteComment }) => {
          if (deleteComment === true) {
            alert("삭제되었습니다.");
            window.location.reload();
          }
        });
    }
  };

  return (
    <CommentContainer>
      <CommentWrapper>
        <CommentUsername>{user_name}</CommentUsername>
        <CommentCaption>{comment_data}</CommentCaption>
        <CommentCreatedAt>{comment_createdAt}</CommentCreatedAt>
      </CommentWrapper>
      <IconContainer>
        {user_name === me ? (
          <FontAwesomeIcon icon={faTrashAlt} onClick={handleShow} />
        ) : null}
      </IconContainer>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <FontAwesomeIcon
            icon={faWindowClose}
            onClick={handleClose}
            size="lg"
          />
        </Modal.Header>
        <Modal.Body>
          <DeleteContainer>
            삭제하실라우?
            <Button onClick={deleteComment}>삭제</Button>
          </DeleteContainer>
        </Modal.Body>
      </Modal>
    </CommentContainer>
  );
}

export default Comment;

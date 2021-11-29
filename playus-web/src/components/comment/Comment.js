import { faEllipsisV, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
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

function Comment({ comment_no, user_name, comment_data, comment_createdAt }) {
  const me = localStorage.getItem("LOGIN");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteComment = () => {
    // fetch(`${URL}/inRooms`, {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     room_no,
    //     user_name: me,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(({ inRoom }) => {
    //     if (inRoom === false) {
    //       alert("이미 참가한 방입니다.");
    //     } else {
    //       alert("성공!");
    //     }
    //     return inRoom;
    //   });
  };

  return (
    <CommentContainer>
      <CommentWrapper>
        <CommentUsername>{user_name}</CommentUsername>
        <CommentCaption>{comment_data}</CommentCaption>
        <CommentCreatedAt>{comment_createdAt}</CommentCreatedAt>
      </CommentWrapper>
      <FontAwesomeIcon icon={faEllipsisV} onClick={handleShow} />
      <style type="text/css">
        {`
          .btn-flat2 {
            background-color: #0095f6 ;
            font-weight: 600;
            color: white;
          }
        `}
      </style>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <FontAwesomeIcon
            icon={faWindowClose}
            onClick={handleClose}
            size="lg"
          />
        </Modal.Header>
        <Modal.Body>삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="flat2" onClick={deleteComment}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </CommentContainer>
  );
}

export default Comment;

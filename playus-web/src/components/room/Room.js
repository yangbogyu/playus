import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import RoomInfo from "./RoomInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import ShowRating from "../rating/ShowRating";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const RoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const RoomContent = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  flex-direction: column;
  margin: 10px;
`;

const RoomText = styled.span`
  margin: 10px;
  font-weight: 600;
  color: rgb(142, 142, 142);
  margin-left: 15px;
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

const RoomButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px;
  font-weight: 600;
  width: fit-content;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: fit-content;
`;

const InfoTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 7px 20px 7px 7px;
  padding-left: 20px;
  color: rgb(100, 100, 100);
`;

const InfoContent = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: rgb(110, 110, 110);
`;

function Room({
  room_no,
  room_place,
  room_address,
  room_sport,
  room_time,
  room_title,
  room_total,
  room_user,
  user_name,
  room_createdAt,
}) {
  const [show, setShow] = useState(false);

  const me = localStorage.getItem("LOGIN");
  const handleRoom = () => {
    fetch(`${URL}/inRooms`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_no,
        user_name: me,
      }),
    })
      .then((res) => res.json())
      .then(({ inRoom }) => {
        if (inRoom === false) {
          alert("이미 참가한 방입니다.");
        } else {
          alert("성공!");
          window.location.reload();
        }
        return inRoom;
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <RoomContainer key={room_no}>
      <RoomContent>
        <RoomText>{room_title}</RoomText>
        <RoomText>{room_place}</RoomText>
        <RoomText>{room_address}</RoomText>
        <RoomText>{room_time}</RoomText>
      </RoomContent>
      <RoomButton>
        <Button onClick={handleShow}>세부정보</Button>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <FontAwesomeIcon
              icon={faWindowClose}
              onClick={handleClose}
              size="lg"
            />
            <Username>세부정보</Username>
            <Button onClick={handleRoom}>참가하기</Button>
          </Modal.Header>
          <Modal.Body>
            <InfoContainer>
              <InfoTitle>방장</InfoTitle>
              <InfoContent>{user_name}</InfoContent>
              <ShowRating user={user_name} />
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>장소</InfoTitle>
              <InfoContent>{room_place}</InfoContent>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>주소</InfoTitle>
              <InfoContent>{room_address}</InfoContent>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>시간</InfoTitle>
              <InfoContent>{room_time}</InfoContent>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>장소</InfoTitle>
              <InfoContent>{room_title}</InfoContent>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>종목</InfoTitle>
              <InfoContent>{room_sport}</InfoContent>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>총원</InfoTitle>
              <InfoContent>{room_total}</InfoContent>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>인원</InfoTitle>
              <InfoContent>{room_user}</InfoContent>
            </InfoContainer>
          </Modal.Body>
        </Modal>
      </RoomButton>
    </RoomContainer>
  );
}

export default Room;

import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import RoomInfo from "./RoomInfo";
import Alert from "@mui/material/Alert";

const RoomContainer = styled.div`
  max-width: 615px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};

  @media screen and (max-width: 615px) {
    max-width: 450px;
  }
`;

const RoomContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 10px;
`;

const RoomText = styled.span`
  margin: 10px;
  font-weight: 600;
  color: rgb(142, 142, 142);
  margin-left: 15px;
`;

const RoomButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-right: 10px;
`;

function Room({
  room_no,
  room_place,
  room_sport,
  room_time,
  room_title,
  room_total,
  room_user,
  user_name,
}) {
  const [show, setShow] = useState(false);

  const me = localStorage.getItem("LOGIN");
  const handleRoom = () => {
    fetch("http://localhost:5000/inRooms", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_no,
        user_name: me,
      }),
    })
      .then((res) => res.json())
      .then(({ inRoom }) => {
        console.log(inRoom);
        if (inRoom === false) {
          <Alert severity="error">
            This is an error alert — check it out!
          </Alert>;
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
        <RoomText>{room_time}</RoomText>
      </RoomContent>
      <RoomButton>
        <style type="text/css">
          {`
          .modal-header {
            margin: 5px;
            font-weight: 600;
            color: black;
          }
          .btn-flat {
            background-color: rgb(100, 100, 100) ;
            font-weight: 600;
            color: white;
          }
          .btn-flat2 {
            background-color: #0095f6 ;
            font-weight: 600;
            color: white;
          }
        `}
        </style>
        <Button variant="flat2" onClick={handleShow} size="sm">
          세부정보
        </Button>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title>{room_title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RoomInfo title="장소" content={room_place} />
            <RoomInfo title="시간" content={room_time} />
            <RoomInfo title="종목" content={room_sport} />
            <RoomInfo title="총원" content={room_total + " 명"} />
            <RoomInfo title="인원" content={room_user + " 명"} />
            <RoomInfo title="방장" content={user_name} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="flat" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="flat2" onClick={handleRoom}>
              참가하기
            </Button>
          </Modal.Footer>
        </Modal>
      </RoomButton>
    </RoomContainer>
  );
}

export default Room;

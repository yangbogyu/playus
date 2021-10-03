import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import RoomInfo from "./RoomInfo";

export default function RoomDetail({ info }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
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
          <Modal.Title>{info.room_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomInfo title="장소" content={info.room_place} />
          <RoomInfo title="시간" content={info.room_time} />
          <RoomInfo title="종목" content={info.room_sport} />
          <RoomInfo title="총원" content={info.room_total + " 명"} />
          <RoomInfo title="인원" content={info.room_user + " 명"} />
          <RoomInfo title="방장" content={info.user_name} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="flat" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="flat2" onClick={handleClose}>
            참가하기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

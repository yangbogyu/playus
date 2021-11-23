import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const ChatContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;

const ChatHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled.span`
  margin-top: 2px;
  font-size: 15px;
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

const ChatData = styled.div`
  padding: 12px 15px;
`;

const ChatMembers = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: column;
  margin-left: 20px;
  div {
    max-width: 150px;
    width: 100%;
  }
`;

const ChatMember = styled.div`
  /* border-bottom: 1px solid rgb(239, 239, 239); */
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin: 10px 5px;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 50%;
`;

function ChatRoom({ room }) {
  const [seeMembers, setSeeMembers] = useState();
  const [master, setMaster] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(`${URL}/seeRooms/list/${room.room_no}`)
      .then((res) => res.json())
      .then(({ RoomList }) => {
        setSeeMembers(RoomList);
        for (var i = 0; i < RoomList.length; i++) {
          if (RoomList[i].user_static === "M") {
            setMaster(RoomList[i].user_name);
          }
        }
      });
  }, [room]);

  return (
    <ChatContainer>
      <ChatHeader>
        <Username>{room.room_title}</Username>
      </ChatHeader>
      <ChatData>
        <ChatMembers>
          <div>
            <ChatMember>
              <Username>{master}</Username>
            </ChatMember>
          </div>
          <div>
            <Button onClick={handleShow}>참가자</Button>

            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header>
                <FontAwesomeIcon
                  icon={faWindowClose}
                  onClick={handleClose}
                  size="lg"
                />
              </Modal.Header>
              <Modal.Body>
                <UserList>
                  {seeMembers
                    ? seeMembers?.map((member) => (
                        <Username key={member.user_name}>
                          {member.user_name}
                        </Username>
                      ))
                    : null}
                </UserList>
              </Modal.Body>
            </Modal>
          </div>
        </ChatMembers>
        <Comments room={room} />
      </ChatData>
    </ChatContainer>
  );
}

export default ChatRoom;

import { useForm } from "react-hook-form";
import styled from "styled-components";
import Comments from "./Comments";
import { useEffect, useState } from "react";
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
  margin-left: 20px;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const ChatMember = styled.div`
  border-bottom: 1px solid rgb(239, 239, 239);
`;

function ChatRoom({ room_no }) {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const me = localStorage.getItem("LOGIN");
  const [seeMembers, setSeeMembers] = useState();

  useEffect(() => {
    fetch(`${URL}/seeRooms/list/${room_no}`)
      .then((res) => res.json())
      .then(({ RoomList }) => {
        setSeeMembers(RoomList);
      });
  }, []);

  return (
    <ChatContainer>
      <ChatHeader>
        <Username>{me}</Username>
      </ChatHeader>
      <ChatData>
        <ChatMembers>
          <div>
            {seeMembers
              ? seeMembers?.map((member) => (
                  <ChatMember>
                    <Username key={member.user_name}>
                      {member.user_name}
                    </Username>
                  </ChatMember>
                ))
              : null}
          </div>
        </ChatMembers>
        <Comments />
      </ChatData>
    </ChatContainer>
  );
}

export default ChatRoom;

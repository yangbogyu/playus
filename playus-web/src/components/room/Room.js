import styled from "styled-components";
import { useEffect, useState } from "react";
import RoomDetail from "./RoomDetail";
import PropTypes from "prop-types";
import { responsePathAsArray } from "graphql";

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

function Room({ room }) {
  const [roomTime, setroomTime] = useState();
  useEffect(() => {
    console.log(room.room_time);
  }, []);

  return (
    <RoomContainer>
      <RoomContent>
        <RoomText>{room.room_title}</RoomText>
        <RoomText>{room.room_place}</RoomText>
        <RoomText>{room.room_time}</RoomText>
      </RoomContent>
      <RoomButton>
        <RoomDetail room={room} />
      </RoomButton>
    </RoomContainer>
  );
}

export default Room;

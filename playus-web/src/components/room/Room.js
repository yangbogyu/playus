import styled from "styled-components";
import { useEffect, useState } from "react";
import RoomDetail from "./RoomDetail";
import PropTypes from "prop-types";

const RoomContainer = styled.div`
  max-width: 615px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;

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

function Room(props) {
  return (
    <RoomContainer>
      <RoomContent>
        <RoomText></RoomText>
        <RoomText></RoomText>
        <RoomText></RoomText>
      </RoomContent>
      <RoomButton>
        <RoomDetail />
      </RoomButton>
    </RoomContainer>
  );
}

export default Room;

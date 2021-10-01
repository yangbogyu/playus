import styled from "styled-components";
import { useEffect } from "react";
import RoomDetail from "./RoomDetail";

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

const RoomBox = styled.div`
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

function Room(me) {
  const seeRoom = async () => {
    const list = await fetch(`http://localhost:5000/seeRooms/${me}`).then(
      (res) => res.json()
    );
    console.log(me);
    console.log(list);
    return list;
  };

  useEffect(() => {
    seeRoom();
  }, []);

  return (
    <RoomContainer>
      <RoomBox>
        <RoomText>제목</RoomText>
        <RoomText>시간</RoomText>
        <RoomText>장소</RoomText>
      </RoomBox>
      <RoomButton>
        <RoomDetail />
      </RoomButton>
    </RoomContainer>
  );
}
export default Room;

import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomTabs from "../components/main/BottomTabs";
import Header from "../components/main/Header";
import Mark from "../components/main/Mark";
import Room from "../components/room/Room";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding-bottom: 60px;
`;

function Home() {
  const me = localStorage.getItem("LOGIN");
  const [seeRoom, setSeeRoom] = useState();

  useEffect(() => {
    fetch(`http://54.180.112.51:5000/markRooms/${me}`)
      .then((res) => res.json())
      .then(({ MarkRooms }) => {
        setSeeRoom(MarkRooms);
      });
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Mark ami={me} />
        {seeRoom?.map((room) => (
          <Room key={room.room_no} {...room} />
        ))}
      </Container>
      <BottomTabs />
    </div>
  );
}
export default Home;

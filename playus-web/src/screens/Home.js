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
`;

function Home() {
  const me = localStorage.getItem("LOGIN");
  const [seeRoom, setSeeRoom] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/seeRooms/${me}`)
      .then((res) => res.json())
      .then(({ Rooms }) => {
        setSeeRoom(Rooms);
      });
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Mark ami={me} />
        <Room {...seeRoom} />
      </Container>
      <BottomTabs />
    </div>
  );
}
export default Home;

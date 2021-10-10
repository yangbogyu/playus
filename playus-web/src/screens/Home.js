import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/main/Header";
import Mark from "../components/main/Mark";
import Room from "../components/room/Room";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  padding-bottom: 60px;
`;

const Wrapper = styled.div`
  max-width: 615px;
  width: 100%;
  @media screen and (max-width: 615px) {
    max-width: 450px;
  }
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
        <Wrapper>
          <Mark ami={me} />
          {seeRoom?.map((room) => (
            <Room key={room.room_no} {...room} />
          ))}
        </Wrapper>
      </Container>
    </div>
  );
}
export default Home;

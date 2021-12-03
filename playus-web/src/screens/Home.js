import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/main/Header";
import Mark from "../components/main/Mark";
import Room from "../components/room/Room";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

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
    fetch(`${URL}/markRooms/${me}`)
      .then((res) => res.json())
      .then(({ MarkRooms }) => {
        setSeeRoom(MarkRooms);
      });
  }, [me]);

  return (
    <div>
      <Header />
      <Container>
        <Wrapper>
          <Mark />
          {seeRoom?.map((room) => (
            <Room key={room.room_no} {...room} />
          ))}
        </Wrapper>
      </Container>
    </div>
  );
}
export default Home;

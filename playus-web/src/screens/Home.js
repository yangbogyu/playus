import { useEffect } from "react";
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

  return (
    <div>
      <Header />
      <Container>
        <Mark />
        <Room ami={me} />
      </Container>
      <BottomTabs />
    </div>
  );
}
export default Home;

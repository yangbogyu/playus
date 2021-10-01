import { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BottomTabs from "../components/main/BottomTabs";
import Header from "../components/main/Header";
import Room from "../components/room/Room";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const MarkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  max-width: 930px;
`;

const MarkPlace = styled.span`
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

function Home() {
  const seeRoom = async () => {
    const me = localStorage.getItem("LOGIN");
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
    <div>
      <Header />
      <Container>
        <MarkContainer>
          <FontAwesomeIcon icon={faLocationArrow} />
          <MarkPlace>송파구</MarkPlace>
        </MarkContainer>
        <Room />
      </Container>
      <BottomTabs />
    </div>
  );
}
export default Home;

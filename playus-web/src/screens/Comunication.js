import React from "react";
import Header from "../components/main/Header";
import styled from "styled-components";
import ChatRoom from "../components/comment/ChatRoom";

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

function Comunication({ location }) {
  // console.log(location.state);
  return (
    <div>
      <Header />
      <Container>
        <Wrapper>
          <ChatRoom room={location.state}></ChatRoom>
        </Wrapper>
      </Container>
    </div>
  );
}

export default Comunication;

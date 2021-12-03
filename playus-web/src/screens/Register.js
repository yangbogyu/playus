import React from "react";
import styled from "styled-components";
import Header from "../components/main/Header";
import MapContainer from "../components/register/MapContainer";

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

function Register() {
  return (
    <div>
      <Header />
      <Container>
        <Wrapper>
          <MapContainer />
        </Wrapper>
      </Container>
    </div>
  );
}
export default Register;

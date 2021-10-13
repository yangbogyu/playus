import Header from "../components/main/Header";
import styled from "styled-components";

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

export default function Comunication() {
  return (
    <div>
      <Header />
      <Container>
        <Wrapper>업데이트 예정</Wrapper>
      </Container>
    </div>
  );
}

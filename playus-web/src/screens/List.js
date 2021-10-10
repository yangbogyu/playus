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

function List() {
  return (
    <div>
      <Header />
      <Container>
        <Wrapper></Wrapper>
      </Container>
    </div>
  );
}
export default List;

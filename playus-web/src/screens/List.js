import { useEffect, useState } from "react";
import Header from "../components/main/Header";
import styled from "styled-components";
import MasterRoom from "../components/room/MasterRoom";
import PeopleRoom from "../components/room/PeopleRoom";
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

const Info = styled.span`
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

const FormBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px 0px;
  form {
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

function List() {
  const me = localStorage.getItem("LOGIN");
  const [seeMasterList, setSeeMasterList] = useState();
  const [seePeopleList, setSeePeopleList] = useState();

  useEffect(() => {
    fetch(`${URL}/seeRooms/master/${me}`)
      .then((res) => res.json())
      .then(({ MasterRooms }) => {
        setSeeMasterList(MasterRooms);
      });
    fetch(`${URL}/seeRooms/people/${me}`)
      .then((res) => res.json())
      .then(({ PeopleRooms }) => {
        setSeePeopleList(PeopleRooms);
      });
  }, [me]);

  return (
    <div>
      <Header />
      <Container>
        <Wrapper>
          <Info>등록한 방</Info>
          <FormBox>
            {seeMasterList
              ? seeMasterList?.map((room) => (
                  <MasterRoom key={room.room_no} {...room} />
                ))
              : null}
          </FormBox>
          <Info>참가한 방</Info>
          <FormBox>
            {seePeopleList
              ? seePeopleList?.map((room) => (
                  <PeopleRoom key={room.room_no} {...room} />
                ))
              : null}
          </FormBox>
        </Wrapper>
      </Container>
    </div>
  );
}
export default List;

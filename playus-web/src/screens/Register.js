import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import BottomTabs from "../components/main/BottomTabs";
import Header from "../components/main/Header";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import RadioSport from "../components/register/RadioSport";
import FormError from "../components/auth/FormError";
import MapContainer from "../components/register/MapContainer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  padding-bottom: 60px;
`;

const Wrapper = styled.div`
  max-width: 615px;
  width: 100%;
  @media screen and (max-width: 615px) {
    max-width: 450px;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
`;

// 방 제목 = input
// 종목 = checkBox or button
// 시간
// 장소
// 최종 인원 수

function PlusRoom() {
  const { register, errors, formState } = useForm({
    mode: "onChange",
  });

  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("송파 아우름 센터");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };

  return (
    <div>
      <Header />
      <Container>
        <Wrapper>
          <FormBox>
            {/* <form onSubmit={handleSubmit(onSubmitValid)}> */}
            <Input
              ref={register({
                required: "Title is required",
              })}
              name="room_title"
              type="text"
              placeholder="Title"
              hasError={Boolean(errors?.room_title?.message)}
            />
            <FormError message={errors?.room_title?.message} />
            <RadioSport />
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="검색어를 입력하세요"
                onChange={onChange}
                value={InputText}
              />
              <Button type="submit">검색</Button>
            </form>
            <MapContainer searchPlace={Place} />
            <Input
              ref={register({
                required: "Time is required",
              })}
              name="room_time"
              type="text"
              placeholder="Time"
              hasError={Boolean(errors?.room_time?.message)}
            />
            <FormError message={errors?.room_time?.message} />
            <Input
              ref={register({
                required: "Total Members is required",
              })}
              name="room_total"
              type="text"
              placeholder="Total Members"
              hasError={Boolean(errors?.room_total?.message)}
            />
            <FormError message={errors?.room_total?.message} />
            {/* </form> */}
          </FormBox>
        </Wrapper>
      </Container>
      <BottomTabs />
    </div>
  );
}
export default PlusRoom;

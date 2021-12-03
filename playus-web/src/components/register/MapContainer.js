import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormError from "../auth/FormError";
import Input from "../auth/Input";

require("dotenv").config();
const URL = process.env.REACT_APP_API;

const { kakao } = window;

let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const Map = styled.div`
  width: 530px;
  height: 400px;
  margin: 20px;
  @media screen and (max-width: 615px) {
    width: 350px;
    height: 300px;
  }
`;

const FormBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  margin-top: 5px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InputTitle = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  border-radius: 3px;
  margin-top: 5px;
  margin-right: 5px;
  background-color: rgb(216, 216, 216);
  color: rgb(100, 100, 100);
  width: 70px;
`;

const InputText = styled.span`
  font-weight: 600;
  font-size: 10px;
  margin: auto;
`;

export default function MapContainer() {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const me = localStorage.getItem("LOGIN");

  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("서울 시청");

  const [searchPlace, setSearchPlace] = useState("");
  const [address, setAddress] = useState("");

  const onSearchChange = (e) => {
    setSearchPlace(e.target.value);
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  const fetchSubmitValid = async ({
    room_title,
    room_sport,
    room_place,
    room_address,
    room_time,
    room_total,
  }) => {
    console.log({
      room_title,
      room_sport,
      room_place,
      room_address,
      room_time,
      room_total,
    });
    const { createRoom } = await CREATEROOM({
      room_title,
      room_sport,
      room_place,
      room_address,
      room_time,
      room_total,
    });
    if (createRoom === true) {
      alert("성공");
      window.location.reload();
    } else {
      alert("이미 존재한 방입니다.");
    }
  };

  const CREATEROOM = async ({
    room_title,
    room_sport,
    room_place,
    room_address,
    room_time,
    room_total,
  }) => {
    const ok = await fetch(`${URL}/createRooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: me,
        room_title,
        room_sport,
        room_place,
        room_address,
        room_time,
        room_total,
      }),
    }).then((res) => res.json());
    return ok;
  };

  useEffect(() => {
    const container = document.getElementById("Map");
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        setAddress(place.address_name);
        setSearchPlace(place.place_name);

        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [place]);

  return (
    <div>
      <FormBox>
        <form onSubmit={searchSubmit}>
          <Input
            placeholder="검색어를 입력하세요"
            onChange={onChange}
            value={inputText}
          />
          <Button type="submit">검색</Button>
        </form>
        <Map id="Map"></Map>
        <form onSubmit={handleSubmit(fetchSubmitValid)}>
          <InputWrapper>
            <InputTitle>
              <InputText>주소</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "제목 없으면 되나",
              })}
              name="room_title"
              type="text"
              placeholder="농구할사람"
              hasError={Boolean(errors?.room_title?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.room_title?.message} />

          <InputWrapper>
            <InputTitle>
              <InputText>주소</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "종목가 없으면 되나",
              })}
              name="room_sport"
              type="text"
              placeholder="농구 or 축구"
              hasError={Boolean(errors?.room_sport?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.room_sport?.message} />

          <InputWrapper>
            <InputTitle>
              <InputText>제목</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "장소가 없으면 되나",
              })}
              name="room_place"
              type="text"
              placeholder="서울 시청"
              onChange={onSearchChange}
              value={searchPlace}
              hasError={Boolean(errors?.room_place?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.room_place?.message} />

          <InputWrapper>
            <InputTitle>
              <InputText>주소</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "주소가 없으면 되나",
              })}
              name="room_address"
              type="text"
              placeholder="서울 중구 정동 5-5"
              onChange={onAddressChange}
              value={address}
              hasError={Boolean(errors?.room_address?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.room_address?.message} />

          <InputWrapper>
            <InputTitle>
              <InputText>시간</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "시간이 없으면 되나",
              })}
              name="room_time"
              type="text"
              placeholder="2021-10-01 10:00:00"
              hasError={Boolean(errors?.room_time?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.room_time?.message} />

          <InputWrapper>
            <InputTitle>
              <InputText>인원</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "인원이 없으면 되나",
              })}
              name="room_total"
              type="number"
              placeholder="6"
              hasError={Boolean(errors?.room_total?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.room_total?.message} />

          <Button type="submit">방만들기</Button>
        </form>
      </FormBox>
    </div>
  );
}

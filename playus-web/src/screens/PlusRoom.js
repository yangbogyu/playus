import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import BottomTabs from "../components/main/BottomTabs";
import Header from "../components/main/Header";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import RadioSport from "../components/room/RadioSport";
import FormError from "../components/auth/FormError";

// 방 제목 = input
// 종목 = checkBox or button
// 시간
// 장소
// 최종 인원 수

function PlusRoom() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });

  const onSubmitValid = {};

  return (
    <div>
      <Header />
      <AuthLayout>
        <FormBox>
          <form onSubmit={handleSubmit(onSubmitValid)}>
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

            <Input></Input>
            <Input></Input>
            <Input></Input>
          </form>
        </FormBox>
      </AuthLayout>

      <BottomTabs />
    </div>
  );
}
export default PlusRoom;

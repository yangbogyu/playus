import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import Logopng from "../img/PLAYUS.png";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 50%;
  margin-top: 5px;
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
  margin-right: 10px;
  background-color: rgb(216, 216, 216);
  color: rgb(100, 100, 100);
  width: 70px;
`;

const InputText = styled.span`
  font-weight: 600;
  font-size: 10px;
  margin: auto;
`;

function SingUp() {
  // react hooks
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });

  // 유저이름 중복체크 fetch
  const checkUsername = async ({ user_name }) => {
    const ok = await fetch(`${URL}/createAccounts/IDCheck/${user_name}`).then(
      (res) => res.json()
    );
    return ok;
  };

  // 이메일 중복체크 fetch
  const checkEmail = async ({ user_mail }) => {
    const ok = await fetch(`${URL}/createAccounts/mailCheck/${user_mail}`).then(
      (res) => res.json()
    );
    return ok;
  };

  // 핸드폰번호 중복체크 fetch
  const checkPhone = async ({ user_phone }) => {
    const ok = await fetch(
      `${URL}/createAccounts/phoneCheck/${user_phone}`
    ).then((res) => res.json());
    return ok;
  };

  // 회원가입 fetch
  const createAccounts = async ({
    user_name,
    user_pw,
    user_phone,
    user_mail,
    user_sport,
    user_address,
  }) => {
    const ok = await fetch(`${URL}/createAccounts`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name,
        user_pw,
        user_phone,
        user_mail,
        user_sport,
        user_address,
      }),
    }).then((res) => res.json());
    return ok;
  };

  // 회원가입 버튼 클릭시 중복체크 확인 후 회원가입
  const onSubmitValid = async ({
    user_name,
    user_pw,
    user_phone,
    user_mail,
    user_sport,
    user_address,
  }) => {
    // 중복체크 가능 여부 확인
    const { id } = await checkUsername({ user_name });
    const { mail } = await checkEmail({ user_mail });
    const { phone } = await checkPhone({ user_phone });

    // undefined한 값들 null로 변환
    if (user_sport || user_address === undefined) {
      if (user_sport === undefined) {
        user_sport = "";
      } else if (user_address === undefined) {
        user_address = "";
      }
    }

    // 세가지 중복체크가 true 이면 회원가입 가능
    if (id && mail && phone === true) {
      // signUp
      createAccounts({
        user_name,
        user_pw,
        user_phone,
        user_mail,
        user_sport,
        user_address,
      });
      alert("성공!");
    } else {
      alert("이미 가입된 아이디 입니다.");
    }
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <Logo src={Logopng} />
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <InputWrapper>
            <InputTitle>
              <InputText>이름</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "사용자 이름이 없으면 되나",
              })}
              name="user_name"
              type="text"
              placeholder="사용할 아이디"
              hasError={Boolean(errors?.user_name?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.user_name?.message} />
          <InputWrapper>
            <InputTitle>
              <InputText>비밀번호</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "비밀번호가 없으면 되나",
              })}
              name="user_pw"
              type="password"
              placeholder="사용할 비밀번호"
              hasError={Boolean(errors?.user_pw?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.user_pw?.message} />
          <InputWrapper>
            <InputTitle>
              <InputText>핸드폰</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "핸드폰 번호가 없으면 되나",
              })}
              name="user_phone"
              type="tel"
              placeholder="핸드폰 번호"
              hasError={Boolean(errors?.user_phone?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.user_phone?.message} />
          <InputWrapper>
            <InputTitle>
              <InputText>이메일</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: "이메일이 없으면 되나",
              })}
              name="user_mail"
              type="email"
              placeholder="이메일"
              hasError={Boolean(errors?.user_mail?.message)}
            />
          </InputWrapper>
          <FormError message={errors?.user_mail?.message} />
          <InputWrapper>
            <InputTitle>
              <InputText>종목</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: false,
              })}
              name="user_sport"
              type="text"
              placeholder="농구 OR 축구"
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>
              <InputText>주소</InputText>
            </InputTitle>
            <Input
              ref={register({
                required: false,
              })}
              name="user_address"
              type="text"
              placeholder="경기 성남시 수정구"
            />
          </InputWrapper>
          <Button
            type="submit"
            value="회원가입"
            disabled={!formState.isValid}
          />
        </form>
      </FormBox>
      <BottomBox cta="아이디 있지?" linkText="로그인" link={routes.home} />
    </AuthLayout>
  );
}
export default SingUp;

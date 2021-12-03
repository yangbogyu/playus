import { useEffect, useState } from "react";
import Header from "../components/main/Header";
import styled from "styled-components";
import Input from "../components/auth/Input";
import ShowRating from "../components/rating/ShowRating";
import { useForm } from "react-hook-form";
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

const FormBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  justify-items: center;
  flex-direction: column;
  form {
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const UsernameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
`;

const Username = styled.span`
  margin-top: 2px;
  font-size: 15px;
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

const UserAddr = styled.span`
  margin-top: 15px;
  font-size: 13px;
  font-weight: 600;
  color: rgb(100, 100, 100);
  margin-left: 4px;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  margin-top: 20px;
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

function User() {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const me = localStorage.getItem("LOGIN");
  const [address, setAddress] = useState();
  const [sport, setSport] = useState();

  const fetchSubmitValid = async ({ user_sport, user_address }) => {
    const { updateStar } = await UPDATESTAR({
      user_sport,
      user_address,
    });
    if (updateStar === true) {
      alert("성공");
      window.location.reload();
    }
  };

  const UPDATESTAR = async ({ user_sport, user_address }) => {
    const ok = await fetch(`${URL}/updateStars`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: me,
        user_sport,
        user_address,
      }),
    }).then((res) => res.json());
    return ok;
  };

  useEffect(() => {
    fetch(`${URL}/seeMarks/${me}`)
      .then((res) => res.json())
      .then(({ Mark }) => {
        setAddress(Mark.user_address);
        setSport(Mark.user_sport);
      });
  }, [me]);

  return (
    <div>
      <Header />
      <Container>
        <Wrapper>
          <FormBox>
            <UsernameWrapper>
              <Username>{me}</Username>
              <ShowRating user={me} />
            </UsernameWrapper>
            <UserAddr>{sport}</UserAddr>
            <UserAddr>{address}</UserAddr>
          </FormBox>
          <FormBox>
            <form onSubmit={handleSubmit(fetchSubmitValid)}>
              <InputWrapper>
                <InputTitle>
                  <InputText>종목</InputText>
                </InputTitle>
                <Input
                  ref={register({
                    required: "종목이 없으면 되나",
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
                    required: "주소가 없으면 되나",
                  })}
                  name="user_address"
                  type="text"
                  placeholder="경기 성남시 수정구"
                />
              </InputWrapper>
              <Button type="submit">바꾸기</Button>
            </form>
          </FormBox>
        </Wrapper>
      </Container>
    </div>
  );
}
export default User;

import { useEffect, useState } from "react";
import Header from "../components/main/Header";
import styled from "styled-components";
import Input from "../components/auth/Input";
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

const Username = styled.span`
  margin-top: 2px;
  font-size: 15px;
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

const UserAddr = styled.span`
  margin-top: 15px;
  font-size: 14px;
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
  border-radius: 3px;

  margin-top: 5px;
  margin-right: 10px;

  background-color: rgb(216, 216, 216);
  color: rgb(100, 100, 100);

  padding: 10px;
  font-weight: 600;
  text-align: center;

  width: 80px;
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
            <Username>{me}</Username>
            <UserAddr>{address}</UserAddr>
          </FormBox>
          <FormBox>
            <form onSubmit={handleSubmit(fetchSubmitValid)}>
              <InputWrapper>
                <InputTitle>Sport</InputTitle>
                <Input
                  ref={register({
                    required: "Sport is required",
                  })}
                  name="user_sport"
                  type="text"
                  placeholder="ex) 농구 OR 축구"
                />
              </InputWrapper>
              <InputWrapper>
                <InputTitle>Addr</InputTitle>
                <Input
                  ref={register({
                    required: "Address Members is required",
                  })}
                  name="user_address"
                  type="text"
                  placeholder="ex) 경기 성남시 수정구"
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

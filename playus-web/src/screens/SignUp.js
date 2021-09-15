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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TLogo = styled.h1`
  margin-top: 12px;
  font-size: 20px;
  font-weight: 600;
`;

const Cinput = styled.div`
  display: flex;
  width: 100%;
`;

const Cbutton = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 5px;
  margin-left: 5px;

  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  font-weight: 600;
  width: 30%;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`;

function SingUp() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = ({ user_name, user_pw, user_phone, user_mail }) => {
    fetch("http://localhost:5000/createAccounts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name,
        user_pw,
        user_phone,
        user_mail,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  const onCheckValid = ({ user_name }) => {
    fetch(`http://localhost:5000/createAccounts/${user_name}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.id === true) {
          alert("It's a usable 'Username'");
        } else if (res.id === false) {
          alert("This 'Username' is not available.");
        }
      });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <TLogo>Playus</TLogo>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <form onSubmit={handleSubmit(onCheckValid)}>
            <Cinput>
              <Input
                ref={register({
                  required: "Username is required.",
                })}
                name="user_name"
                type="text"
                placeholder="Username"
                hasError={Boolean(errors?.user_name?.message)}
              />
              <Cbutton
                type="submit"
                value="Check"
                disabled={!formState.isValid}
              />
            </Cinput>
          </form>
          <FormError message={errors?.user_name?.message} />
          <Input
            ref={register({
              required: "Password is required.",
            })}
            name="user_pw"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.user_pw?.message)}
          />
          <FormError message={errors?.user_pw?.message} />
          <Input
            ref={register({
              required: "Phone is required.",
            })}
            name="user_phone"
            type="text"
            placeholder="CheckPassword"
            hasError={Boolean(errors?.user_phone?.message)}
          />
          <FormError message={errors?.user_phone?.message} />
          <Input
            ref={register({
              required: "Email is required.",
            })}
            name="user_mail"
            type="text"
            placeholder="Email"
            hasError={Boolean(errors?.user_mail?.message)}
          />
          <FormError message={errors?.user_mail?.message} />
          <Button type="submit" value="Sign Up" disabled={!formState.isValid} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
export default SingUp;

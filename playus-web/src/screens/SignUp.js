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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 50%;
  margin-top: 5px;
`;

function SingUp() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });

  const checkUsername = async ({ user_name }) => {
    const ok = await fetch(
      `http://localhost:5000/createAccounts/IDCheck/${user_name}`
    ).then((res) => res.json());
    return ok;
  };

  const checkEmail = async ({ user_mail }) => {
    const ok = await fetch(
      `http://localhost:5000/createAccounts/mailCheck/${user_mail}`
    ).then((res) => res.json());
    return ok;
  };

  const checkPhone = async ({ user_phone }) => {
    const ok = await fetch(
      `http://localhost:5000/createAccounts/phoneCheck/${user_phone}`
    ).then((res) => res.json());
    return ok;
  };

  const createAccount = async ({
    user_name,
    user_pw,
    user_phone,
    user_mail,
  }) => {
    const ok = await fetch("http://localhost:5000/createAccounts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name,
        user_pw,
        user_phone,
        user_mail,
      }),
    }).then((res) => res.json());
    return ok;
  };

  const onSubmitValid = async ({
    user_name,
    user_pw,
    user_phone,
    user_mail,
  }) => {
    const { id } = await checkUsername({ user_name });
    const { mail } = await checkEmail({ user_mail });
    const { phone } = await checkPhone({ user_phone });

    if (id && mail && phone === true) {
      const { createAccount } = createAccount({
        user_name,
        user_pw,
        user_phone,
        user_mail,
      });
    } else {
      alert("You can't sign up as a member. Try again");
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
          <Input
            ref={register({
              required: "Username is required.",
            })}
            name="user_name"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.user_name?.message)}
          />
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
            placeholder="Phone"
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

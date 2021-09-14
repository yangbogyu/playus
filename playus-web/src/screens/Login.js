import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const Logo = styled.h1`
  margin-top: 7px;
  font-size: 20px;
  font-weight: 600;
`;

const SignUp = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

function Login() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  // register에 부합한 -> data
  const onSubmitValid = (data) => {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        content: data,
      }),
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <Logo>Playus</Logo>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Username is required",
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "Password is required.",
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value="Log in"
            disabled={!formState.isValid}
            // onClick={() => isLoggedInVar(true)}
          />
        </form>
        <Separator />
        <SignUp>
          Don't have an account?
          <Link to={routes.signUp}>Sign up</Link>
        </SignUp>
      </FormBox>
    </AuthLayout>
  );
}
export default Login;

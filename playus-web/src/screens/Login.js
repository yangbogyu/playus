import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import Logopng from "../img/PLAYUS.png";

const Logo = styled.img`
  width: 50%;
  margin-top: 5px;
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
  const { register, handleSubmit, errors, formState, setError } = useForm({
    mode: "onChange",
  });

  const fetchLogin = async ({ user_name, user_pw }) => {
    const ok = await fetch("http://localhost:5000/logins", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name,
        user_pw,
      }),
    }).then((res) => res.json());
    return ok;
  };

  // register에 부합한 -> data
  const onSubmitValid = async ({ user_name, user_pw }) => {
    const { login } = await fetchLogin({ user_name, user_pw });
    if (login === true) {
      logUserIn(user_name);
    } else if (login === false) {
      alert("Please enter your 'Usernaem' and 'Password' correctly.");
    }
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <Logo src={Logopng} />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Username is required",
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
          <Button type="submit" value="Log in" disabled={!formState.isValid} />
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

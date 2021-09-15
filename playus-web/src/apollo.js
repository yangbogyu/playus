import { makeVar } from "@apollo/client";

const LOGIN = "LOGIN";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(LOGIN)));
export const darkModeVar = makeVar(false);

export const logUserIn = (user_name) => {
  localStorage.setItem(LOGIN, user_name);
  isLoggedInVar(true);
};

export const logUserout = () => {
  localStorage.removeItem(LOGIN);
  window.location.reload();
};

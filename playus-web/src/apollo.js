import { makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);

// export const logUserIn = () => {
//   isLoggedInVar(true);
// };

export const logUserout = () => {
  isLoggedInVar(false);
};

import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useState } from "react";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 10px;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px;
  font-weight: 600;
  width: fit-content;
`;

function UpdateRating({ user }) {
  const me = localStorage.getItem("LOGIN");
  const [value, setValue] = useState(5);

  const updateRating = () => {
    fetch(`${URL}/rating/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: me,
        rating_user: user,
        rating_data: value,
      }),
    })
      .then((res) => res.json())
      .then(({ Rating }) => {
        console.log(Rating);
      });
  };

  return (
    <Container>
      <Stack spacing={1}>
        <Rating
          name="half-rating-read"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        ></Rating>
      </Stack>
    </Container>
  );
}

export default UpdateRating;

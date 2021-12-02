import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const Container = styled.div`
  margin-left: 20px;
`;

function ShowRating({ user }) {
  const [value, setValue] = useState(5);

  useEffect(() => {
    fetch(`${URL}/rating/${user}`)
      .then((res) => res.json())
      .then(({ Rating }) => {
        setValue(Rating);
      });
  }, [user]);

  return (
    <Container>
      <Stack spacing={1}>
        <Rating
          name="half-rating-read"
          value={value}
          precision={0.5}
          size="small"
          readOnly
        ></Rating>
      </Stack>
    </Container>
  );
}

export default ShowRating;

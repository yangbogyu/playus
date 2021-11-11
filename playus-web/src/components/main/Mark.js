import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const MarkContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MarkWrapper = styled.div`
  margin-bottom: 20px;
`;

const MarkPlace = styled.span`
  margin-top: 2px;
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

export default function Mark() {
  const [place, setPlace] = useState();

  useEffect(() => {
    const me = localStorage.getItem("LOGIN");
    fetch(`${URL}/seeMarks/${me}`)
      .then((res) => res.json())
      .then(({ Mark }) => {
        Mark.user_address ? setPlace(Mark.user_address) : setPlace("미설정");
      });
  }, []);

  return (
    <MarkContainer>
      <MarkWrapper>
        <FontAwesomeIcon icon={faLocationArrow} />
        <MarkPlace>{place}</MarkPlace>
      </MarkWrapper>
    </MarkContainer>
  );
}

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const MarkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  max-width: 930px;
  margin-bottom: 10px;
`;

const MarkPlace = styled.span`
  margin-top: 2px;
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

export default function Mark({ ami }) {
  const [place, setPlace] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/seeMarks/${ami}`)
      .then((res) => res.json())
      .then(({ Mark }) => {
        console.log(Mark);
        console.log(ami);
        {
          Mark.user_place ? setPlace(Mark.user_place) : setPlace("미설정");
        }
      });
  }, []);

  return (
    <MarkContainer>
      <FontAwesomeIcon icon={faLocationArrow} />

      <MarkPlace>{place}</MarkPlace>
    </MarkContainer>
  );
}

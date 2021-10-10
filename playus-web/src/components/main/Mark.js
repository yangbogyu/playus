import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

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

export default function Mark({ ami }) {
  const [place, setPlace] = useState();

  useEffect(() => {
    fetch(`http://54.180.112.51:5000/seeMarks/${ami}`)
      .then((res) => res.json())
      .then(({ Mark }) => {
        {
          Mark.user_place ? setPlace(Mark.user_place) : setPlace("미설정");
        }
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

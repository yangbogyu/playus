import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const MarkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  max-width: 930px;
`;

const MarkPlace = styled.h1`
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

export default function Mark() {
  const seeMark = async () => {
    const me = localStorage.getItem("LOGIN");
    const mark = await fetch(`http://localhost:5000/seeMarks/${me}`)
      .then((res) => res.json())
      .then(({ Mark }) => {
        return Mark[0].user_sport;
      });
  };

  useEffect(() => {
    seeMark();
  }, []);

  return (
    <MarkContainer>
      <FontAwesomeIcon icon={faLocationArrow} />
      <MarkPlace value={seeMark()} />
    </MarkContainer>
  );
}

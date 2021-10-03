import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const InfoTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin: 7px;
  padding-left: 20px;
  color: rgb(100, 100, 100);
`;

const InfoContent = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 7px;
  margin-left: 10px;
  color: rgb(110, 110, 110);
`;

export default function RoomInfo({ title, content }) {
  return (
    <InfoContainer>
      <InfoTitle>{title}</InfoTitle>
      <InfoContent>{content}</InfoContent>
    </InfoContainer>
  );
}

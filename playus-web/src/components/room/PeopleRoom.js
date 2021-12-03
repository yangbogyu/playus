import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";

const Container = styled.div`
  display: flex;
  margin: 10px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const RoomContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px;
`;

const RoomText = styled.span`
  margin: 10px;
  font-weight: 600;
  color: rgb(142, 142, 142);
  margin-left: 15px;
`;

function PeopleRoom({
  room_no,
  room_place,
  room_address,
  room_sport,
  room_time,
  room_title,
  room_total,
  room_user,
  user_name,
  room_createdAt,
}) {
  return (
    <Link
      to={{
        pathname: `${routes.room}`,
        state: {
          room_no,
          room_place,
          room_address,
          room_sport,
          room_time,
          room_title,
          room_total,
          room_user,
          user_name,
          room_createdAt,
        },
      }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Container>
        <RoomContent>
          <RoomText>{room_place}</RoomText>
          <RoomText>{room_time}</RoomText>
        </RoomContent>
      </Container>
    </Link>
  );
}
export default PeopleRoom;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { faPen, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
require("dotenv").config();
const URL = process.env.REACT_APP_API;

const FormBox = styled.div`
  background-color: white;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 10px;
  display: flex;
  justify-items: center;
  flex-direction: column;
`;

const InfoHeader = styled.div`
  padding: 10px 17px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const InfoContainer = styled.div`
  margin: 10px 10px 10px 10px;
  padding: 10px 7px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: rgb(38, 38, 38);
  margin-left: 4px;
`;

const NoticeWrapper = styled.div`
  padding: 4px;
  margin-top: 10px;
`;

const NoticeText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: rgb(38, 38, 38);
`;

const NoticeCreatedAt = styled.span`
  margin-left: 4px;
  margin-top: 7px;
  font-size: 10px;
  color: rgb(150, 150, 150);
`;

const ChatData = styled.div``;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin: 10px 5px;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: fit-content;
`;

const RatingWrapper = styled.div`
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

const MemberButton = styled.button`
  border: none;
  background-color: white;
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  width: fit-content;
  margin: 17px 20px 0px 17px;
`;

const Input = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 3px;
  padding: 10px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 10px;

  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

function ChatRoom({ room }) {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const me = localStorage.getItem("LOGIN");
  const [seeMembers, setSeeMembers] = useState();
  const [master, setMaster] = useState();
  const [notice, setNotice] = useState();
  const [rating, setRating] = useState(5);

  const [showMem, setShowMem] = useState(false);
  const [showStar, setShowStar] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const handleMemClose = () => setShowMem(false);
  const handleMemShow = () => setShowMem(true);

  const handleStarClose = () => setShowStar(false);
  const handleStarShow = () => setShowStar(true);

  const handleNoticeClose = () => setShowNotice(false);
  const handleNoticeShow = () => setShowNotice(true);

  const SubmitValid = async ({ payload }) => {
    const { notice } = await noticeUpdate({ payload });
    if (notice === true) {
      alert("글이 작성 되었습니다.");
      window.location.reload();
    }
  };

  const noticeUpdate = async ({ payload }) => {
    const ok = await fetch(`${URL}/notice/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_no: room.room_no,
        user_name: room.user_name,
        room_notice: payload,
      }),
    }).then((res) => res.json());
    return ok;
  };

  const updateRating = () => {
    fetch(`${URL}/rating/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: me,
        rating_user: room.user_name,
        rating_data: rating,
      }),
    })
      .then((res) => res.json())
      .then(({ createRating }) => {
        if (createRating === true) {
          alert("평점 입력이 완료되었소");
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    fetch(`${URL}/seeRooms/list/${room.room_no}`)
      .then((res) => res.json())
      .then(({ RoomList }) => {
        setSeeMembers(RoomList);
        for (var i = 0; i < RoomList.length; i++) {
          if (RoomList[i].user_static === "M") {
            setMaster(RoomList[i].user_name);
          }
        }
      });
    fetch(`${URL}/notice/${room.room_no}`)
      .then((res) => res.json())
      .then(({ notice }) => {
        setNotice(notice);
      });
  }, [room]);

  return (
    <div>
      <FormBox>
        <InfoHeader>
          <Username>{room.room_title}</Username>
          <Button onClick={handleStarShow}>평점주기</Button>
          <Modal show={showStar} onHide={handleStarClose}>
            <Modal.Header>
              <FontAwesomeIcon
                icon={faWindowClose}
                onClick={handleStarClose}
                size="lg"
              />
              <Username>평점주기</Username>
              <Button onClick={updateRating}>확인</Button>
            </Modal.Header>
            <Modal.Body>
              <RatingContainer>
                <InfoWrapper>
                  <Username>{master}</Username>
                </InfoWrapper>
                <RatingWrapper>
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      value={rating}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                    ></Rating>
                  </Stack>
                </RatingWrapper>
              </RatingContainer>
            </Modal.Body>
          </Modal>
        </InfoHeader>
        <InfoContainer>
          <InfoWrapper>
            <Username>{master}</Username>
            {room.user_name === me ? (
              <FontAwesomeIcon icon={faPen} onClick={handleNoticeShow} />
            ) : null}
          </InfoWrapper>
          <NoticeCreatedAt>{room.room_createdAt}</NoticeCreatedAt>
          <NoticeWrapper>
            <NoticeText>{notice}</NoticeText>
          </NoticeWrapper>
          <Modal show={showNotice} onHide={handleNoticeClose}>
            <form onSubmit={handleSubmit(SubmitValid)}>
              <Modal.Header>
                <FontAwesomeIcon
                  icon={faWindowClose}
                  onClick={handleNoticeClose}
                  size="lg"
                />
                <Button type="submit">확인</Button>
              </Modal.Header>
              <Modal.Body>
                <Username>공지</Username>
                <Input
                  ref={register}
                  name="payload"
                  type="text"
                  placeholder="남기고 싶은 말을 써주이소."
                />
              </Modal.Body>
            </form>
          </Modal>
        </InfoContainer>
      </FormBox>

      <FormBox>
        <ChatData>
          <MemberButton onClick={handleMemShow}>참가인원</MemberButton>
          <div>
            <Modal show={showMem} onHide={handleMemClose} animation={false}>
              <Modal.Header>
                <FontAwesomeIcon
                  icon={faWindowClose}
                  onClick={handleMemClose}
                  size="lg"
                />
                <Username>참가인원</Username>
                <Button onClick={handleMemClose}>확인</Button>
              </Modal.Header>
              <Modal.Body>
                <UserList>
                  {seeMembers
                    ? seeMembers?.map((member) => (
                        <Username key={member.user_name}>
                          {member.user_name}
                        </Username>
                      ))
                    : null}
                </UserList>
              </Modal.Body>
            </Modal>
          </div>
          <Comments room={room} />
        </ChatData>
      </FormBox>
    </div>
  );
}

export default ChatRoom;

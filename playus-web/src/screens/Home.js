import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Nav/Navbar";
import { Tabs, Tab } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Splace = styled.div``;

const Place = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const RoomBox = styled.div`
  width: 80%;
  height: 50px;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 2px solid ${(props) => props.theme.borderColor};
  margin-top: 50px;
  box-sizing: border-box;
`;

const Icon = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
`;

export default function Home() {
  const [key, setKey] = useState("home");
  return (
    <div>
      <Navbar />
      <Wrapper></Wrapper>
      <Icon>
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </Icon>
    </div>
  );
}

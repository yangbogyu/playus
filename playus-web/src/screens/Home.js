import React, { useState } from "react";
import styled from "styled-components";
import { Container, Nav, Navbar } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import BottomTabs from "../components/Tabs/BottomTabs";

const Splace = styled.div``;

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

export default function Home() {
  return (
    <div>
      <BottomTabs />
    </div>
  );
}

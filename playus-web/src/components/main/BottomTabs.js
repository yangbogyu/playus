import React from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faList,
  faUser,
  faBasketballBall,
} from "@fortawesome/free-solid-svg-icons";

const PPlace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Place = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 930px;
`;

const Tabicon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TabTitle = styled.h1`
  font-size: 12px;
  font-weight: 600;
  margin-top: 7px;
  color: rgb(142, 142, 142);
`;

export default function BottomTabs() {
  return (
    <PPlace>
      <Place>
        <Nav justify variant="tabs">
          <Nav.Item>
            <Nav.Link href="/">
              <Tabicon>
                <FontAwesomeIcon
                  icon={faBasketballBall}
                  size="lg"
                  color="rgb(38, 38, 38)"
                />
                <TabTitle>메인화면</TabTitle>
              </Tabicon>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/list">
              <Tabicon>
                <FontAwesomeIcon
                  icon={faList}
                  size="lg"
                  color="rgb(38, 38, 38)"
                />
                <TabTitle>방리스트</TabTitle>
              </Tabicon>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/user">
              <Tabicon>
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  color="rgb(38, 38, 38)"
                />
                <TabTitle>내정보</TabTitle>
              </Tabicon>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Place>
    </PPlace>
  );
}

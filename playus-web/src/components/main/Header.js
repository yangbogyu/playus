import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "../../img/PLAYUS.png";
import {
  faList,
  faPlus,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { logUserout } from "../../apollo";
import routes from "../../routes";

const SHeader = styled.header`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
`;

const Column = styled.div``;

const Logo = styled.img`
  width: 25%;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-left: 15px;
`;

export default function Header() {
  return (
    <div>
      <SHeader>
        <Wrapper>
          <Column>
            <Link
              to={routes.home}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Logo src={LogoImg} />
            </Link>
          </Column>
          <Column>
            <IconsContainer>
              <Icon>
                <Link
                  to={routes.register}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </Icon>
              <Icon>
                <Link
                  to={routes.list}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <FontAwesomeIcon icon={faList} />
                </Link>
              </Icon>
              <Icon>
                <Link
                  to={routes.user}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </Icon>
              <Icon onClick={() => logUserout()}>
                <Link
                  to={routes.home}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </Link>
              </Icon>
            </IconsContainer>
          </Column>
        </Wrapper>
      </SHeader>
    </div>
  );
}

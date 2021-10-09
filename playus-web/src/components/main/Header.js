import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "../../img/PLAYUS.png";
import { faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
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

const Icon = styled.span`
  margin-left: 15px;
`;

export default function Header() {
  return (
    <div>
      <SHeader>
        <Wrapper>
          <Column>
            <Logo src={LogoImg} />
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
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  onClick={() => logUserout()}
                />
              </Icon>
            </IconsContainer>
          </Column>
        </Wrapper>
      </SHeader>
    </div>
  );
}

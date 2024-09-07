import { useNavigate } from "react-router-dom";
import { Container } from "../../utils";
import WatchList from "../WatchList";
import CurrencySelect from "../CurrencySelect";
import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  box-shadow: 0px 1px 10px 0px #0000001f;
  box-shadow: 0px 4px 5px 0px #00000024;
  box-shadow: 0px 2px 4px -1px #00000033;
  background-color: rgb(20, 22, 26);
  padding: 10px;
  color: #fff;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.15px;
  color: #87ceeb;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <Container>
        <HeaderWrapper>
          <Logo onClick={() => navigate("/")}>CRYPTOFOLIO</Logo>
          <Actions>
            <CurrencySelect />
            <WatchList />
          </Actions>
        </HeaderWrapper>
      </Container>
    </HeaderContainer>
  );
}

export default Header;

import * as S from "./styles";
import duckkaebiLogo from "../../assets/image/main/duckkaebi_logo.svg";
import tablerUserIcon from "../../assets/image/main/tabler_user.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <S.Header>
      <S.HeaderContent>
        <S.HeaderLeft>
          <S.Logo as={Link} to="/">
            <img
              src={duckkaebiLogo}
              alt="Duckkaebi Logo"
              style={{ width: "100%", height: "100%" }}
            />
          </S.Logo>
          <S.Nav>
            <S.NavLink as={Link} to="/problems">
              문제 관리
            </S.NavLink>
            <S.NavLink as={Link} to="/contests">
              대회 관리
            </S.NavLink>
            <S.NavLink as={Link} to="/courses">
              코스 관리
            </S.NavLink>
            <S.NavLink as={Link} to="/users">
              유저 관리
            </S.NavLink>
          </S.Nav>
        </S.HeaderLeft>
        <S.UserIcon as={Link} to="/profile">
          <img
            src={tablerUserIcon}
            alt="user"
            style={{ width: "100%", height: "100%" }}
          />
        </S.UserIcon>
      </S.HeaderContent>
    </S.Header>
  );
};

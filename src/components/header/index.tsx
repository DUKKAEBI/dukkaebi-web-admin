import * as S from "./styles";
import duckkaebiLogo from "../../assets/image/main/duckkaebi_logo.svg";
import tablerUserIcon from "../../assets/image/main/tabler_user.svg";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();
  const isCourses = pathname.startsWith("/courses");
  const isProblems = pathname.startsWith("/problems");
  const isContests = pathname.startsWith("/contests");
  const isNotifications = pathname.startsWith("/notifications");
  const isUsers = pathname.startsWith("/users");

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
            <S.NavLink as={Link} to="/problems" $active={isProblems}>
              문제 관리
            </S.NavLink>
            <S.NavLink as={Link} to="/contests" $active={isContests}>
              대회 관리
            </S.NavLink>
            <S.NavLink as={Link} to="/course" $active={isCourses}>
              코스 관리
            </S.NavLink>
            <S.NavLink as={Link} to="/users" $active={isUsers}>
              유저 관리
            </S.NavLink>
            <S.NavLink as={Link} to="/notifications" $active={isNotifications}>
              공지사항
            </S.NavLink>
          </S.Nav>
        </S.HeaderLeft>
      </S.HeaderContent>
    </S.Header>
  );
};

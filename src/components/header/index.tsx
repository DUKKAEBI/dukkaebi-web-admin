import { useState, useEffect } from "react";
import * as S from "./styles";
import duckkaebiLogo from "../../assets/image/main/duckkaebi_logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isCourses = pathname.startsWith("/courses");
  const isProblems = pathname.startsWith("/problems");
  const isContests = pathname.startsWith("/contests");
  const isNotifications = pathname.startsWith("/notifications");
  const isUsers = pathname.startsWith("/users");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

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
        <S.HeaderRight>
          {isLoggedIn ? (
            <S.AuthButton className="logout" onClick={handleLogout}>
              로그아웃
            </S.AuthButton>
          ) : (
            <S.AuthButton className="login" onClick={handleLogin}>
              로그인
            </S.AuthButton>
          )}
        </S.HeaderRight>
      </S.HeaderContent>
    </S.Header>
  );
};

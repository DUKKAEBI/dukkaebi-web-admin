import * as S from "../../../page/login/style";

// 로그인 페이지 헤더: 제목과 부제목 표시
interface LoginHeaderProps {}

export function LoginHeader({}: LoginHeaderProps) {
  return (
    <>
      <S.Title>로그인</S.Title>
      <S.Subtitle>서비스를 시작하려면 로그인 하세요.</S.Subtitle>
    </>
  );
}

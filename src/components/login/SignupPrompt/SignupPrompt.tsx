import * as S from "../../../page/login/style";

// 회원가입 유도 섹션
interface SignupPromptProps {
  handleSignup: () => void;
}

export function SignupPrompt({ handleSignup }: SignupPromptProps) {
  return (
    <S.SignupSection>
      <S.SignupText>아직 계정이 없으신가요?</S.SignupText>
      <S.SignupLink type="button" onClick={handleSignup}>
        회원가입
      </S.SignupLink>
    </S.SignupSection>
  );
}

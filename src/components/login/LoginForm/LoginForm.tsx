import * as S from "../../../page/login/style";
import iconMessage from "../../../assets/image/auth/Message.png";
import iconChat from "../../../assets/image/auth/Chat.png";
import iconHide from "../../../assets/image/auth/Hide.png";
import iconFilled from "../../../assets/image/auth/Filled.png";

// 로그인 폼: ID, 비밀번호 입력 및 로그인 버튼
interface LoginFormProps {
  formData: {
    id: string;
    password: string;
  };
  showPassword: boolean;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTogglePassword: () => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function LoginForm({
  formData,
  showPassword,
  isLoading,
  handleInputChange,
  handleTogglePassword,
  handleLogin,
}: LoginFormProps) {
  return (
    <form onSubmit={handleLogin}>
      <S.FormGroup>
        <S.InputWrapper>
          <S.InputIcon src={iconMessage} alt="ID icon" />
          <S.Input
            id="id"
            name="id"
            type="text"
            placeholder="ID"
            value={formData.id}
            onChange={handleInputChange}
            required
          />
        </S.InputWrapper>
      </S.FormGroup>

      <S.FormGroup>
        <S.PasswordInputWrapper>
          <S.InputIcon src={iconChat} alt="Password icon" />
          <S.Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <S.TogglePasswordBtn
            type="button"
            onClick={handleTogglePassword}
            aria-label="Toggle password visibility"
          >
            <S.PasswordToggleIcon
              src={showPassword ? iconFilled : iconHide}
              alt="Toggle password"
            />
          </S.TogglePasswordBtn>
        </S.PasswordInputWrapper>
      </S.FormGroup>

      <S.FormGroup>
        <S.LoginButton type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </S.LoginButton>
      </S.FormGroup>
    </form>
  );
}

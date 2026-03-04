import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/authApi";
import * as S from "./style";
import { LoginHeader, LoginForm, SignupPrompt } from "../../components/login";

// Main Component
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signIn({
        loginId: formData.id,
        password: formData.password,
      });

      const { refreshToken, accessToken } = response.data ?? {};

      if (!accessToken) {
        throw new Error("No access token in sign-in response");
      }

      localStorage.setItem("refreshToken", String(refreshToken));
      localStorage.setItem("accessToken", String(accessToken));

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <S.LoginContainer>
      <S.LeftSection>
        <LoginHeader />

        <LoginForm
          formData={formData}
          showPassword={showPassword}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleTogglePassword={handleTogglePassword}
          handleLogin={handleLogin}
        />

        <SignupPrompt handleSignup={handleSignup} />
      </S.LeftSection>

      <S.RightSection />
    </S.LoginContainer>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import axiosInstance from "../../../api/axiosInstance";
import * as S from "./styles";

interface FormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image?: string;
}

const ContestCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.post("/contests", formData);
      navigate("/contests");
    } catch (error) {
      console.error("Failed to create contest:", error);
      alert("대회 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/contests");
  };

  return (
    <S.Container>
      <Header />
      <S.Main>
        <S.FormContainer>
          <S.Title>대회 생성</S.Title>
          <S.Subtitle>새로운 알고리즘 대회를 생성합니다.</S.Subtitle>

          <S.Form onSubmit={handleSubmit}>
            <S.FormGroup>
              <S.Label htmlFor="title">대회 이름</S.Label>
              <S.Input
                id="title"
                name="title"
                type="text"
                placeholder="대회 이름을 입력하세요"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="description">대회 설명</S.Label>
              <S.TextArea
                id="description"
                name="description"
                placeholder="대회에 대한 설명을 입력하세요"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                required
              />
            </S.FormGroup>

            <S.Row>
              <S.FormGroup>
                <S.Label htmlFor="startDate">시작 일시</S.Label>
                <S.Input
                  id="startDate"
                  name="startDate"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="endDate">종료 일시</S.Label>
                <S.Input
                  id="endDate"
                  name="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </S.FormGroup>
            </S.Row>

            <S.ButtonGroup>
              <S.CancelButton type="button" onClick={handleCancel}>
                취소
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "생성 중..." : "대회 생성"}
              </S.SubmitButton>
            </S.ButtonGroup>
          </S.Form>
        </S.FormContainer>
      </S.Main>
      <Footer />
    </S.Container>
  );
};

export default ContestCreate;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./styles";

interface FormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const ContestCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onCancel = () => navigate("/contests");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: integrate API once ready
      console.log("submit", form);
      navigate("/contests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Main>
        <S.FormContainer>
          <S.Title>대회 수정</S.Title>

          <S.Form onSubmit={onSubmit}>
            <S.Group>
              <S.Label htmlFor="title">대회 제목</S.Label>
              <S.Input
                id="title"
                name="title"
                placeholder=""
                value={form.title}
                onChange={onChange}
              />
            </S.Group>

            <S.Group>
              <S.Label htmlFor="description">대회 설명</S.Label>
              <S.TextArea
                id="description"
                name="description"
                placeholder=""
                value={form.description}
                onChange={onChange}
              />
            </S.Group>

            <S.Group>
              <S.Label htmlFor="startDate">대회 시작 날짜</S.Label>
              <S.DateInput
                id="startDate"
                name="startDate"
                type="date"
                placeholder="YYYY / MM / DD"
                value={form.startDate}
                onChange={onChange}
              />
            </S.Group>

            <S.Group>
              <S.Label htmlFor="endDate">대회 종료 날짜</S.Label>
              <S.DateInput
                id="endDate"
                name="endDate"
                type="date"
                placeholder="YYYY / MM / DD"
                value={form.endDate}
                onChange={onChange}
              />
            </S.Group>

            <S.Actions>
              <S.CancelButton type="button" onClick={onCancel}>
                대회 수정 취소하기
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={loading}>
                대회 수정하기
              </S.SubmitButton>
            </S.Actions>
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default ContestCreatePage;

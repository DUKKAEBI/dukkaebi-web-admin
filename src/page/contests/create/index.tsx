import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./styles";
import contestApi from "../../../api/contestApi";

interface FormData {
  title: string;
  description: string;
  startDateType: "unlimited" | "specific"; // 시작 날짜 타입
  startDate: string;
  startTime: string;
  endDateType: "unlimited" | "specific"; // 종료 날짜 타입
  endDate: string;
  endTime: string;
}

const ContestCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    startDateType: "unlimited",
    startDate: "",
    startTime: "",
    endDateType: "unlimited",
    endDate: "",
    endTime: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onRadioChange = (
    type: "start" | "end",
    value: "unlimited" | "specific"
  ) => {
    if (type === "start") {
      setForm((p) => ({ ...p, startDateType: value }));
    } else {
      setForm((p) => ({ ...p, endDateType: value }));
    }
  };

  const onCancel = () => navigate("/contests");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Map form to API payload
      const payload = {
        title: form.title,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
      };
      await contestApi.createContest(payload);
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
          <S.Title>대회 생성</S.Title>

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
              <S.Label>대회 시작 날짜</S.Label>
              <S.RadioGroup>
                <S.RadioLabel>
                  <S.RadioInput
                    type="radio"
                    name="startDateType"
                    checked={form.startDateType === "unlimited"}
                    onChange={() => onRadioChange("start", "unlimited")}
                  />
                  제한 없음
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.RadioInput
                    type="radio"
                    name="startDateType"
                    checked={form.startDateType === "specific"}
                    onChange={() => onRadioChange("start", "specific")}
                  />
                  특정 시각
                </S.RadioLabel>
              </S.RadioGroup>
              {form.startDateType === "specific" && (
                <S.DateTimeRow>
                  <S.DateInput
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={onChange}
                  />
                  <S.TimeInput
                    name="startTime"
                    type="time"
                    value={form.startTime}
                    onChange={onChange}
                    placeholder="오후 8:00"
                  />
                </S.DateTimeRow>
              )}
            </S.Group>

            <S.Group>
              <S.Label>대회 종료 날짜</S.Label>
              <S.RadioGroup>
                <S.RadioLabel>
                  <S.RadioInput
                    type="radio"
                    name="endDateType"
                    checked={form.endDateType === "unlimited"}
                    onChange={() => onRadioChange("end", "unlimited")}
                  />
                  제한 없음
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.RadioInput
                    type="radio"
                    name="endDateType"
                    checked={form.endDateType === "specific"}
                    onChange={() => onRadioChange("end", "specific")}
                  />
                  특정 시각
                </S.RadioLabel>
              </S.RadioGroup>
              {form.endDateType === "specific" && (
                <S.DateTimeRow>
                  <S.DateInput
                    name="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={onChange}
                  />
                  <S.TimeInput
                    name="endTime"
                    type="time"
                    value={form.endTime}
                    onChange={onChange}
                    placeholder="오후 8:00"
                  />
                </S.DateTimeRow>
              )}
            </S.Group>

            <S.Actions>
              <S.CancelButton type="button" onClick={onCancel}>
                대회 생성 취소하기
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={loading}>
                대회 생성하기
              </S.SubmitButton>
            </S.Actions>
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default ContestCreatePage;

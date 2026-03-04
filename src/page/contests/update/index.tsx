import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { contestsId } = useParams<{ contestsId: string }>();
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

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      if (!contestsId) return;
      try {
        const data = await contestApi.getContest(contestsId);
        if (!mounted) return;

        // ISO 날짜를 date와 time으로 분리
        let startDate = "";
        let startTime = "";
        if (data.startDate) {
          const startDateTime = new Date(data.startDate);
          startDate = startDateTime.toISOString().split("T")[0]; // YYYY-MM-DD
          startTime = startDateTime.toTimeString().slice(0, 5); // HH:MM
        }

        let endDate = "";
        let endTime = "";
        if (data.endDate) {
          const endDateTime = new Date(data.endDate);
          endDate = endDateTime.toISOString().split("T")[0]; // YYYY-MM-DD
          endTime = endDateTime.toTimeString().slice(0, 5); // HH:MM
        }

        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          startDateType: data.startDateType ?? "unlimited",
          startDate: startDate,
          startTime: startTime,
          endDateType: data.endDateType ?? "unlimited",
          endDate: endDate,
          endTime: endTime,
        });
      } catch (err) {
        console.error("Failed to load contest for edit:", err);
      }
    };
    fetch();
    return () => {
      mounted = false;
    };
  }, [contestsId]);

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
      if (contestsId) {
        // date와 time을 합쳐서 ISO 형식으로 변환
        let startDateISO = "";
        if (
          form.startDateType === "specific" &&
          form.startDate &&
          form.startTime
        ) {
          const startDateTime = new Date(
            `${form.startDate}T${form.startTime}:00`
          );
          startDateISO = startDateTime.toISOString();
        }

        let endDateISO = "";
        if (form.endDateType === "specific" && form.endDate && form.endTime) {
          const endDateTime = new Date(`${form.endDate}T${form.endTime}:00`);
          endDateISO = endDateTime.toISOString();
        }

        const payload = {
          title: form.title,
          description: form.description,
          startDate: startDateISO,
          endDate: endDateISO,
        };
        await contestApi.updateContest(contestsId, payload);
      }
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

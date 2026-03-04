import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./styles";
import contestApi from "../../../api/contestApi";

interface FormData {
  title: string;
  description: string;
  startDateType: "unlimited" | "specific";
  startDate: string;
  startTime: string;
  endDateType: "unlimited" | "specific";
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
  const [image, setImage] = useState<File | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const onImageRemove = () => {
    setImage(null);
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
      let imageUrl = "";

      // 이미지가 있으면 먼저 업로드
      if (image) {
        const uploadRes = await contestApi.uploadImage(image);
        imageUrl = uploadRes.data || uploadRes;
      }

      // 날짜+시간 조합하여 ISO 형식으로 변환
      let startDate = "";
      let endDate = "";

      if (form.startDateType === "specific" && form.startDate) {
        const time = form.startTime || "00:00";
        startDate = new Date(`${form.startDate}T${time}`).toISOString();
      }

      if (form.endDateType === "specific" && form.endDate) {
        const time = form.endTime || "23:59";
        endDate = new Date(`${form.endDate}T${time}`).toISOString();
      }

      await contestApi.createContest({
        title: form.title,
        description: form.description,
        imageUrl,
        startDate,
        endDate,
      });

      alert("대회가 생성되었습니다.");
      navigate("/contests");
    } catch (error) {
      console.error("Failed to create contest:", error);
      alert("대회 생성에 실패했습니다.");
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
              <S.Label>대회 이미지</S.Label>
              <S.FileInputWrapper>
                <S.FileInput
                  type="file"
                  id="image"
                  onChange={onImageChange}
                  accept="image/*"
                />
                <S.FileButton htmlFor="image">이미지 선택</S.FileButton>
              </S.FileInputWrapper>
              {image && (
                <S.FileItem>
                  <S.FileIcon>🖼️</S.FileIcon>
                  <S.FileName>{image.name}</S.FileName>
                  <S.FileRemove type="button" onClick={onImageRemove}>✕</S.FileRemove>
                </S.FileItem>
              )}
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

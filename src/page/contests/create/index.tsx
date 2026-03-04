import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header/index";
import {
  TitleInput,
  DescriptionInput,
  ImageUpload,
  StartDateSelector,
  EndDateSelector,
  FormActions,
} from "../../../components/contestscreate";
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
            <TitleInput value={form.title} onChange={onChange} />

            <DescriptionInput value={form.description} onChange={onChange} />

            <ImageUpload
              image={image}
              onImageChange={onImageChange}
              onImageRemove={onImageRemove}
            />

            <StartDateSelector
              startDateType={form.startDateType}
              startDate={form.startDate}
              startTime={form.startTime}
              onRadioChange={onRadioChange}
              onChange={onChange}
            />

            <EndDateSelector
              endDateType={form.endDateType}
              endDate={form.endDate}
              endTime={form.endTime}
              onRadioChange={onRadioChange}
              onChange={onChange}
            />

            <FormActions loading={loading} onCancel={onCancel} />
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default ContestCreatePage;

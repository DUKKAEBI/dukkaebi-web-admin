import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./styles";
import noticeApi from "../../../api/noticeApi";

interface FormData {
  title: string;
  description: string;
  file: File | null;
}

const NotificationUpdatePage = () => {
  const navigate = useNavigate();
  const { notificationId } = useParams<{ notificationId: string }>();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    file: null,
  });

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await noticeApi.getNotice(notificationId!);
        setForm({
          title: data.title || "",
          description: data.description || data.content || "",
          file: null,
        });
      } catch (error) {
        console.error("Failed to fetch notice:", error);
      }
    };

    if (notificationId) {
      fetchNotice();
    }
  }, [notificationId]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, file }));
  };

  const onFileRemove = () => {
    setForm((p) => ({ ...p, file: null }));
  };

  const onCancel = () => navigate("/notifications");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.file) {
        formData.append("file", form.file);
      }

      await noticeApi.updateNotice(notificationId!, formData);
      alert("공지가 수정되었습니다.");
      navigate("/notifications");
    } catch (error) {
      console.error("Failed to update notification:", error);
      alert("공지 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Main>
        <S.FormContainer>
          <S.Title>공지 수정</S.Title>

          <S.Form onSubmit={onSubmit}>
            <S.Group>
              <S.Label htmlFor="title">공지 제목</S.Label>
              <S.Input
                id="title"
                name="title"
                placeholder=""
                value={form.title}
                onChange={onChange}
                required
              />
            </S.Group>

            <S.Group>
              <S.Label htmlFor="description">설명</S.Label>
              <S.TextArea
                id="description"
                name="description"
                placeholder=""
                value={form.description}
                onChange={onChange}
                required
              />
            </S.Group>

            <S.Group>
              <S.Label>첨부 파일</S.Label>
              <S.FileInputWrapper>
                <S.FileInput
                  type="file"
                  id="file"
                  onChange={onFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <S.FileButton htmlFor="file">파일 추가</S.FileButton>
              </S.FileInputWrapper>
              {form.file && (
                <S.FileItem>
                  <S.FileIcon>📎</S.FileIcon>
                  <S.FileName>{form.file.name}</S.FileName>
                  <S.FileRemove onClick={onFileRemove}>✕</S.FileRemove>
                </S.FileItem>
              )}
            </S.Group>

            <S.Actions>
              <S.CancelButton type="button" onClick={onCancel}>
                공지 수정 취소하기
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={loading}>
                공지 수정하기
              </S.SubmitButton>
            </S.Actions>
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default NotificationUpdatePage;

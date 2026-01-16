import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./styles";
import noticeApi from "../../../api/noticeApi";

const NotificationCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const onFileRemove = () => {
    setFile(null);
  };

  const onCancel = () => navigate("/notifications");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let fileUrl = "";

      // 파일이 있으면 먼저 업로드
      if (file) {
        const uploadRes = await noticeApi.uploadFile(file);
        fileUrl = uploadRes.data;
      }

      await noticeApi.createNotice({
        title: form.title,
        content: form.content,
        fileUrl,
      });
      alert("공지가 생성되었습니다.");
      navigate("/notifications");
    } catch (error) {
      console.error("Failed to create notification:", error);
      alert("공지 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Main>    
        <S.FormContainer>
          <S.Title>공지 생성</S.Title>

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
              <S.Label htmlFor="content">내용</S.Label>
              <S.TextArea
                id="content"
                name="content"
                placeholder=""
                value={form.content}
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
              {file && (
                <S.FileItem>
                  <S.FileIcon>📎</S.FileIcon>
                  <S.FileName>{file.name}</S.FileName>
                  <S.FileRemove onClick={onFileRemove}>✕</S.FileRemove>
                </S.FileItem>
              )}
            </S.Group>

            <S.Actions>
              <S.CancelButton type="button" onClick={onCancel}>
                공지 생성 취소하기
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={loading}>
                공지 생성하기
              </S.SubmitButton>
            </S.Actions>
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default NotificationCreatePage;

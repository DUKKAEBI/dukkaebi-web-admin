import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header/index";
import { TitleField, DescriptionField, KeywordField, DifficultyField, Actions } from "../../../components/course/create";
import * as S from "./style";
import courseApi from "../../../api/courseApi";

interface FormData {   
  title: string;
  description: string;
  keywords: string[];
  difficulty: string;
}

const CourseCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openDifficultyDropdown, setOpenDifficultyDropdown] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    keywords: [],
    difficulty: "하",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onDifficultyChange = (difficulty: string) => {
    setForm((p) => ({ ...p, difficulty }));
    setOpenDifficultyDropdown(false);
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      addKeyword();
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !form.keywords.includes(keywordInput.trim())) {
      setForm((p) => ({
        ...p,
        keywords: [...p.keywords, keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setForm((p) => ({
      ...p,
      keywords: p.keywords.filter((k) => k !== keyword),
    }));
  };

  const onCancel = () => navigate("/course");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      if (!form.title.trim()) {
        alert("코스 제목을 입력해주세요.");
        setLoading(false);
        return;
      }
      const levelMap: Record<string, string> = { 하: "EASY", 중: "MEDIUM", 상: "HARD" };
      const payload = {
        title: form.title,
        description: form.description,
        keywords: form.keywords,
        level: levelMap[form.difficulty] ?? form.difficulty,
      };
      console.debug("Creating course payload:", payload);
      await courseApi.createCourse(payload);
      alert("코스가 생성되었습니다.");
      navigate("/course");
    } catch (error) {
      console.error("Failed to create course:", error);
      const resp = (error as any)?.response;
      const status = resp?.status;
      const respBody = resp?.data ?? resp;
      alert(`코스 생성 실패: status=${status}\n${JSON.stringify(respBody)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Main>
        <S.FormContainer>
          <S.Title>코스 생성</S.Title>

          <S.Form onSubmit={onSubmit}>
            <TitleField title={form.title} onChange={onChange} />

            <DescriptionField description={form.description} onChange={onChange} />

            <KeywordField
              keywords={form.keywords}
              keywordInput={keywordInput}
              onKeywordInputChange={(e) => setKeywordInput(e.target.value)}
              onKeywordKeyPress={handleKeywordKeyPress}
              onAddKeyword={addKeyword}
              onRemoveKeyword={removeKeyword}
            />

            <DifficultyField
              difficulty={form.difficulty}
              openDifficultyDropdown={openDifficultyDropdown}
              onToggleDropdown={() => setOpenDifficultyDropdown(!openDifficultyDropdown)}
              onDifficultyChange={onDifficultyChange}
            />

            <Actions loading={loading} onCancel={onCancel} />
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default CourseCreatePage;

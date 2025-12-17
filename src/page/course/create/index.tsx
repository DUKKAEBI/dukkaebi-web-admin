import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header/index";
import ArrowDownIcon from "../../../assets/image/course/simple-line-icons_arrow-down.png";
import ArrowUpIcon from "../../../assets/image/course/simple-line-icons_arrow-up.png";
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
            <S.Group>
              <S.Label htmlFor="title">코스 제목</S.Label>
              <S.Input
                id="title"
                name="title"
                value={form.title}
                onChange={onChange}
              />
            </S.Group>

            <S.Group>
              <S.Label htmlFor="description">코스 설명</S.Label>
              <S.TextArea
                id="description"
                name="description"
                value={form.description}
                onChange={onChange}
              />
            </S.Group>

            <S.Group>
              <S.Label>키워드</S.Label>
              <S.KeywordInputContainer>
                <S.KeywordInput
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={handleKeywordKeyPress}
                />
                <S.KeywordAddIcon onClick={addKeyword}>+</S.KeywordAddIcon>
              </S.KeywordInputContainer>
              {form.keywords.length > 0 && (
                <S.KeywordList>
                  {form.keywords.map((keyword) => (
                    <S.KeywordTag key={keyword}>
                      {keyword}
                      <S.KeywordRemove onClick={() => removeKeyword(keyword)}>
                        ×
                      </S.KeywordRemove>
                    </S.KeywordTag>
                  ))}
                </S.KeywordList>
              )}
            </S.Group>

            <S.Group>
              <S.DifficultyLabel>난이도</S.DifficultyLabel>
              <S.DifficultyDropdownContainer>
                <S.DifficultyDropdownButton 
                  type="button"
                  onClick={() => setOpenDifficultyDropdown(!openDifficultyDropdown)}
                >
                  {form.difficulty}
                  <S.DifficultyDropdownArrowImage
                    src={openDifficultyDropdown ? ArrowUpIcon : ArrowDownIcon}
                    alt="화살표"
                  />
                </S.DifficultyDropdownButton>
                {openDifficultyDropdown && (
                  <S.DifficultyDropdownMenu>
                    {["하", "중", "상"].map((level) => (
                      <S.DifficultyDropdownItem 
                        key={level}
                        isSelected={form.difficulty === level}
                        onClick={() => onDifficultyChange(level)}
                      >
                        <span>{level}</span>
                      </S.DifficultyDropdownItem>
                    ))}
                  </S.DifficultyDropdownMenu>
                )}
              </S.DifficultyDropdownContainer>
            </S.Group>

            <S.Actions>
              <S.CancelButton type="button" onClick={onCancel}>
                코스 생성 취소하기
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={loading}>
                코스 생성하기
              </S.SubmitButton>
            </S.Actions>
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default CourseCreatePage;

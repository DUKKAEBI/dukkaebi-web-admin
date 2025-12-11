import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import ArrowDownIcon from "../../../assets/image/course/simple-line-icons_arrow-down.png";
import ArrowUpIcon from "../../../assets/image/course/simple-line-icons_arrow-up.png";
import * as S from "./style";

interface FormData {
  title: string;
  description: string;
  keywords: string[];
  difficulty: string;
}

const CourseUpdatePage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [openDifficultyDropdown, setOpenDifficultyDropdown] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    keywords: [],
    difficulty: "하",
  });

  useEffect(() => {
    // 실제 API 연동 전 더미 데이터를 초기값으로 채웁니다.
    if (courseId) {
      setForm({
        title: "기초 100제",
        description: `기초 100제 코스는 알고리즘 학습을 처음 시작하시는 분들이 기본기를 탄탄하게 다지실 수 있도록 구성된 입문용 문제 모음입니다.

이 코스에서는 변수, 조건문, 반복문 같은 프로그래밍의 기초 문법부터 배열, 문자열, 정렬, 탐색 등 핵심 알고리즘 개념까지 자연스럽게 익히실 수 있도록 문제들이 단계별로 배치되어 있습니다.

총 100개의 문제를 풀어가면서 입력을 분석하고 해결 로직을 설계하며, 이를 코드로 구현하는 전 과정을 반복적으로 경험하시게 되기 때문에 문제 해결 역량이 안정적으로 향상될 것입니다.`,
        keywords: ["자료구조 입문", "알고리즘 기초", "문자열", "기초 다지기"],
        difficulty: "하",
      });
    }
  }, [courseId]);

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

  const addKeyword = () => {
    if (keywordInput.trim() && !form.keywords.includes(keywordInput.trim())) {
      setForm((p) => ({
        ...p,
        keywords: [...p.keywords, keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      addKeyword();
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
      // TODO: API로 업데이트 호출
      console.log("Update course data:", form);
      alert("코스가 수정되었습니다.");
      navigate("/course");
    } catch (error) {
      console.error("Failed to update course:", error);
      alert("코스 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Main>
        <S.FormContainer>
          <S.Title>코스 수정</S.Title>

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
                코스 수정 취소하기
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={loading}>
                코스 수정하기
              </S.SubmitButton>
            </S.Actions>
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default CourseUpdatePage;

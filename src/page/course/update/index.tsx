import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import { TitleField, DescriptionField, KeywordField, DifficultyField, Actions } from "../../../components/course/update";
import * as S from "./style";
import courseApi from "../../../api/courseApi";

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
    let mounted = true;
    const fetch = async () => {
      if (!courseId) return;
      try {
        const data = await courseApi.getCourse(courseId);
        console.debug("courseApi.getCourse(raw) for update:", data);
        if (!mounted) return;
        const reverseLevelMap: Record<string, string> = { EASY: "하", MEDIUM: "중", HARD: "상" };
        const difficultyValue = data.difficulty ?? (data.level ? reverseLevelMap[data.level] ?? data.level : undefined) ?? "하";
        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          keywords: data.keywords ?? data.tags ?? [],
          difficulty: difficultyValue,
        });
      } catch (err) {
        console.error("Failed to load course for update, using fallback:", err);
        // fallback to dummy if API fails
        setForm({
          title: "기초 100제",
          description: `기초 100제 코스는 알고리즘 학습을 처음 시작하시는 분들이 기본기를 탄탄하게 다지실 수 있도록 구성된 입문용 문제 모음입니다.

이 코스에서는 변수, 조건문, 반복문 같은 프로그래밍의 기초 문법부터 배열, 문자열, 정렬, 탐색 등 핵심 알고리즘 개념까지 자연스럽게 익히실 수 있도록 문제들이 단계별로 배치되어 있습니다.

총 100개의 문제를 풀어가면서 입력을 분석하고 해결 로직을 설계하며, 이를 코드로 구현하는 전 과정을 반복적으로 경험하시게 되기 때문에 문제 해결 역량이 안정적으로 향상될 것입니다.`,
          keywords: ["자료구조 입문", "알고리즘 기초", "문자열", "기초 다지기"],
          difficulty: "하",
        });
      }
    };

    fetch();
    return () => {
      mounted = false;
    };
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
      if (courseId) {
        const levelMap: Record<string, string> = { 하: "EASY", 중: "MEDIUM", 상: "HARD" };
        const payload = {
          title: form.title,
          description: form.description,
          keywords: form.keywords,
          level: levelMap[form.difficulty] ?? form.difficulty,
        };
        console.debug("Updating course payload:", payload);
        await courseApi.updateCourse(courseId, payload);
      }
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

export default CourseUpdatePage;

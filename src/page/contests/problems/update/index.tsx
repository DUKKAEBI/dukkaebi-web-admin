import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../../components/header";
import { Footer } from "../../../../components/footer";
import { nanoid } from "nanoid";
import * as S from "./styles";
import problemApi from "../../../../api/problemApi";
import contestApi from "../../../../api/contestApi";

interface TestCase {
  id: string;
  input: string;
  output: string;
}

const ContestProblemUpdatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputCond, setInputCond] = useState("");
  const [outputCond, setOutputCond] = useState("");
  const [score, setScore] = useState<number>(0);
  const [isContestOnly, setIsContestOnly] = useState<boolean | null>(true);

  const [cases, setCases] = useState<TestCase[]>([
    { id: nanoid(), input: "", output: "" },
  ]);

  const addCase = () =>
    setCases((prev) => [...prev, { id: nanoid(), input: "", output: "" }]);

  const removeCase = (id: string) =>
    setCases((prev) => prev.filter((c) => c.id !== id));

  const navigate = useNavigate();
  const { contestId, problemsId } = useParams<{
    contestId: string;
    problemsId: string;
  }>();

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      if (!problemsId || !contestId) return;
      try {
        const res = await problemApi.getProblem(Number(problemsId), contestId);
        if (!mounted) return;
        const data: any = (res as any)?.data ?? (res as any);
        setTitle(data.title ?? data.name ?? "");
        setDescription(data.description ?? "");
        setInputCond(data.input ?? data.inputRange ?? "");
        setOutputCond(data.output ?? data.outputRange ?? "");
        setIsContestOnly(data.isContestOnly);
        const resolvedScore =
          data.score != null ? data.score : difficultyToScore(data.difficulty);

        setScore(resolvedScore);
        if (Array.isArray(data.testCases)) setCases(data.testCases);
      } catch (err) {
        console.error("Failed to load problem:", err);
      }
    };

    fetch();
    return () => {
      mounted = false;
    };
  }, [problemsId]);

  //테스트 케이스 autoResize 변경 관련 useEffect
  useEffect(() => {
    requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLTextAreaElement>("textarea")
        .forEach((el) => {
          el.style.height = "auto";
          el.style.height = `${el.scrollHeight}px`;
        });
    });
  }, [cases]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemsId || !contestId) return;

    try {
      if (isContestOnly) {
        // 🔹 전체 수정 가능
        const payload = {
          name: title,
          description,
          input: inputCond,
          output: outputCond,
          score,
          testCases: cases,
        };

        await contestApi.contestUpdateProblem(
          contestId,
          Number(problemsId),
          payload,
        );
      } else {
        await contestApi.updateContestProblemScore(
          contestId,
          Number(problemsId),
          { score },
        );
      }

      navigate(-1);
    } catch (err) {
      console.error("Failed to update problem:", err);
      alert("문제 수정 중 오류가 발생했습니다.");
    }
  };

  //기본 점수가 없을때에 난이도를 확인하여 난이도에 따라 점수
  const difficultyToScore = (difficulty?: string | null): number => {
    switch (difficulty) {
      case "COPPER":
        return 1;
      case "IRON":
        return 3;
      case "SILVER":
        return 5;
      case "GOLD":
        return 10;
      case "JADE":
        return 15;
      default:
        return 0;
    }
  };
  //폼 입력 전용 여부 확인 변수
  const isScoreOnly = isContestOnly === null;

  return (
    <S.Container>
      <Header />

      <S.Main>
        <S.Content>
          <S.TitleWrapper>
            <S.PageTitle>문제 수정</S.PageTitle>

            {isContestOnly === false && (
              <S.Label>
                (기존 문제를 가져온 문제이니 점수만 수정 가능합니다.)
              </S.Label>
            )}
          </S.TitleWrapper>
          <S.Field>
            <S.Label>문제 제목</S.Label>
            <S.Input
              placeholder="학교 복도 최단거리"
              value={title}
              disabled={isScoreOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </S.Field>

          <S.Field>
            <S.Label>문제 설명</S.Label>
            <S.TextArea
              disabled={isScoreOnly}
              placeholder={
                "당신은 쉬는 시간에 친구의 과자를 뺏으러 친구에게 가려고 한다.\n하지만 복도가 너무 길어서 몇 걸음 걸어야 하는지 계산해야 한다.\n\n입력으로 현재 위치 P와 친구 위치 F가 주어질 때,\n두 값의 차이의 절댓값을 출력하시오.\n(걸음 수 = 거리)"
              }
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              rows={6}
            />
          </S.Field>

          <S.Field>
            <S.Label>입력 조건</S.Label>
            <S.Input
              disabled={isScoreOnly}
              placeholder="한 줄, 두 정수 P와 F (0 ≤ P, F ≤ 10,000)"
              value={inputCond}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputCond(e.target.value)
              }
            />
          </S.Field>

          <S.Field>
            <S.Label>출력 조건</S.Label>
            <S.Input
              disabled={isScoreOnly}
              placeholder="한 줄, 최단 거리(걸음 수)를 출력"
              value={outputCond}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOutputCond(e.target.value)
              }
              $primaryBorder
            />
          </S.Field>

          <S.Field>
            <S.Label>점수</S.Label>
            <S.Input
              type="text"
              placeholder="100"
              value={score}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                // 숫자만 추출
                const numericValue = value.replace(/[^0-9]/g, "");
                setScore(numericValue ? Number(numericValue) : 0);
              }}
              $primaryBorder
            />
          </S.Field>

          <S.Field>
            <S.Label>테스트 케이스</S.Label>
            <S.TestCaseTable>
              <S.TestCaseHead>
                <S.HeadCell>입력</S.HeadCell>
                <S.HeadCell $right>출력</S.HeadCell>
              </S.TestCaseHead>
              {cases.map((c, idx) => (
                <S.TestCaseRow key={c.id}>
                  <S.CaseTextArea
                    placeholder="2 7"
                    value={c.input}
                    rows={1}
                    onInput={(e) => {
                      const el = e.currentTarget;
                      el.style.height = "auto";
                      el.style.height = `${el.scrollHeight}px`;

                      const v = el.value;
                      setCases((prev) =>
                        prev.map((x) =>
                          x.id === c.id ? { ...x, input: v } : x,
                        ),
                      );
                    }}
                  />
                  <S.CaseTextArea
                    placeholder="5"
                    value={c.output}
                    rows={1}
                    onInput={(e) => {
                      const el = e.currentTarget;
                      el.style.height = "auto";
                      el.style.height = `${el.scrollHeight}px`;

                      const v = el.value;
                      setCases((prev) =>
                        prev.map((x) =>
                          x.id === c.id ? { ...x, output: v } : x,
                        ),
                      );
                    }}
                  />
                  <S.DeleteButton onClick={() => removeCase(c.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </S.DeleteButton>
                </S.TestCaseRow>
              ))}
              <S.AddRow onClick={addCase}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </S.AddRow>
            </S.TestCaseTable>
          </S.Field>

          <S.Actions>
            <S.SecondaryButton onClick={() => navigate(-1)}>
              문제 수정 취소하기
            </S.SecondaryButton>
            <S.PrimaryButton onClick={onSubmit}>문제 수정하기</S.PrimaryButton>
          </S.Actions>
        </S.Content>
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default ContestProblemUpdatePage;

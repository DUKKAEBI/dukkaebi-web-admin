import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../../components/header";
import { Footer } from "../../../../components/footer";
import {
  TitleField,
  DescriptionField,
  InputCondField,
  OutputCondField,
  ScoreField,
  TestCaseSection,
  FormActions,
} from "../../../../components/contestsproblemsupdate";
import { nanoid } from "nanoid";
import * as S from "./styles";
import problemApi from "../../../../api/problemApi";
import contestApi from "../../../../api/contestApi";

interface TestCase {
  id: string;
  input: string;
  output: string;
  rows: number;
}

const ContestProblemUpdatePage = () => {
  const navigate = useNavigate();
  const { contestId, problemsId } = useParams<{
    contestId: string;
    problemsId: string;
  }>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputCond, setInputCond] = useState("");
  const [outputCond, setOutputCond] = useState("");
  const [score, setScore] = useState<number>(0);
  const [isContestOnly, setIsContestOnly] = useState<boolean | null>(true);
  const [cases, setCases] = useState<TestCase[]>([
    { id: nanoid(), input: "", output: "", rows: 1 },
  ]);

  const addCase = () =>
    setCases((prev) => [
      ...prev,
      { id: nanoid(), input: "", output: "", rows: 1 },
    ]);

  const removeCase = (id: string) =>
    setCases((prev) => prev.filter((c) => c.id !== id));

  //테스트 케이스 줄 확인 함수
  const calcRows = (value: string) => Math.max(1, value.split("\n").length);

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

        // 테스트 케이스 설정
        if (Array.isArray(data.testCases) && data.testCases.length > 0) {
          setCases(
            data.testCases.map((tc: any) => {
              const inputRows = tc.input?.split("\n").length ?? 1;
              const outputRows = tc.output?.split("\n").length ?? 1;

              return {
                id: tc.id ?? nanoid(),
                input: tc.input ?? "",
                output: tc.output ?? "",
                rows: Math.max(inputRows, outputRows, 1),
              };
            }),
          );
        }
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

          <TitleField
            value={title}
            disabled={isScoreOnly}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />

          <DescriptionField
            value={description}
            disabled={isScoreOnly}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />

          <InputCondField
            value={inputCond}
            disabled={isScoreOnly}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputCond(e.target.value)
            }
          />

          <OutputCondField
            value={outputCond}
            disabled={isScoreOnly}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOutputCond(e.target.value)
            }
          />

          <ScoreField
            value={score}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              // 숫자만 추출
              const numericValue = value.replace(/[^0-9]/g, "");
              setScore(numericValue ? Number(numericValue) : 0);
            }}
          />

          <TestCaseSection
            cases={cases}
            setCases={setCases}
            addCase={addCase}
            removeCase={removeCase}
          />

          <FormActions onCancel={() => navigate(-1)} onSubmit={onSubmit} />
        </S.Content>
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default ContestProblemUpdatePage;

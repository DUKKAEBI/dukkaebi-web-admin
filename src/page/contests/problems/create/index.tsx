import { useEffect, useState } from "react";
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
} from "../../../../components/contestsproblemscreate";
import { nanoid } from "nanoid";
import * as S from "./styles";
import contestApi from "../../../../api/contestApi";

interface TestCase {
  id: string;
  input: string;
  output: string;
  rows: number;
}

const ProblemCreate = () => {
  const navigate = useNavigate();
  const { contestsId } = useParams<{ contestsId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputCond, setInputCond] = useState("");
  const [outputCond, setOutputCond] = useState("");
  const [score, setScore] = useState("");
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contestsId) {
      alert("대회 ID가 없습니다.");
      return;
    }
    try {
      const payload = {
        name: title,
        description,
        input: inputCond,
        output: outputCond,
        difficulty: "COPPER",
        score: score ? Number(score) : 100,
        testCases: cases,
      };

      await contestApi.createContestProblem(contestsId, payload);
      navigate(`/contests/${contestsId}`);
    } catch (err) {
      console.error("Failed to create problem:", err);
      alert("문제 생성 중 오류가 발생했습니다.");
    }
  };

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

  return (
    <S.Container>
      <Header />

      <S.Main>
        <S.Content>
          <S.PageTitle>문제 추가</S.PageTitle>

          <TitleField
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />

          <DescriptionField
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />

          <InputCondField
            value={inputCond}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputCond(e.target.value)
            }
          />

          <OutputCondField
            value={outputCond}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOutputCond(e.target.value)
            }
          />

          <ScoreField
            value={score}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setScore(e.target.value)
            }
          />

          <TestCaseSection
            cases={cases}
            setCases={setCases}
            addCase={addCase}
            removeCase={removeCase}
          />

          <FormActions
            contestsId={contestsId}
            onCancel={() => navigate(`/contests/${contestsId ?? ""}`)}
            onSubmit={onSubmit}
          />
        </S.Content>
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default ProblemCreate;

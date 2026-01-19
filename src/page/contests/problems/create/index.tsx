import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../../components/header";
import { Footer } from "../../../../components/footer";
import * as S from "./styles";
import contestApi from "../../../../api/contestApi";

interface TestCase {
  input: string;
  output: string;
}

const ProblemCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputCond, setInputCond] = useState("");
  const [outputCond, setOutputCond] = useState("");
  const [score, setScore] = useState("");
  const [cases, setCases] = useState<TestCase[]>([
    { input: "", output: "" },
  ]);

  const addCase = () => setCases((prev) => [...prev, { input: "", output: "" }]);
  const removeCase = (idx: number) => setCases((prev) => prev.filter((_, i) => i !== idx));

  const navigate = useNavigate();
  const { contestsId } = useParams<{ contestsId: string }>();

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

  return (
    <S.Container>
      <Header />

      <S.Main>
        <S.Content>
          <S.PageTitle>문제 추가</S.PageTitle>

          <S.Field>
            <S.Label>문제 제목</S.Label>
            <S.Input
              placeholder="학교 복도 최단거리"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </S.Field>

          <S.Field>
            <S.Label>문제 설명</S.Label>
            <S.TextArea
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
              placeholder="한 줄, 최단 거리(걸음 수)를 출력"
              value={outputCond}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOutputCond(e.target.value)
              }
              $primaryBorder
            />
          </S.Field>

          <S.Field>
            <S.Label>배점</S.Label>
            <S.Input
              type="number"
              placeholder="10"
              value={score}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setScore(e.target.value)
              }
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
                <S.TestCaseRow key={idx}>
                  <S.CaseInput
                    placeholder="2 7"
                    value={c.input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = e.target.value;
                      setCases((prev) =>
                        prev.map((x, i) => (i === idx ? { ...x, input: v } : x))
                      );
                    }}
                  />
                  <S.CaseInput
                    placeholder="5"
                    value={c.output}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = e.target.value;
                      setCases((prev) =>
                        prev.map((x, i) =>
                          i === idx ? { ...x, output: v } : x
                        )
                      );
                    }}
                  />
                  <S.DeleteButton onClick={() => removeCase(idx)}>
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
            <S.SecondaryButton onClick={() => navigate(`/contests/${contestsId ?? ""}`)}>문제 추가 취소하기</S.SecondaryButton>
            <S.PrimaryButton onClick={onSubmit}>문제 추가하기</S.PrimaryButton>
          </S.Actions>
        </S.Content>
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default ProblemCreate;


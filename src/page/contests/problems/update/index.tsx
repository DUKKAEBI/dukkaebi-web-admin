import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../../components/header";
import { Footer } from "../../../../components/footer";
import * as S from "./styles";
import problemApi from "../../../../api/problemApi";

interface TestCase {
  input: string;
  output: string;
}

const ProblemUpdate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputCond, setInputCond] = useState("");
  const [outputCond, setOutputCond] = useState("");
  const [cases, setCases] = useState<TestCase[]>([
    { input: "2 7", output: "5" },
  ]);

  const addCase = () => setCases((prev) => [...prev, { input: "", output: "" }]);

  const navigate = useNavigate();
  const { problemsId } = useParams<{ problemsId: string }>();

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      if (!problemsId) return;
      try {
        const res = await problemApi.getProblem(Number(problemsId));
        if (!mounted) return;
        const data: any = (res as any)?.data ?? (res as any);
        setTitle(data.title ?? data.name ?? "");
        setDescription(data.description ?? "");
        setInputCond(data.inputCond ?? data.inputRange ?? "");
        setOutputCond(data.outputCond ?? data.outputRange ?? "");
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!problemsId) return;
      const payload = {
        title,
        description,
        inputCond,
        outputCond,
        testCases: cases,
      };
      await problemApi.updateProblem(Number(problemsId), payload);
      navigate(-1);
    } catch (err) {
      console.error("Failed to update problem:", err);
      alert("문제 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.Container>
      <Header />

      <S.Main>
        <S.Content>
          <S.PageTitle>문제 수정</S.PageTitle>

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
            <S.Label>테스트 케이스</S.Label>
            <S.TestCaseTable>
              <S.TestCaseHead>
                <S.HeadCell>입력</S.HeadCell>
                <S.HeadCell $right>출력</S.HeadCell>
              </S.TestCaseHead>
              {cases.map((c, idx) => (
                <S.TestCaseRow key={idx}>
                  <S.CaseInput
                    placeholder="예) 2 7"
                    value={c.input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = e.target.value;
                      setCases((prev) =>
                        prev.map((x, i) => (i === idx ? { ...x, input: v } : x))
                      );
                    }}
                  />
                  <S.CaseInput
                    placeholder="예) 5"
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
            <S.SecondaryButton onClick={() => navigate(-1)}>문제 수정 취소하기</S.SecondaryButton>
            <S.PrimaryButton onClick={onSubmit}>문제 수정하기</S.PrimaryButton>
          </S.Actions>
        </S.Content>
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default ProblemUpdate;

// 테스트 케이스 섹션 (테이블, 행, 추가 버튼 포함)
import * as S from "../../../page/contests/problems/update/styles";

interface TestCase {
  id: string;
  input: string;
  output: string;
  rows: number;
}

interface TestCaseSectionProps {
  cases: TestCase[];
  setCases: React.Dispatch<React.SetStateAction<TestCase[]>>;
  addCase: () => void;
  removeCase: (id: string) => void;
}

export const TestCaseSection = ({
  cases,
  setCases,
  addCase,
  removeCase,
}: TestCaseSectionProps) => {
  return (
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
              placeholder="예) 2 7"
              value={c.input}
              rows={c.rows}
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                const v = e.currentTarget.value;

                setCases((prev) =>
                  prev.map((x) => {
                    if (x.id !== c.id) return x;

                    const inputRows = v.split("\n").length;
                    const outputRows = x.output.split("\n").length;
                    const rows = Math.max(inputRows, outputRows, 1);

                    return {
                      ...x,
                      input: v,
                      rows,
                    };
                  }),
                );
              }}
            />
            <S.CaseTextArea
              placeholder="예) 5"
              value={c.output}
              rows={c.rows}
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                const v = e.currentTarget.value;

                setCases((prev) =>
                  prev.map((x) => {
                    if (x.id !== c.id) return x;

                    const inputRows = x.input.split("\n").length;
                    const outputRows = v.split("\n").length;
                    const rows = Math.max(inputRows, outputRows, 1);

                    return {
                      ...x,
                      output: v,
                      rows,
                    };
                  }),
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
  );
};

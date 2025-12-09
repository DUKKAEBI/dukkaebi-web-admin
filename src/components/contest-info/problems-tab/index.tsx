import { useState } from "react";
import * as S from "./styles";
import { useNavigate, useParams } from "react-router-dom";

interface Problem {
  id: string;
  number: string;
  title: string;
}

interface ProblemsTabProps {
  contestId?: string;
}

const MOCK_PROBLEMS: Problem[] = [
  { id: "1", number: "01", title: "문자열과 알파벳 쿼리" },
  { id: "2", number: "02", title: "문자열과 알파벳 쿼리" },
  { id: "3", number: "03", title: "문자열과 알파벳 쿼리" },
  { id: "4", number: "04", title: "문자열과 알파벳 쿼리" },
];

export const ProblemsTab = ({ contestId }: ProblemsTabProps) => {
  const [problems] = useState<Problem[]>(MOCK_PROBLEMS);
  const { contestsId } = useParams();

  const handleMoreClick = (problemId: string) => {
    // TODO: 문제 메뉴 로직
    console.log("문제 메뉴", problemId);
  };
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Table>
        <S.TableHeader>
          <S.HeaderCell>번호</S.HeaderCell>
          <S.HeaderCell>제목</S.HeaderCell>
          <S.HeaderCell></S.HeaderCell>
        </S.TableHeader>
        <S.TableBody>
          {problems.map((problem) => (
            <S.TableRow key={problem.id}>
              <S.NumberCell>{problem.number}</S.NumberCell>
              <S.TitleCell>{problem.title}</S.TitleCell>
              <S.ActionCell>
                <S.MoreButton
                  onClick={() => handleMoreClick(problem.id)}
                  aria-label="더보기"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                    <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                    <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                  </svg>
                </S.MoreButton>
              </S.ActionCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
      <S.AddButton
        onClick={() => navigate(`/contests/problems/create/${contestsId}`)}
      >
        문제 추가
      </S.AddButton>
    </S.Container>
  );
};

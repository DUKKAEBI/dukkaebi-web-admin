// 문제 탭 컴포넌트
import { useNavigate } from "react-router-dom";
import * as S from "../../../page/contests/info/styles";
import { ProblemRow } from "../ProblemRow";

type problem = {
  problemId: number;
  name: string;
  difficulty: string;
  solvedCount: number;
  correctRate: number;
  solvedResult: string;
  addedAt: string;
};

interface ProblemsTabProps {
  problems?: problem[];
  contestsId: string;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  deleteProblem: (contestId: string, problemId: number) => void;
}

export const ProblemsTab = ({
  problems,
  contestsId,
  openMenuId,
  setOpenMenuId,
  deleteProblem,
}: ProblemsTabProps) => {
  const navigate = useNavigate();

  return (
    <S.Content>
      <S.Table>
        <S.TableHead>
          <S.ColNo>번호</S.ColNo>
          <S.ColTitle>제목</S.ColTitle>
        </S.TableHead>
        {problems?.map((r: problem, index: number) => (
          <ProblemRow
            key={r.problemId}
            problem={r}
            index={index}
            contestsId={contestsId}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
            deleteProblem={deleteProblem}
          />
        ))}
      </S.Table>
      <S.AddButtonWrapper>
        <S.AddButton
          onClick={() =>
            navigate(
              `/problems?pickerFor=contest&returnTo=/contests/${contestsId}`,
            )
          }
        >
          문제 가져오기
        </S.AddButton>
        <S.AddButton
          onClick={() => navigate(`/contests/problems/create/${contestsId}`)}
        >
          문제 추가
        </S.AddButton>
      </S.AddButtonWrapper>
    </S.Content>
  );
};

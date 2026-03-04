// 문제 행 컴포넌트 (더보기 메뉴 포함)
import { useNavigate } from "react-router-dom";
import * as S from "../../../page/contests/info/styles";

type problem = {
  problemId: number;
  name: string;
  difficulty: string;
  solvedCount: number;
  correctRate: number;
  solvedResult: string;
  addedAt: string;
};

interface ProblemRowProps {
  problem: problem;
  index: number;
  contestsId: string;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  deleteProblem: (contestId: string, problemId: number) => void;
}

export const ProblemRow = ({
  problem,
  index,
  contestsId,
  openMenuId,
  setOpenMenuId,
  deleteProblem,
}: ProblemRowProps) => {
  const navigate = useNavigate();

  return (
    <S.Row
      onClick={() =>
        navigate(`/contests/${contestsId}/solve/${problem.problemId}`)
      }
    >
      <S.CellNo>{index + 1}</S.CellNo>
      <S.CellTitle>{problem.name}</S.CellTitle>
      <S.MoreWrapper onMouseDown={(e) => e.stopPropagation()}>
        <S.MoreBtn
          aria-label="more"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenuId(
              openMenuId === String(problem.problemId)
                ? null
                : String(problem.problemId),
            );
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
            <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
            <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
          </svg>
        </S.MoreBtn>
        {openMenuId === String(problem.problemId) && (
          <S.Dropdown>
            <S.DropdownItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setOpenMenuId(null);
                navigate(
                  `/contests/problems/${contestsId}/update/${problem.problemId}`,
                );
              }}
            >
              문제 수정
            </S.DropdownItem>

            <S.DropdownItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (contestsId) deleteProblem(contestsId, problem.problemId);
              }}
            >
              문제 삭제
            </S.DropdownItem>
          </S.Dropdown>
        )}
      </S.MoreWrapper>
    </S.Row>
  );
};

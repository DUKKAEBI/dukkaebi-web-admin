/**
 * ProblemsTable 컴포넌트
 * 
 * 문제 목록을 테이블 형태로 표시하는 컴포넌트
 * - 문제 제목, 난이도, 완료 수, 정답률 표시
 * - Picker 모드: 체크박스로 문제 선택 가능
 * - 일반 모드: 문제 수정/삭제 액션 메뉴
 * 
 * @param {Problem[]} problems - 표시할 문제 목록
 * @param {boolean} isPicker - Picker 모드 여부 (코스/대회에 문제 추가)
 * @param {Set<number>} selectedIds - 선택된 문제 ID 목록
 * @param {function} onToggleSelect - 문제 선택/해제 핸들러
 * @param {function} onRowClick - 행 클릭 핸들러
 * @param {number | null} openActionId - 열려있는 액션 메뉴 ID
 * @param {function} onActionToggle - 액션 메뉴 토글 핸들러
 * @param {function} onEdit - 문제 수정 핸들러
 * @param {function} onDelete - 문제 삭제 핸들러
 * @param {Record<number, HTMLButtonElement | null>} buttonRefs - 액션 버튼 ref 맵
 */

import { createPortal } from "react-dom";
import * as S from "../../page/problems/style";
import GoldIcon from "../../assets/image/problems/difficulty/gold.svg";
import SilverIcon from "../../assets/image/problems/difficulty/silver.svg";
import CopperIcon from "../../assets/image/problems/difficulty/copper.svg";
import JadeIcon from "../../assets/image/problems/difficulty/jade.svg";
import IronIcon from "../../assets/image/problems/difficulty/iron.svg";

interface Problem {
  id: number;
  title: string;
  difficulty: number;
  completedCount: number;
  successRate: number;
  solved: boolean;
  failed: boolean;
}

interface ProblemsTableProps {
  problems: Problem[];
  isPicker: boolean;
  selectedIds: Set<number>;
  onToggleSelect: (id: number) => void;
  onRowClick: (id: number) => void;
  openActionId: number | null;
  onActionToggle: (e: React.MouseEvent, id: number) => void;
  onEdit: (e: React.MouseEvent, id: number) => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
  buttonRefs: React.MutableRefObject<Record<number, HTMLButtonElement | null>>;
}

const difficultyLabels: Record<number, string> = {
  1: "금",
  2: "은",
  3: "동",
  4: "철",
  5: "옥",
};

const difficultyImages: Record<number, string> = {
  1: GoldIcon,
  2: SilverIcon,
  3: CopperIcon,
  4: IronIcon,
  5: JadeIcon,
};

export const ProblemsTable = ({
  problems,
  isPicker,
  selectedIds,
  onToggleSelect,
  onRowClick,
  openActionId,
  onActionToggle,
  onEdit,
  onDelete,
  buttonRefs,
}: ProblemsTableProps) => {
  return (
    <S.TableContainer>
      <S.TableHeader $picker={isPicker}>
        {isPicker && (
          <S.TableHeaderCell style={{ width: 48 }}>선택</S.TableHeaderCell>
        )}
        <S.TableHeaderCell>제목</S.TableHeaderCell>
        <S.TableHeaderCellCenter>난이도</S.TableHeaderCellCenter>
        <S.TableHeaderCellRight>완료한 사람</S.TableHeaderCellRight>
        <S.TableHeaderCellRight>정답률</S.TableHeaderCellRight>
      </S.TableHeader>

      <S.TableBody>
        {problems.map((problem, index) => (
          <S.TableRow
            $picker={isPicker}
            $selected={isPicker && selectedIds.has(problem.id)}
            key={problem.id}
            isLast={index === problems.length - 1}
            onClick={() => onRowClick(problem.id)}
          >
            {isPicker && (
              <S.TableCell style={{ width: 48 }}>
                <input
                  type="checkbox"
                  checked={selectedIds.has(problem.id)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => onToggleSelect(problem.id)}
                  aria-label={`문제 선택 ${problem.title}`}
                />
              </S.TableCell>
            )}
            <S.TableCell>{problem.title}</S.TableCell>
            <S.TableCellCenter>
              <S.DifficultyImage
                src={difficultyImages[problem.difficulty]}
                alt={difficultyLabels[problem.difficulty]}
              />
            </S.TableCellCenter>
            <S.TableCellRight>{problem.completedCount}명</S.TableCellRight>
            <S.TableCellRight>{problem.successRate}%</S.TableCellRight>
            <S.TableCellRight>
              <S.ActionContainer data-action-container>
                <S.ActionButton
                  ref={(el) => {
                    buttonRefs.current[problem.id] = el;
                  }}
                  onClick={(e) => onActionToggle(e, problem.id)}
                  aria-haspopup="true"
                  aria-expanded={openActionId === problem.id}
                  aria-label="액션 메뉴"
                >
                  ⋮
                </S.ActionButton>

                {openActionId === problem.id &&
                  buttonRefs.current[problem.id] &&
                  createPortal(
                    <div data-portal-action-menu>
                      <S.ActionMenu
                        style={(() => {
                          try {
                            const btn = buttonRefs.current[problem.id];
                            if (!btn) return {};
                            const rect = btn.getBoundingClientRect();
                            const menuWidth = 96;
                            const computedLeft =
                              rect.right + window.scrollX - menuWidth - 8;
                            const left = Math.max(
                              16,
                              Math.min(
                                computedLeft,
                                window.innerWidth - menuWidth - 16
                              )
                            );
                            const top =
                              rect.top +
                              window.scrollY +
                              rect.height / 2 +
                              6;
                            return {
                              position: "absolute",
                              top: `${top}px`,
                              left: `${left}px`,
                              transform: "translateY(-50%)",
                              zIndex: 1000,
                            } as React.CSSProperties;
                          } catch (err) {
                            return {};
                          }
                        })()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <S.ActionMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(e, problem.id);
                          }}
                        >
                          문제 수정
                        </S.ActionMenuItem>
                        <S.ActionMenuItemDanger
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(e, problem.id);
                          }}
                        >
                          문제 삭제
                        </S.ActionMenuItemDanger>
                      </S.ActionMenu>
                    </div>,
                    document.body
                  )}
              </S.ActionContainer>
            </S.TableCellRight>
          </S.TableRow>
        ))}
      </S.TableBody>
    </S.TableContainer>
  );
};

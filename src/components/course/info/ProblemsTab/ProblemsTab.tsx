// ProblemsTab.tsx
// 코스 문제 목록을 담당하는 컴포넌트

import React from "react";
import type { MouseEvent } from "react";
import * as S from "../../../../page/course/info/style";

interface Row {
  no: string;
  title: string;
  problemId: string;
}

interface ProblemsTabProps {
  rows: Row[];
  openMenuId: string | null;
  courseId: string | undefined;
  onRowClick: (problemId: string) => void;
  onMoreClick: (e: MouseEvent, rowNo: string) => void;
  onEditClick: (e: MouseEvent, rowNo: string) => void;
  onDeleteClick: (e: MouseEvent, row: Row) => void;
  onAddProblemClick: () => void;
}

const ProblemsTab: React.FC<ProblemsTabProps> = ({
  rows,
  openMenuId,
  courseId,
  onRowClick,
  onMoreClick,
  onEditClick,
  onDeleteClick,
  onAddProblemClick,
}) => {
  return (
    <S.Content>
      <S.Table>
        <S.TableHead>
          <S.ColNo>번호</S.ColNo>
          <S.ColTitle>제목</S.ColTitle>
        </S.TableHead>
        {rows.length === 0 ? (
          <S.EmptyRow>문제를 불러오는 중입니다.</S.EmptyRow>
        ) : (
          rows.map((r) => (
            <S.Row key={r.no} onClick={() => onRowClick(r.problemId)}>
              <S.CellNo>{r.no}</S.CellNo>
              <S.CellTitle>{r.title}</S.CellTitle>
              <S.MoreWrapper
                onMouseDown={(e: MouseEvent) => e.stopPropagation()}
              >
                <S.MoreBtn
                  aria-label="more"
                  onClick={(e: MouseEvent) => onMoreClick(e, r.no)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                    <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                    <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                  </svg>
                </S.MoreBtn>
                {openMenuId === r.no && (
                  <S.Dropdown>
                    <S.DropdownItem onClick={(e) => onEditClick(e, r.no)}>
                      문제 수정
                    </S.DropdownItem>
                    <S.DropdownItem onClick={(e) => onDeleteClick(e, r)}>
                      문제 삭제
                    </S.DropdownItem>
                  </S.Dropdown>
                )}
              </S.MoreWrapper>
            </S.Row>
          ))
        )}
      </S.Table>
      <S.AddButton onClick={onAddProblemClick}>문제 설정</S.AddButton>
    </S.Content>
  );
};

export default ProblemsTab;

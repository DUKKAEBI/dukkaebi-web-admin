// CourseGrid.tsx
// 코스 카드 목록을 담당하는 컴포넌트

import React, { useRef } from "react";
import * as S from "../../../page/course/style";

interface CourseItem {
  id?: number | string;
  title?: string;
  level?: string;
  keywords?: string[];
}

interface CourseGridProps {
  courses: CourseItem[];
  openMenuId: string | null;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onCardClick: (id: number | string | undefined) => void;
  onMoreClick: (e: React.MouseEvent<HTMLButtonElement>, itemKey: string) => void;
  onEditClick: (e: React.MouseEvent<HTMLButtonElement>, id: number | string | undefined) => void;
  onDeleteClick: (e: React.MouseEvent<HTMLButtonElement>, id: number | string | undefined) => void;
}

const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  openMenuId,
  menuRef,
  onCardClick,
  onMoreClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <S.Grid>
      {courses.map((c, idx) => {
        const itemKey = `course-${c.id}-${idx}`;
        return (
          <S.Card key={itemKey} onClick={() => onCardClick(c.id)}>
            <S.CardContent>
              <S.LevelBadge>난이도 : {c.level}</S.LevelBadge>
              <S.CardTitle>{c.title}</S.CardTitle>
              <S.KeywordContainer>
                {(c.keywords ?? []).map((keyword, kIdx) => (
                  <S.Keyword key={kIdx}>{keyword}</S.Keyword>
                ))}
              </S.KeywordContainer>
            </S.CardContent>
            <S.MoreButtonWrapper
              ref={openMenuId === itemKey ? menuRef : null}
            >
              <S.MoreButton
                aria-label="more"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  onMoreClick(e, itemKey)
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                  <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                  <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                </svg>
              </S.MoreButton>
              {openMenuId === itemKey && (
                <S.CourseMenu>
                  <S.CourseMenuItem
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      onEditClick(e, c.id)
                    }
                  >
                    코스 수정
                  </S.CourseMenuItem>
                  <S.CourseMenuItem
                    $danger
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      onDeleteClick(e, c.id)
                    }
                  >
                    코스 삭제
                  </S.CourseMenuItem>
                </S.CourseMenu>
              )}
            </S.MoreButtonWrapper>
          </S.Card>
        );
      })}
    </S.Grid>
  );
};

export default CourseGrid;

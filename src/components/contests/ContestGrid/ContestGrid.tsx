// ContestGrid.tsx
// 대회 카드 목록을 표시하는 컴포넌트

import React from "react";
import * as S from "../../../page/contests/styles";

interface ContestItem {
  code: string;
  title: string;
  imageUrl: string;
  dDay: string;
  participantCount: number;
  status: string;
}

interface ContestGridProps {
  contests: ContestItem[];
  defaultImage: string;
  onCardClick: (code: string) => void;
}

const ContestGrid: React.FC<ContestGridProps> = ({
  contests,
  defaultImage,
  onCardClick,
}) => {
  return (
    <S.Grid>
      {contests.map((c) => (
        <S.Card key={c.code} onClick={() => onCardClick(c.code)}>
          <S.CardImageWrapper>
            <S.CardImage src={c.imageUrl || defaultImage} alt={c.title} />
          </S.CardImageWrapper>
          <S.CardBody>
            <S.CardTitle>{c.title}</S.CardTitle>
            <S.CardMeta>
              {c.dDay} ・ {c.participantCount}명 참여중
            </S.CardMeta>
          </S.CardBody>
        </S.Card>
      ))}
    </S.Grid>
  );
};

export default ContestGrid;

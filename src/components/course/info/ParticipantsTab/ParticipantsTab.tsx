// ParticipantsTab.tsx
// 코스 참여 인원 목록을 담당하는 컴포넌트

import React from "react";
import * as S from "../../../../page/course/info/style";

interface ParticipantsTabProps {
  participantCount: number;
  problems: any[];
}

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({
  participantCount,
  problems,
}) => {
  return (
    <S.ParticipantsWrapper>
      <S.ParticipantsTotal>
        총 참여 인원 : {participantCount ?? 0}명
      </S.ParticipantsTotal>
      <S.ParticipantsTable>
        <S.ParticipantsTableHead>
          <span>등수</span>
          <span>이름</span>
          <span style={{ justifySelf: "end" }}>제출한 문제 수</span>
          <span style={{ justifySelf: "end" }}>맞춘 문제 수</span>
        </S.ParticipantsTableHead>
        {problems?.map((p: any, idx: number) => (
          <S.ParticipantsRow key={p.problemId}>
            <S.ParticipantsRank>{idx + 1}</S.ParticipantsRank>
            <S.ParticipantsName>{p.name}</S.ParticipantsName>
            <S.ParticipantsStat>{p.solvedCount}</S.ParticipantsStat>
            <S.ParticipantsStat>
              {p.solvedResult === "SOLVED" ? 1 : 0}
            </S.ParticipantsStat>
          </S.ParticipantsRow>
        ))}
      </S.ParticipantsTable>
    </S.ParticipantsWrapper>
  );
};

export default ParticipantsTab;

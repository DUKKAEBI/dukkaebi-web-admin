// 참여자 탭 컴포넌트
import * as S from "../../../page/contests/info/styles";
import { ParticipantRow } from "../ParticipantRow";

type Participant = {
  rank: number;
  userId: number;
  nickname: string;
  totalScore: number;
  totalTime: string;
  problemScores: {
    problemId: number;
    earnedScore: number;
    maxScore: number;
  }[];
};

interface ParticipantsTabProps {
  participantCount?: number;
  participants: Participant[];
  contestsId: string;
  expandedParticipantId: number | null;
  setExpandedParticipantId: (id: number | null) => void;
  setParticipants: (participants: Participant[]) => void;
}

export const ParticipantsTab = ({
  participantCount,
  participants,
  contestsId,
  expandedParticipantId,
  setExpandedParticipantId,
  setParticipants,
}: ParticipantsTabProps) => {
  return (
    <S.ParticipantsWrapper>
      <S.ParticipantsTotal>
        총 참여 인원 : {participantCount ?? 0}명
      </S.ParticipantsTotal>
      <S.ParticipantsTable>
        <S.ParticipantsTableHead>
          <span>등수</span>
          <span>이름</span>
          <span style={{ justifySelf: "end" }}>소요 시간</span>
          <span style={{ justifySelf: "end" }}>총 점수</span>
        </S.ParticipantsTableHead>
        {participants.map((participant: Participant) => (
          <ParticipantRow
            key={participant.userId}
            participant={participant}
            contestsId={contestsId}
            expandedParticipantId={expandedParticipantId}
            setExpandedParticipantId={setExpandedParticipantId}
            setParticipants={setParticipants}
          />
        ))}
      </S.ParticipantsTable>
    </S.ParticipantsWrapper>
  );
};
